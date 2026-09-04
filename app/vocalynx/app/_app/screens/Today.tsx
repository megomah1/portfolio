"use client";

import type { Exercise, ScreenId } from "../types";
import type { Store } from "../store";
import { suggestedExercise } from "../exercises";
import { computeStreak, dailyBuckets, startOfDay } from "../metrics";
import { Sparkline } from "../viz/Charts";
import { MicIcon, ChartIcon, PlayIcon, ChevronRight } from "../viz/icons";

export default function Today({
  store,
  onStart,
  onGoTo,
  onOpenReport,
}: {
  store: Store;
  onStart: (ex: Exercise) => void;
  onGoTo: (s: ScreenId) => void;
  onOpenReport: () => void;
}) {
  const data = store.data;
  if (!data) return null;
  const { settings, sessions } = data;
  const suggested = suggestedExercise();
  const streak = computeStreak(sessions);

  // Rolling 7-day strip.
  const today = startOfDay(new Date());
  const week = Array.from({ length: 7 }, (_, i) => {
    const day = today - (6 - i) * 86_400_000;
    const has = sessions.some((s) => startOfDay(new Date(s.at)) === day);
    return { label: new Date(day).toLocaleDateString(undefined, { weekday: "narrow" }), has, day };
  });
  const doneThisWeek = week.filter((d) => d.has).length;

  const recentScores = dailyBuckets(sessions, 10)
    .map((b) => b.avgScore)
    .filter((v): v is number => v != null);
  const latestScore = recentScores.at(-1);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="flex h-full flex-col overflow-y-auto px-5 pb-6">
      <div className="pt-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
          {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold">
          {greeting}, <em>{settings.name}</em>
        </h1>
      </div>

      {/* Today's prescribed session */}
      <div className="mt-5 rounded-2xl bg-accent p-5 text-paper">
        <p className="font-mono text-[11px] uppercase tracking-widest text-paper/70">Today&apos;s session</p>
        <h2 className="mt-1.5 font-display text-2xl font-semibold">{suggested.name}</h2>
        <p className="mt-1 text-sm text-paper/80">
          {suggested.phases.length} steps · {Math.round(suggested.minutes)} min · {suggested.family}
        </p>
        <button
          onClick={() => onStart(suggested)}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-accent transition-transform active:scale-[0.98]"
        >
          <PlayIcon className="!h-4 !w-4" /> Start
        </button>
      </div>

      {/* This week */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">This week</p>
          <p className="font-mono text-[11px] text-ink-3">{doneThisWeek} of 7</p>
        </div>
        <div className="mt-2 flex gap-1.5">
          {week.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-12 w-full rounded-lg ${
                  d.has ? "bg-accent" : "border border-line bg-surface"
                } ${d.day === today ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : ""}`}
              />
              <span className="font-mono text-[10px] text-ink-3">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Snapshot */}
      <button
        onClick={onOpenReport}
        className="mt-5 flex items-center justify-between rounded-2xl border border-line bg-surface p-4 text-left"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Vocal health</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {latestScore ?? "—"}
            {latestScore != null && <span className="ml-1 font-mono text-sm text-ink-3">/ 100</span>}
          </p>
          <p className="mt-0.5 text-xs text-ink-2">
            {streak > 0 ? `${streak}-day streak · keep it up` : "Start a session to begin"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {recentScores.length > 1 && (
            <span className="text-accent">
              <Sparkline values={recentScores} />
            </span>
          )}
          <ChevronRight className="text-ink-3" />
        </div>
      </button>

      {/* Quick actions */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => onGoTo("record")}
          className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-surface p-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-tint text-accent">
            <MicIcon className="!h-4 !w-4" />
          </span>
          <span className="text-sm font-medium text-ink">Record voice</span>
          <span className="text-xs text-ink-2">Log how you sound today</span>
        </button>
        <button
          onClick={onOpenReport}
          className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-surface p-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-tint text-accent">
            <ChartIcon className="!h-4 !w-4" />
          </span>
          <span className="text-sm font-medium text-ink">Progress report</span>
          <span className="text-xs text-ink-2">See how you&apos;re healing</span>
        </button>
      </div>
    </div>
  );
}
