"use client";

import { useState } from "react";
import type { Store } from "../store";
import { ChevronRight } from "../viz/icons";

// The Profile tab — mirrors the case study: a person card, then the prescription,
// progress report, reminders, and device rows. (No therapist card for now.)

export default function Profile({
  store,
  onOpenPlan,
  onOpenReport,
  onOpenDevice,
}: {
  store: Store;
  onOpenPlan: () => void;
  onOpenReport: () => void;
  onOpenDevice: () => void;
}) {
  const data = store.data;
  const [editing, setEditing] = useState(false);
  if (!data) return null;
  const { settings, firstRun } = data;

  // eslint-disable-next-line react-hooks/purity -- "active for N days" is relative to now by design
  const days = Math.max(1, Math.floor((Date.now() - +new Date(firstRun)) / 86_400_000));
  const activeLabel =
    days < 7 ? `${days} day${days > 1 ? "s" : ""} active` : `${Math.round(days / 7)} weeks active`;

  const onReminders = settings.reminders.filter((r) => r.on).map((r) => r.time);
  const reminderSummary = onReminders.length ? onReminders.join(", ") : "Off";
  const deviceSummary = settings.hasDevice ? `⌀${settings.apertureMm} mm` : "App-only";
  const initial = (settings.name.trim()[0] || "V").toUpperCase();

  return (
    <div className="flex h-full flex-col overflow-y-auto px-5 pb-6">
      <div className="pt-5">
        <h1 className="font-display text-3xl font-semibold italic">Profile</h1>
      </div>

      {/* Person card */}
      <div className="mt-5 rounded-2xl bg-surface p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-paper">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            {editing ? (
              <input
                autoFocus
                value={settings.name}
                onChange={(e) => store.updateSettings({ name: e.target.value })}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
                className="w-full rounded-lg border border-line bg-paper px-2 py-1 text-lg font-medium text-ink outline-none focus:border-accent"
              />
            ) : (
              <p className="truncate font-display text-lg font-semibold text-ink">{settings.name}</p>
            )}
            <p className="text-sm text-ink-2">Singer · {activeLabel}</p>
          </div>
          <button
            onClick={() => setEditing((v) => !v)}
            className="shrink-0 text-sm font-medium text-accent"
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-line">
        <Row dot="accent" label="Prescription" value={`${settings.dailyGoalMin} min daily`} onClick={onOpenPlan} />
        <Row dot="accent" label="Progress report" value="weekly" onClick={onOpenReport} />
        <Row dot="sienna" label="Reminders" value={reminderSummary} onClick={onOpenPlan} />
        <Row dot="accent" label="Device & calibration" value={deviceSummary} onClick={onOpenDevice} last />
      </div>

      <button
        onClick={() => store.resetAll("empty")}
        className="mt-5 w-full rounded-full border border-line py-2.5 text-sm font-medium text-ink-2"
      >
        See the setup flow again
      </button>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-ink-3">
        vocalynx · prototype
      </p>
    </div>
  );
}

function Row({
  dot,
  label,
  value,
  onClick,
  last,
}: {
  dot: "accent" | "sienna";
  label: string;
  value: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 bg-surface px-4 py-3.5 text-left transition-colors hover:bg-accent-tint/40 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-sm ${dot === "accent" ? "bg-accent" : "bg-sienna"}`} />
      <span className="flex-1 text-sm font-medium text-ink">{label}</span>
      <span className="font-mono text-[11px] text-ink-3">{value}</span>
      <ChevronRight className="!h-4 !w-4 text-ink-3" />
    </button>
  );
}
