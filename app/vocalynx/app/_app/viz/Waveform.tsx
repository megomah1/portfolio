"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { Frame } from "../audio";
import { readPalette } from "./palette";

// A live oscilloscope + level band. Reads the latest frame from a ref the
// parent's capture loop writes to (so pitch detection stays a once-per-frame
// cost the parent owns). Draws itself on its own rAF; reading a ref is cheap.

export default function Waveform({
  liveRef,
  className,
  idle = false,
}: {
  liveRef: RefObject<Frame | null>;
  className?: string;
  /** When true, draws a calm flat line (not capturing). */
  idle?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    let dpr = 1;
    let w = 0;
    let h = 0;
    let pal = readPalette();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const mo = new MutationObserver(() => (pal = readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const cy = h / 2;
        const frame = liveRef.current;
        const level = idle || !frame ? 0 : frame.level;

        // Level band.
        const band = 6 + level * (h * 0.4);
        ctx.fillStyle = hexA(pal.accent, 0.1 + level * 0.1);
        ctx.fillRect(0, cy - band, w, band * 2);

        // Waveform (or flat baseline when idle).
        ctx.beginPath();
        if (frame && !idle) {
          const wf = frame.waveform;
          const step = Math.max(1, Math.floor(wf.length / w));
          for (let x = 0; x < w; x++) {
            const v = wf[Math.min(wf.length - 1, x * step)] || 0;
            const y = cy + v * (h * 0.4);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        } else {
          ctx.moveTo(0, cy);
          ctx.lineTo(w, cy);
        }
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = 2 + level * 2;
        ctx.lineJoin = "round";
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, [liveRef, idle]);

  return <canvas ref={canvasRef} className={className} />;
}

function hexA(c: string, a: number) {
  const t = c.trim();
  if (t.startsWith("#") && t.length === 7) {
    const r = parseInt(t.slice(1, 3), 16);
    const g = parseInt(t.slice(3, 5), 16);
    const b = parseInt(t.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return t;
}
