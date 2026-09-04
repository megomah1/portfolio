"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { Frame } from "../audio";
import type { ExercisePhase } from "../types";
import { readPalette, type Palette } from "./palette";

// A single canvas that renders whichever visual the current exercise phase
// calls for. Driven imperatively — the runner owns one animation loop and calls
// `render()` each frame — so nothing here triggers React re-renders at 60fps.

export type StageState = {
  mode: ExercisePhase["mode"];
  breath?: ExercisePhase["breath"];
  frame: Frame;
  /** 0..1 progress through the current phase. */
  phaseProgress: number;
  /** Changes whenever the phase changes, so the glide track can reset. */
  phaseKey: number;
  /** Full target contour for a glide phase (0..1 values). */
  contour?: number[];
  /** User's live pitch mapped into 0..1, or null when unvoiced. */
  pitchUnit: number | null;
};

export type StageHandle = { render: (s: StageState) => void };

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

const Stage = forwardRef<StageHandle, { className?: string }>(function Stage(
  { className },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pal = useRef<Palette>(readPalette());
  const dpr = useRef(1);
  const size = useRef({ w: 0, h: 0 });
  const track = useRef<Array<{ x: number; y: number }>>([]);
  const lastPhaseKey = useRef(-1);
  const clock = useRef(0);

  // Keep colours in sync with theme + element size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = () => {
      pal.current = readPalette();
      const rect = canvas.getBoundingClientRect();
      dpr.current = Math.min(2, window.devicePixelRatio || 1);
      size.current = { w: rect.width, h: rect.height };
      canvas.width = Math.round(rect.width * dpr.current);
      canvas.height = Math.round(rect.height * dpr.current);
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    const mo = new MutationObserver(() => (pal.current = readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    render(s) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const p = pal.current;
      const { w, h } = size.current;
      clock.current += 0.016;

      ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (s.phaseKey !== lastPhaseKey.current) {
        track.current = [];
        lastPhaseKey.current = s.phaseKey;
      }

      if (s.mode === "breath") drawBreath(ctx, w, h, p, s);
      else if (s.mode === "glide") drawGlide(ctx, w, h, p, s, track.current);
      else if (s.mode === "rest") drawRest(ctx, w, h, p, clock.current);
      else drawSustain(ctx, w, h, p, s);
    },
  }));

  return <canvas ref={canvasRef} className={className} />;
});

export default Stage;

// --- per-mode drawing -------------------------------------------------------

function drawSustain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: Palette,
  s: StageState
) {
  const cy = h / 2;
  const level = s.frame.level;

  // Level halo — a soft filled band that breathes with loudness.
  const halo = 24 + level * (h * 0.42);
  const grad = ctx.createLinearGradient(0, cy - halo, 0, cy + halo);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.5, withAlpha(p.accent, 0.14 + level * 0.12));
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, cy - halo, w, halo * 2);

  // Oscilloscope.
  const wf = s.frame.waveform;
  const step = Math.max(1, Math.floor(wf.length / w));
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const v = wf[Math.min(wf.length - 1, x * step)] || 0;
    const y = cy + v * (h * 0.4);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 2 + level * 2;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Baseline.
  ctx.strokeStyle = withAlpha(p.ink3, 0.25);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(w, cy);
  ctx.stroke();
}

function drawGlide(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: Palette,
  s: StageState,
  track: Array<{ x: number; y: number }>
) {
  const pad = h * 0.12;
  const toY = (u: number) => h - pad - u * (h - pad * 2);

  // Target path across the phase.
  const c = s.contour ?? [0.5, 0.5];
  ctx.beginPath();
  for (let i = 0; i < c.length; i++) {
    const x = (i / (c.length - 1)) * w;
    const y = toY(c[i]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = withAlpha(p.ink3, 0.4);
  ctx.lineWidth = 2;
  ctx.setLineDash([2, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // "Now" position along the path.
  const nowX = s.phaseProgress * w;
  const idx = s.phaseProgress * (c.length - 1);
  const lo = Math.floor(idx);
  const frac = idx - lo;
  const targetU = c[lo] + ((c[lo + 1] ?? c[lo]) - c[lo]) * frac;
  const targetY = toY(targetU);

  // Target marker.
  ctx.beginPath();
  ctx.arc(nowX, targetY, 7, 0, Math.PI * 2);
  ctx.strokeStyle = p.ink2;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Record the user's live pitch.
  if (s.pitchUnit != null) track.push({ x: nowX, y: toY(s.pitchUnit) });

  // User's sung line.
  if (track.length > 1) {
    ctx.beginPath();
    track.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  // User's current dot + on-pitch glow.
  if (s.pitchUnit != null) {
    const y = toY(s.pitchUnit);
    const onTarget = Math.abs(y - targetY) < 14;
    ctx.beginPath();
    ctx.arc(nowX, y, onTarget ? 9 : 6, 0, Math.PI * 2);
    ctx.fillStyle = onTarget ? p.accentStrong : p.accent;
    ctx.fill();
    if (onTarget) {
      ctx.beginPath();
      ctx.arc(nowX, y, 15, 0, Math.PI * 2);
      ctx.strokeStyle = withAlpha(p.accent, 0.4);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

function drawBreath(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: Palette,
  s: StageState
) {
  const cx = w / 2;
  const cy = h / 2;
  const min = Math.min(w, h) * 0.16;
  const max = Math.min(w, h) * 0.42;
  const t = ease(s.phaseProgress);
  let r = (min + max) / 2;
  if (s.breath === "inhale") r = min + (max - min) * t;
  else if (s.breath === "exhale") r = max - (max - min) * t;
  else r = max * 0.9; // hold

  // Live airflow shimmer — real mic level nudges the ring outward.
  const shimmer = r + s.frame.level * (min * 0.8);

  ctx.beginPath();
  ctx.arc(cx, cy, shimmer, 0, Math.PI * 2);
  ctx.strokeStyle = withAlpha(p.accent, 0.35);
  ctx.lineWidth = 2;
  ctx.stroke();

  const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
  grad.addColorStop(0, withAlpha(p.accent, 0.5));
  grad.addColorStop(1, withAlpha(p.accent, 0.12));
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Guide ring showing the target size at the end of the phase.
  const targetR = s.breath === "exhale" ? min : max;
  ctx.beginPath();
  ctx.arc(cx, cy, targetR, 0, Math.PI * 2);
  ctx.strokeStyle = withAlpha(p.ink3, 0.3);
  ctx.setLineDash([3, 6]);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawRest(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: Palette,
  clock: number
) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * (0.1 + 0.02 * Math.sin(clock * 1.6));
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = withAlpha(p.ink3, 0.25);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, r + 10 + 4 * Math.sin(clock * 1.6), 0, Math.PI * 2);
  ctx.strokeStyle = withAlpha(p.ink3, 0.2);
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Accepts #rrggbb or already-alpha colours; falls back gracefully.
function withAlpha(color: string, a: number): string {
  const c = color.trim();
  if (c.startsWith("#") && c.length === 7) {
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (c.startsWith("rgb(")) return c.replace("rgb(", "rgba(").replace(")", `, ${a})`);
  return c;
}
