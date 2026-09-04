"use client";

import type { Store } from "../store";
import type { SessionRecord } from "../types";
import { averageOf, computeStreak, dailyBuckets, startOfDay } from "../metrics";
import { ScoreDial, TrendChart, MetricBar } from "../viz/Charts";
import { BackIcon } from "../viz/icons";

// The vocal-health report. Lives inside Profile ("Progress report") and is
// shortcut-linked from Today, so it opens as a full-screen overlay with a back
// affordance rather than a bottom-tab screen.

export default function Report({ store, onClose }: { store: Store; onClose: () => void }) {
  const data = store.data;

  const header = (
    <div className="flex shrink-0 items-center gap-2 border-b border-line px-4 py-3">
      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 hover:bg-surface"
        aria-label="Back"
      >
        <BackIcon />
      </button>
      <h1 className="font-display text-lg font-semibold">Progress report</h1>
    </div>
  );

  if (!data) return null;
  const sessions = [...data.sessions].sort((a, b) => +new Date(a.at) - +new Date(b.at));

  if (sessions.length === 0) {
    return (
      <div className="flex h-full flex-col bg-paper">
        {header}
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <h2 className="font-display text-2xl font-semibold">No data yet</h2>
          <p className="mt-2 text-sm text-ink-2">
            Complete a practice session and your vocal-health report will build here.
          </p>
        </div>
      </div>
    );
  }

  const buckets = dailyBuckets(sessions, 14);
  const trend = buckets.map((b) => ({ label: b.label, value: b.avgScore }));

  // eslint-disable-next-line react-hooks/purity -- the report is relative to "now" by design
  const now = Date.now();
  const inWindow = (s: SessionRecord, from: number, to: number) => {
    const d = +new Date(s.at);
    return d >= from && d < to;
  };
  const weekMs = 7 * 86_400_000;
  const thisWeek = sessions.filter((s) => inWindow(s, now - weekMs, now + 86_400_000));
  const lastWeek = sessions.filter((s) => inWindow(s, now - 2 * weekMs, now - weekMs));

  const overall = averageOf(
    buckets.map((b) => b.avgScore).filter((v): v is number => v != null).slice(-7)
  );
  const streak = computeStreak(sessions);
  const avgSteadiness = averageOf(thisWeek.map((s) => s.metrics.steadiness));
  const bestMpt = Math.max(...sessions.map((s) => s.metrics.mpt));
  const maxRange = Math.max(...sessions.map((s) => s.metrics.rangeSemitones));

  const thisAvg = averageOf(thisWeek.map((s) => s.healthScore));
  const lastAvg = averageOf(lastWeek.map((s) => s.healthScore));
  const delta = thisAvg - lastAvg;

  const byExercise = Object.values(
    sessions.reduce<Record<string, { name: string; count: number; scoreSum: number }>>((acc, s) => {
      acc[s.exerciseId] ??= { name: s.exerciseName, count: 0, scoreSum: 0 };
      acc[s.exerciseId].count += 1;
      acc[s.exerciseId].scoreSum += s.healthScore;
      return acc;
    }, {})
  )
    .map((e) => ({ ...e, avg: Math.round(e.scoreSum / e.count) }))
    .sort((a, b) => b.count - a.count);

  const daysActive = new Set(sessions.map((s) => startOfDay(new Date(s.at)))).size;

  return (
    <div className="flex h-full flex-col bg-paper">
      {header}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Score + narrative */}
        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
          <span className="text-accent">
            <ScoreDial score={overall} size={116} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">7-day average</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              {delta > 2 ? (
                <>Your voice is trending <strong className="text-accent">up {delta} points</strong> vs last week. Steadiness is improving nicely.</>
              ) : delta < -2 ? (
                <>Down {Math.abs(delta)} points on last week — a lighter week is normal. Keep the gentle warm-ups going.</>
              ) : (
                <>Holding steady vs last week. Consistency is doing its job.</>
              )}
            </p>
          </div>
        </div>

        {/* Trend */}
        <div className="mt-4 rounded-2xl border border-line bg-surface p-4 text-accent">
          <div className="mb-1 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Last 14 days</p>
            <p className="font-mono text-[11px] text-ink-3">health score</p>
          </div>
          <TrendChart points={trend} />
        </div>

        {/* Stat grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat value={String(daysActive)} label="days active" />
          <Stat value={`${streak}`} label="day streak" />
          <Stat value={`${bestMpt}s`} label="best phonation time" />
          <Stat value={`${maxRange}`} label="widest range (st)" />
        </div>

        {/* This week detail */}
        <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">This week</p>
          <MetricRow label="Steadiness" value={avgSteadiness} suffix="/100" />
          <MetricRow label="Sessions" value={thisWeek.length} max={7} suffix="" bare />
          <MetricRow
            label="Consistency"
            value={Math.round((new Set(thisWeek.map((s) => startOfDay(new Date(s.at)))).size / 7) * 100)}
            suffix="%"
          />
        </div>

        {/* By exercise */}
        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-3">By exercise</p>
        <div className="mt-2 space-y-2">
          {byExercise.map((e) => (
            <div key={e.name} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{e.name}</p>
                <p className="font-mono text-[11px] text-ink-3">
                  {e.count} session{e.count > 1 ? "s" : ""}
                </p>
              </div>
              <div className="w-24">
                <MetricBar value={e.avg} />
              </div>
              <span className="w-8 text-right font-mono text-sm text-ink">{e.avg}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 rounded-xl bg-accent-tint/60 px-4 py-3 text-xs leading-relaxed text-ink-2">
          A plain-language summary of what you practised and where your voice is trending — the kind
          of overview that&apos;s easy to share at a check-up instead of scrubbing through raw
          recordings.
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-ink-2">{label}</p>
    </div>
  );
}

function MetricRow({
  label,
  value,
  suffix,
  max = 100,
  bare = false,
}: {
  label: string;
  value: number;
  suffix: string;
  max?: number;
  bare?: boolean;
}) {
  return (
    <div className="mt-3 first:mt-2">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-ink-2">{label}</span>
        <span className="font-mono text-sm text-ink">
          {value}
          {bare ? ` / ${max}` : suffix}
        </span>
      </div>
      <MetricBar value={value} max={max} />
    </div>
  );
}
