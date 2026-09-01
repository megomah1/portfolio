"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exercise, Recording, SessionRecord, TakeMetrics } from "../types";
import { exerciseDuration } from "../exercises";
import { createCaptureSource, SimSource, type CaptureSource, type Frame } from "../audio";
import { computeMetrics, healthScore, type FrameSample } from "../metrics";
import { pitchToUnit, midiToFreq, noteLabel } from "../theory";
import type { Store } from "../store";
import Stage, { type StageHandle } from "../viz/Stage";
import { CheckIcon, CloseIcon, MicIcon } from "../viz/icons";

type Step = "prep" | "countdown" | "running" | "summary";

export default function Runner({
  exercise,
  store,
  onExit,
}: {
  exercise: Exercise;
  store: Store;
  onExit: () => void;
}) {
  const [step, setStep] = useState<Step>("prep");
  const [simulated, setSimulated] = useState(false);
  const [phase, setPhase] = useState({ index: 0, ...exercise.phases[0] });
  const [result, setResult] = useState<{
    metrics: TakeMetrics;
    score: number;
    blob: Blob | null;
    session: SessionRecord;
  } | null>(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const sourceRef = useRef<CaptureSource | null>(null);
  const stageRef = useRef<StageHandle>(null);
  const liveRef = useRef<Frame | null>(null);
  const rafRef = useRef(0);
  const samplesRef = useRef<FrameSample[]>([]);
  const timers = useRef({ runStart: 0, phaseStart: 0, lastSample: 0, phaseKey: 0 });
  // Fast-updating DOM nodes we write to directly (no per-frame React render).
  const secondsRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const noteElRef = useRef<HTMLSpanElement>(null);

  const total = exerciseDuration(exercise);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    sourceRef.current?.stop();
    sourceRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const finish = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const src = sourceRef.current;
    const metrics = computeMetrics(samplesRef.current);
    const score = healthScore(metrics);
    const session: SessionRecord = {
      id: `s-${Date.now()}`,
      at: new Date().toISOString(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      category: exercise.category,
      durationSec: total,
      metrics,
      healthScore: score,
      simulated: src?.simulated,
    };
    // Save the session immediately so the report reflects it.
    store.addSession(session);

    const finalise = (blob: Blob | null) => {
      setResult({ metrics, score, blob, session });
      setStep("summary");
      src?.stop();
      sourceRef.current = null;
    };
    if (src && !src.simulated) src.stopRecording().then(finalise);
    else finalise(null);
  }, [exercise, total, store]);

  const loop = useCallback(function loop() {
    const src = sourceRef.current;
    if (!src) return;
    const now = performance.now();
    const t = timers.current;
    const frame = src.frame();
    liveRef.current = frame;

    const ph = exercise.phases[t.phaseKey];
    const phaseElapsed = (now - t.phaseStart) / 1000;
    const phaseProgress = Math.min(1, phaseElapsed / ph.seconds);
    const capture = ph.mode === "sustain" || ph.mode === "glide";

    // Drive the simulator's target so the demo "follows" glide contours.
    if (src.simulated && ph.mode === "glide" && ph.contour) {
      const idx = phaseProgress * (ph.contour.length - 1);
      const lo = Math.floor(idx);
      const u = ph.contour[lo] + ((ph.contour[lo + 1] ?? ph.contour[lo]) - ph.contour[lo]) * (idx - lo);
      (src as SimSource).target = midiToFreq(45 + u * 24);
    }

    // Collect metric samples ~30/s during capture phases only.
    if (capture && now - t.lastSample > 33) {
      samplesRef.current.push({ t: now - t.runStart, level: frame.level, pitch: frame.pitch });
      t.lastSample = now;
    }

    stageRef.current?.render({
      mode: ph.mode,
      breath: ph.breath,
      frame,
      phaseProgress,
      phaseKey: t.phaseKey,
      contour: ph.contour,
      pitchUnit: frame.pitch ? pitchToUnit(frame.pitch) : null,
    });

    // Fast DOM updates.
    if (secondsRef.current) secondsRef.current.textContent = String(Math.ceil(ph.seconds - phaseElapsed));
    if (progressRef.current) {
      const elapsedTotal = (now - t.runStart) / 1000;
      progressRef.current.style.width = `${Math.min(100, (elapsedTotal / total) * 100)}%`;
    }
    if (noteElRef.current) noteElRef.current.textContent = capture ? noteLabel(frame.pitch) : "";

    if (phaseProgress >= 1) {
      if (t.phaseKey >= exercise.phases.length - 1) {
        finish();
        return;
      }
      t.phaseKey += 1;
      t.phaseStart = now;
      setPhase({ index: t.phaseKey, ...exercise.phases[t.phaseKey] });
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [exercise, total, finish]);

  const begin = useCallback(async () => {
    setStep("countdown");
    const { settings } = store.data ?? { settings: undefined };
    const src = await createCaptureSource({
      gain: settings?.inputGain,
      floor: settings?.noiseFloor,
    });
    sourceRef.current = src;
    setSimulated(src.simulated);
    if (!src.simulated) src.startRecording();

    // 3-2-1 countdown, then run.
    let c = 3;
    if (countRef.current) countRef.current.textContent = String(c);
    const tick = () => {
      c -= 1;
      if (c > 0) {
        if (countRef.current) countRef.current.textContent = String(c);
        window.setTimeout(tick, 800);
      } else {
        samplesRef.current = [];
        const now = performance.now();
        timers.current = { runStart: now, phaseStart: now, lastSample: 0, phaseKey: 0 };
        setPhase({ index: 0, ...exercise.phases[0] });
        setStep("running");
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    window.setTimeout(tick, 800);
  }, [store.data, exercise.phases, loop]);

  const keepRecording = () => {
    if (!result) return;
    const rec: Recording = {
      id: `r-${Date.now()}`,
      at: result.session.at,
      label: exercise.name,
      exerciseId: exercise.id,
      durationSec: result.session.durationSec,
      metrics: result.metrics,
      note: note.trim() || undefined,
      demo: !result.blob,
      mime: result.blob?.type,
    };
    store.addRecording(rec, result.blob);
    // Link the recording to the session.
    setSaved(true);
  };

  // ---- render ----
  return (
    <div className="flex h-full flex-col bg-paper">
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-3">
        <button
          onClick={() => {
            cleanup();
            onExit();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 hover:bg-surface"
          aria-label="End session"
        >
          <CloseIcon />
        </button>
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">{exercise.family}</p>
        <div className="w-8" />
      </div>

      {/* overall progress */}
      <div className="mx-4 mt-3 h-1 overflow-hidden rounded-full bg-line">
        <div ref={progressRef} className="h-full rounded-full bg-accent" style={{ width: "0%" }} />
      </div>

      {step === "prep" && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-tint text-accent">
            <MicIcon className="!h-7 !w-7" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold">{exercise.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{exercise.blurb}</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-3">
            We&apos;ll listen through your microphone to guide the exercise and measure how steady
            your voice is. Nothing leaves your device.
          </p>
          <button
            onClick={begin}
            className="mt-8 w-full rounded-full bg-accent py-3.5 font-medium text-paper transition-transform active:scale-[0.98]"
          >
            Begin
          </button>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink-3">
            {Math.round(total / 60)} min · {exercise.phases.length} steps
          </p>
        </div>
      )}

      {(step === "countdown" || step === "running") && (
        <div className="relative flex flex-1 flex-col">
          {simulated && (
            <p className="mx-4 mt-3 rounded-lg bg-sienna-tint px-3 py-1.5 text-center text-[11px] text-sienna">
              Demo mode — no microphone, so the voice is simulated
            </p>
          )}
          <div className="relative mx-4 mt-2 flex-1 overflow-hidden rounded-2xl bg-surface">
            <Stage ref={stageRef} className="absolute inset-0 h-full w-full" />
            {step === "countdown" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  ref={countRef}
                  className="font-display text-6xl font-semibold text-accent"
                >
                  3
                </span>
              </div>
            )}
            {step === "running" && (
              <span
                ref={noteElRef}
                className="absolute right-3 top-3 font-mono text-sm text-ink-2"
              />
            )}
          </div>

          <div className="px-6 py-6 text-center">
            <p className="font-display text-2xl font-semibold text-ink">{phase.label}</p>
            <p className="mt-1 h-5 text-sm text-ink-2">{phase.hint ?? ""}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-3">
              <span ref={secondsRef}>{phase.seconds}</span>s left
            </p>
          </div>
        </div>
      )}

      {step === "summary" && result && (
        <Summary
          exercise={exercise}
          score={result.score}
          metrics={result.metrics}
          hasAudio={!!result.blob}
          saved={saved}
          note={note}
          setNote={setNote}
          onKeep={keepRecording}
          onDone={onExit}
        />
      )}
    </div>
  );
}

function Summary({
  exercise,
  score,
  metrics,
  hasAudio,
  saved,
  note,
  setNote,
  onKeep,
  onDone,
}: {
  exercise: Exercise;
  score: number;
  metrics: TakeMetrics;
  hasAudio: boolean;
  saved: boolean;
  note: string;
  setNote: (v: string) => void;
  onKeep: () => void;
  onDone: () => void;
}) {
  const line = (label: string, value: string) => (
    <div className="flex items-center justify-between border-b border-line py-2.5 last:border-0">
      <span className="text-sm text-ink-2">{label}</span>
      <span className="font-mono text-sm text-ink">{value}</span>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper">
          <CheckIcon className="!h-6 !w-6" />
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold">Session complete</h2>
        <p className="mt-1 text-sm text-ink-2">{exercise.name}</p>
        <p className="mt-5 font-display text-5xl font-semibold text-accent">{score}</p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">vocal health score</p>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-surface px-4 py-1">
        {line("Steadiness", `${metrics.steadiness}/100`)}
        {line("Max phonation time", `${metrics.mpt}s`)}
        {line("Range covered", `${metrics.rangeSemitones} semitones`)}
        {line("Median pitch", metrics.avgPitchHz ? `${metrics.avgPitchHz} Hz` : "—")}
        {line("Voiced", `${Math.round(metrics.voicedRatio * 100)}%`)}
      </div>

      <div className="mt-6">
        <label className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
          Add a note to your log
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="How did your voice feel today?"
          className="mt-2 w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-accent"
        />
      </div>

      {saved ? (
        <p className="mt-4 flex items-center justify-center gap-2 rounded-full bg-accent-tint py-3 text-sm font-medium text-accent">
          <CheckIcon /> Saved to your progress log
        </p>
      ) : (
        <button
          onClick={onKeep}
          className="mt-4 w-full rounded-full border border-accent py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-tint"
        >
          {hasAudio ? "Keep recording in my log" : "Save this check-in to my log"}
        </button>
      )}
      <button
        onClick={onDone}
        className="mt-3 w-full rounded-full bg-accent py-3.5 font-medium text-paper transition-transform active:scale-[0.98]"
      >
        Done
      </button>
    </div>
  );
}
