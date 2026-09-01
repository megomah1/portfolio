"use client";

import { useEffect, useState } from "react";
import type { Exercise, ScreenId } from "./types";
import { useVocalynxStore } from "./store";
import Today from "./screens/Today";
import Practice from "./screens/Practice";
import Record from "./screens/Record";
import Progress from "./screens/Progress";
import Runner from "./screens/Runner";
import Calibrate from "./screens/Calibrate";
import { HomeIcon, PulseIcon, MicIcon, ChartIcon, GearIcon } from "./viz/icons";

const tabs: { id: ScreenId; label: string; Icon: (p: { className?: string }) => React.JSX.Element }[] = [
  { id: "today", label: "Today", Icon: HomeIcon },
  { id: "practice", label: "Practice", Icon: PulseIcon },
  { id: "record", label: "Record", Icon: MicIcon },
  { id: "progress", label: "Progress", Icon: ChartIcon },
];

export default function VocalynxApp() {
  const store = useVocalynxStore();
  const [screen, setScreen] = useState<ScreenId>("today");
  const [runner, setRunner] = useState<Exercise | null>(null);
  const [calibrate, setCalibrate] = useState(false);
  const [clock, setClock] = useState("9:41");

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const startExercise = (ex: Exercise) => setRunner(ex);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-paper text-ink">
      {/* faux status bar */}
      <div className="flex items-center justify-between px-5 pt-2 text-xs">
        <span className="font-mono font-medium text-ink">{clock}</span>
        <span className="font-display text-sm font-semibold tracking-tight text-ink">vocalynx</span>
        <button
          onClick={() => setCalibrate(true)}
          className="flex h-6 w-6 items-center justify-center text-ink-2 hover:text-accent"
          aria-label="Calibrate and device settings"
        >
          <GearIcon className="!h-[18px] !w-[18px]" />
        </button>
      </div>

      {/* active screen */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {!store.ready ? (
          <Splash />
        ) : screen === "today" ? (
          <Today store={store} onStart={startExercise} onGoTo={setScreen} onCalibrate={() => setCalibrate(true)} />
        ) : screen === "practice" ? (
          <Practice onStart={startExercise} />
        ) : screen === "record" ? (
          <Record store={store} />
        ) : (
          <Progress store={store} />
        )}
      </div>

      {/* bottom tab bar */}
      <nav className="flex shrink-0 items-stretch border-t border-line bg-paper/95 backdrop-blur">
        {tabs.map((t) => {
          const active = screen === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setScreen(t.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] ${
                active ? "text-accent" : "text-ink-3"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <t.Icon className="!h-5 !w-5" />
              <span className="font-medium tracking-wide">{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* overlays */}
      {runner && (
        <div className="absolute inset-0 z-20">
          <Runner exercise={runner} store={store} onExit={() => setRunner(null)} />
        </div>
      )}
      {calibrate && (
        <div className="absolute inset-0 z-30">
          <Calibrate store={store} onClose={() => setCalibrate(false)} />
        </div>
      )}
    </div>
  );
}

function Splash() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <span aria-hidden className="text-3xl text-accent">
        ⌄
      </span>
      <p className="font-display text-xl font-semibold tracking-tight text-ink">vocalynx</p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">loading…</p>
    </div>
  );
}
