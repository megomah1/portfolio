"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Store } from "../store";
import { createCaptureSource, type CaptureSource, type Frame } from "../audio";
import Waveform from "../viz/Waveform";
import Aperture from "../viz/Aperture";
import { CheckIcon, CloseIcon } from "../viz/icons";

export default function Calibrate({ store, onClose }: { store: Store; onClose: () => void }) {
  const [testing, setTesting] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const sourceRef = useRef<CaptureSource | null>(null);
  const liveRef = useRef<Frame | null>(null);
  const rafRef = useRef(0);
  const meterRef = useRef<HTMLDivElement>(null);
  const measureBuf = useRef<number[]>([]);
  const measuringRef = useRef(false);

  const data = store.data;

  const stopTest = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    sourceRef.current?.stop();
    sourceRef.current = null;
    setTesting(false);
  }, []);

  useEffect(() => () => stopTest(), [stopTest]);

  const loop = useCallback(function loop() {
    const src = sourceRef.current;
    if (!src) return;
    const frame = src.frame();
    liveRef.current = frame;
    if (meterRef.current) meterRef.current.style.width = `${Math.min(100, frame.level * 100)}%`;
    if (measuringRef.current) measureBuf.current.push(frame.level);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startTest = useCallback(async () => {
    const src = await createCaptureSource({
      gain: data?.settings.inputGain,
      floor: data?.settings.noiseFloor,
    });
    sourceRef.current = src;
    setSimulated(src.simulated);
    setTesting(true);
    rafRef.current = requestAnimationFrame(loop);
  }, [data?.settings, loop]);

  const measureFloor = useCallback(() => {
    measureBuf.current = [];
    measuringRef.current = true;
    setMeasuring(true);
    window.setTimeout(() => {
      measuringRef.current = false;
      setMeasuring(false);
      const buf = measureBuf.current;
      if (buf.length) {
        // Noise floor ≈ a little above the average quiet level.
        const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
        const floor = Math.max(0.004, Math.min(0.05, avg * 0.9 + 0.004));
        store.updateSettings({ noiseFloor: Math.round(floor * 1000) / 1000, calibrated: true });
        setJustSaved(true);
        window.setTimeout(() => setJustSaved(false), 2000);
      }
    }, 1800);
  }, [store]);

  if (!data) return null;
  const { settings } = data;

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-paper pb-6">
      <div className="flex items-center justify-between px-5 pt-4">
        <h1 className="font-display text-2xl font-semibold">Calibrate &amp; device</h1>
        <button
          onClick={() => {
            stopTest();
            onClose();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 hover:bg-surface"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="px-5">
        <p className="mt-2 rounded-xl bg-accent-tint/60 px-4 py-3 text-xs leading-relaxed text-ink-2">
          Everything in Vocalynx works with just your phone&apos;s microphone. Calibration and the
          handset are <strong>optional</strong> — they sharpen the readings, they&apos;re not
          required to practise or track progress.
        </p>

        {/* Mic calibration */}
        <section className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Microphone</p>
          <div className="mt-2 rounded-2xl border border-line bg-surface p-4">
            <div className="h-16 overflow-hidden rounded-xl bg-paper">
              <Waveform liveRef={liveRef} idle={!testing} className="h-full w-full" />
            </div>

            {/* Level meter */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
              <div ref={meterRef} className="h-full rounded-full bg-accent" style={{ width: "0%" }} />
            </div>

            {simulated && testing && (
              <p className="mt-2 text-center text-[11px] text-sienna">
                No microphone available — showing a simulated signal
              </p>
            )}

            <div className="mt-3 flex gap-2">
              {!testing ? (
                <button
                  onClick={startTest}
                  className="flex-1 rounded-full bg-accent py-2.5 text-sm font-medium text-paper"
                >
                  Test microphone
                </button>
              ) : (
                <>
                  <button
                    onClick={measureFloor}
                    disabled={measuring || simulated}
                    className="flex-[2] rounded-full bg-accent py-2.5 text-sm font-medium text-paper disabled:opacity-60"
                  >
                    {measuring ? "Listening… stay quiet" : justSaved ? "Calibrated ✓" : "Measure room tone"}
                  </button>
                  <button
                    onClick={stopTest}
                    className="flex-1 rounded-full border border-line py-2.5 text-sm font-medium text-ink-2"
                  >
                    Stop
                  </button>
                </>
              )}
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-ink-2">Input sensitivity</span>
                <span className="font-mono text-sm text-ink">{settings.inputGain.toFixed(1)}×</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={settings.inputGain}
                onChange={(e) => store.updateSettings({ inputGain: Number(e.target.value) })}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-ink-3">
              {settings.calibrated ? (
                <>
                  <CheckIcon className="!h-3.5 !w-3.5 text-accent" /> Calibrated · noise floor{" "}
                  {settings.noiseFloor}
                </>
              ) : (
                "Not yet calibrated (optional)"
              )}
            </p>
          </div>
        </section>

        {/* Aperture guide (device) */}
        <section className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
            Aperture guide · device
          </p>
          <div className="mt-2 flex flex-col items-center rounded-2xl border border-line bg-surface p-5">
            <Aperture mm={settings.apertureMm} />
            <p className="mt-3 font-display text-3xl font-semibold text-accent">
              {settings.apertureMm.toFixed(1)} mm
            </p>
            <p className="text-xs text-ink-3">therapy band</p>
            <div className="mt-4 flex gap-2">
              {[3, 5, 7, 9].map((mm) => (
                <button
                  key={mm}
                  onClick={() => store.updateSettings({ apertureMm: mm })}
                  className={`h-9 w-9 rounded-full font-mono text-sm ${
                    settings.apertureMm === mm
                      ? "bg-accent text-paper"
                      : "border border-line text-ink-2"
                  }`}
                >
                  {mm}
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-3">
              Twist the Vocalynx handset to match. No handset? The straw exercises still work by ear.
            </p>
          </div>
        </section>

        {/* Device pairing (simulated) */}
        <section className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Vocalynx handset</p>
          <div className="mt-2 flex items-center justify-between rounded-2xl border border-line bg-surface p-4">
            <div>
              <p className="text-sm font-medium text-ink">
                {settings.deviceConnected ? "Connected" : "Not connected"}
              </p>
              <p className="font-mono text-[11px] text-ink-3">
                {settings.deviceConnected ? "Battery 82% · aperture synced" : "Pairing is optional"}
              </p>
            </div>
            <button
              onClick={() => store.updateSettings({ deviceConnected: !settings.deviceConnected })}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                settings.deviceConnected
                  ? "border border-line text-ink-2"
                  : "bg-accent text-paper"
              }`}
            >
              {settings.deviceConnected ? "Disconnect" : "Connect"}
            </button>
          </div>
        </section>

        {/* Profile + data */}
        <section className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Your profile</p>
          <div className="mt-2 rounded-2xl border border-line bg-surface p-4">
            <label className="text-sm text-ink-2">Name</label>
            <input
              value={settings.name}
              onChange={(e) => store.updateSettings({ name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => store.resetAll("sample")}
                className="flex-1 rounded-full border border-line py-2.5 text-xs font-medium text-ink-2"
              >
                Reload sample data
              </button>
              <button
                onClick={() => store.resetAll("empty")}
                className="flex-1 rounded-full border border-line py-2.5 text-xs font-medium text-sienna"
              >
                Clear all my data
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
