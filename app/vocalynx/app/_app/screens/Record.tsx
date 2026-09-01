"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Recording, TakeMetrics } from "../types";
import type { Store } from "../store";
import { createCaptureSource, type CaptureSource, type Frame } from "../audio";
import { computeMetrics, type FrameSample } from "../metrics";
import { getClip } from "../store";
import Waveform from "../viz/Waveform";
import { MicIcon, PlayIcon, PauseIcon, TrashIcon } from "../viz/icons";

type Mode = "idle" | "recording" | "review";

export default function Record({ store }: { store: Store }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [simulated, setSimulated] = useState(false);
  const [review, setReview] = useState<{ metrics: TakeMetrics; blob: Blob | null; secs: number } | null>(null);
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const sourceRef = useRef<CaptureSource | null>(null);
  const liveRef = useRef<Frame | null>(null);
  const rafRef = useRef(0);
  const samplesRef = useRef<FrameSample[]>([]);
  const startRef = useRef(0);
  const elapsedElRef = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const urlRef = useRef<string | null>(null);

  const data = store.data;

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      sourceRef.current?.stop();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const loop = useCallback(function loop() {
    const src = sourceRef.current;
    if (!src) return;
    const now = performance.now();
    const frame = src.frame();
    liveRef.current = frame;
    samplesRef.current.push({ t: now - startRef.current, level: frame.level, pitch: frame.pitch });
    if (elapsedElRef.current) {
      const s = Math.floor((now - startRef.current) / 1000);
      elapsedElRef.current.textContent = `${String(Math.floor(s / 60)).padStart(1, "0")}:${String(s % 60).padStart(2, "0")}`;
    }
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const start = useCallback(async () => {
    const src = await createCaptureSource({
      gain: data?.settings.inputGain,
      floor: data?.settings.noiseFloor,
    });
    sourceRef.current = src;
    setSimulated(src.simulated);
    if (!src.simulated) src.startRecording();
    samplesRef.current = [];
    startRef.current = performance.now();
    setMode("recording");
    rafRef.current = requestAnimationFrame(loop);
  }, [data?.settings, loop]);

  const stop = useCallback(async () => {
    stopLoop();
    const src = sourceRef.current;
    const secs = Math.max(1, Math.round((performance.now() - startRef.current) / 1000));
    const metrics = computeMetrics(samplesRef.current);
    const blob = src && !src.simulated ? await src.stopRecording() : null;
    src?.stop();
    sourceRef.current = null;
    setReview({ metrics, blob, secs });
    setLabel(defaultLabel());
    setNote("");
    setMode("review");
  }, [stopLoop]);

  const save = useCallback(() => {
    if (!review) return;
    const rec: Recording = {
      id: `r-${Date.now()}`,
      at: new Date().toISOString(),
      label: label.trim() || defaultLabel(),
      durationSec: review.secs,
      metrics: review.metrics,
      note: note.trim() || undefined,
      demo: !review.blob,
      mime: review.blob?.type,
    };
    store.addRecording(rec, review.blob);
    setReview(null);
    setMode("idle");
  }, [review, label, note, store]);

  const play = useCallback(async (rec: Recording) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingId === rec.id) {
      audio.pause();
      setPlayingId(null);
      return;
    }
    const blob = await getClip(rec.id);
    if (!blob) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(blob);
    audio.src = urlRef.current;
    audio.play().then(() => setPlayingId(rec.id)).catch(() => setPlayingId(null));
  }, [playingId]);

  if (!data) return null;
  const recordings = [...data.recordings].sort((a, b) => +new Date(b.at) - +new Date(a.at));

  return (
    <div className="flex h-full flex-col overflow-y-auto px-5 pb-6">
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} className="hidden" />

      <div className="pt-5">
        <h1 className="font-display text-3xl font-semibold">Voice log</h1>
        <p className="mt-1 text-sm text-ink-2">
          Capture how you sound and track the healing over time.
        </p>
      </div>

      {/* Recorder */}
      <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
        {mode !== "review" && (
          <>
            <div className="h-20 overflow-hidden rounded-xl bg-paper">
              <Waveform liveRef={liveRef} idle={mode === "idle"} className="h-full w-full" />
            </div>
            {simulated && mode === "recording" && (
              <p className="mt-2 text-center text-[11px] text-sienna">
                Demo mode — no microphone, so audio can&apos;t be saved
              </p>
            )}
            <div className="mt-4 flex flex-col items-center">
              <span
                ref={elapsedElRef}
                className={`font-mono text-lg ${mode === "recording" ? "text-ink" : "text-ink-3"}`}
              >
                0:00
              </span>
              <button
                onClick={mode === "recording" ? stop : start}
                className={`mt-3 flex h-16 w-16 items-center justify-center rounded-full transition-transform active:scale-95 ${
                  mode === "recording"
                    ? "bg-sienna text-paper"
                    : "bg-accent text-paper"
                }`}
                aria-label={mode === "recording" ? "Stop recording" : "Start recording"}
              >
                {mode === "recording" ? (
                  <span className="h-5 w-5 rounded-sm bg-paper" />
                ) : (
                  <MicIcon className="!h-6 !w-6" />
                )}
              </button>
              <p className="mt-2 text-xs text-ink-2">
                {mode === "recording" ? "Tap to stop" : "Hold a steady “ee” for a few seconds"}
              </p>
            </div>
          </>
        )}

        {mode === "review" && review && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">New take · {review.secs}s</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip label="Steadiness" value={`${review.metrics.steadiness}`} />
              <Chip label="MPT" value={`${review.metrics.mpt}s`} />
              <Chip label="Range" value={`${review.metrics.rangeSemitones} st`} />
            </div>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label this take"
              className="mt-3 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-accent"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="How did your voice feel?"
              className="mt-2 w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-accent"
            />
            {!review.blob && (
              <p className="mt-2 text-[11px] text-sienna">
                Saved as a check-in with metrics and notes (no audio in demo mode).
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  setReview(null);
                  setMode("idle");
                }}
                className="flex-1 rounded-full border border-line py-2.5 text-sm font-medium text-ink-2"
              >
                Discard
              </button>
              <button
                onClick={save}
                className="flex-[2] rounded-full bg-accent py-2.5 text-sm font-medium text-paper"
              >
                Save to log
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-3">Your takes</p>
      <div className="mt-2 space-y-3">
        {recordings.length === 0 && (
          <p className="rounded-xl bg-surface px-4 py-6 text-center text-sm text-ink-2">
            No recordings yet. Tap the mic to log your first take.
          </p>
        )}
        {recordings.map((rec) => (
          <div key={rec.id} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-start gap-3">
              <button
                onClick={() => play(rec)}
                disabled={rec.demo}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  rec.demo ? "bg-line text-ink-3" : "bg-accent text-paper"
                }`}
                aria-label={playingId === rec.id ? "Pause" : "Play"}
              >
                {playingId === rec.id ? <PauseIcon className="!h-4 !w-4" /> : <PlayIcon className="!h-4 !w-4" />}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-ink">{rec.label}</p>
                  {rec.sample && (
                    <span className="rounded-full bg-line px-2 py-0.5 font-mono text-[9px] uppercase text-ink-2">
                      sample
                    </span>
                  )}
                  {rec.demo && !rec.sample && (
                    <span className="rounded-full bg-sienna-tint px-2 py-0.5 font-mono text-[9px] uppercase text-sienna">
                      demo
                    </span>
                  )}
                </div>
                <p className="font-mono text-[11px] text-ink-3">
                  {new Date(rec.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })} ·{" "}
                  {rec.durationSec}s · steadiness {rec.metrics.steadiness} · MPT {rec.metrics.mpt}s
                </p>
                {rec.note && <p className="mt-1.5 text-sm leading-snug text-ink-2">“{rec.note}”</p>}
              </div>
              <button
                onClick={() => store.deleteRecording(rec.id)}
                className="shrink-0 text-ink-3 hover:text-sienna"
                aria-label="Delete recording"
              >
                <TrashIcon className="!h-4 !w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-3 py-1 text-xs text-accent">
      <span className="font-mono uppercase tracking-wide text-[10px] opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </span>
  );
}

function defaultLabel(): string {
  const h = new Date().getHours();
  const part = h < 12 ? "Morning" : h < 18 ? "Afternoon" : "Evening";
  return `${part} check-in`;
}
