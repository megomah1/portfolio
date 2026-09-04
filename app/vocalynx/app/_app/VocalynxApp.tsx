"use client";

import { useEffect, useState } from "react";
import type { Exercise, ScreenId } from "./types";
import { useVocalynxStore } from "./store";
import Today from "./screens/Today";
import Practice from "./screens/Practice";
import Record from "./screens/Record";
import Profile from "./screens/Profile";
import Runner from "./screens/Runner";
import Report from "./screens/Report";
import Device from "./screens/Device";
import PlanSheet from "./screens/PlanSheet";
import Onboarding from "./screens/Onboarding";
import { HomeIcon, PulseIcon, MicIcon, UserIcon } from "./viz/icons";

const tabs: { id: ScreenId; label: string; Icon: (p: { className?: string }) => React.JSX.Element }[] = [
  { id: "today", label: "Today", Icon: HomeIcon },
  { id: "practice", label: "Practice", Icon: PulseIcon },
  { id: "record", label: "Record", Icon: MicIcon },
  { id: "profile", label: "Profile", Icon: UserIcon },
];

type Overlay =
  | { type: "runner"; exercise: Exercise }
  | { type: "report" }
  | { type: "device" }
  | { type: "plan" };

export default function VocalynxApp() {
  const store = useVocalynxStore();
  const [screen, setScreen] = useState<ScreenId>("today");
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [clock, setClock] = useState("9:41");

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const startExercise = (ex: Exercise) => setOverlay({ type: "runner", exercise: ex });
  const close = () => setOverlay(null);

  const onboarding = store.ready && !store.data?.settings.onboarded;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-paper text-ink">
      {!store.ready ? (
        <Splash />
      ) : onboarding ? (
        <Onboarding store={store} />
      ) : (
        <>
          {/* faux status bar */}
          <div className="flex items-center justify-between px-5 pt-2 text-xs">
            <span className="font-mono font-medium text-ink">{clock}</span>
            <span className="font-display text-sm font-semibold tracking-tight text-ink">vocalynx</span>
            <button
              onClick={() => setScreen("profile")}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-accent font-display text-[11px] font-semibold text-paper"
              aria-label="Profile"
            >
              {(store.data?.settings.name.trim()[0] || "V").toUpperCase()}
            </button>
          </div>

          {/* active tab */}
          <div className="min-h-0 flex-1 overflow-hidden">
            {screen === "today" ? (
              <Today
                store={store}
                onStart={startExercise}
                onGoTo={setScreen}
                onOpenReport={() => setOverlay({ type: "report" })}
              />
            ) : screen === "practice" ? (
              <Practice store={store} onStart={startExercise} />
            ) : screen === "record" ? (
              <Record store={store} />
            ) : (
              <Profile
                store={store}
                onOpenPlan={() => setOverlay({ type: "plan" })}
                onOpenReport={() => setOverlay({ type: "report" })}
                onOpenDevice={() => setOverlay({ type: "device" })}
              />
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
        </>
      )}

      {/* overlays */}
      {overlay?.type === "runner" && (
        <div className="absolute inset-0 z-20">
          <Runner exercise={overlay.exercise} store={store} onExit={close} />
        </div>
      )}
      {overlay?.type === "report" && (
        <div className="absolute inset-0 z-20">
          <Report store={store} onClose={close} />
        </div>
      )}
      {overlay?.type === "device" && (
        <div className="absolute inset-0 z-20">
          <Device store={store} onClose={close} />
        </div>
      )}
      {overlay?.type === "plan" && (
        <div className="absolute inset-0 z-20">
          <PlanSheet store={store} onClose={close} />
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
