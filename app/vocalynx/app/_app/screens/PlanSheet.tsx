"use client";

import type { Store } from "../store";
import type { Reminder } from "../types";
import { BackIcon, CloseIcon } from "../viz/icons";

// Prescription (daily practice goal) + reminders. Both Profile rows open this
// sheet; `focus` just scrolls attention to the relevant section heading.

export default function PlanSheet({
  store,
  onClose,
}: {
  store: Store;
  onClose: () => void;
}) {
  const data = store.data;
  if (!data) return null;
  const { dailyGoalMin, reminders } = data.settings;

  const setGoal = (v: number) =>
    store.updateSettings({ dailyGoalMin: Math.max(4, Math.min(40, v)) });

  const setReminders = (next: Reminder[]) => store.updateSettings({ reminders: next });
  const editTime = (id: string, time: string) =>
    setReminders(reminders.map((r) => (r.id === id ? { ...r, time } : r)));
  const toggle = (id: string) =>
    setReminders(reminders.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));
  const remove = (id: string) => setReminders(reminders.filter((r) => r.id !== id));
  const add = () =>
    setReminders([...reminders, { id: `r-${Date.now()}`, time: "12:00", on: true }]);

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-paper pb-6">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 hover:bg-surface"
          aria-label="Back"
        >
          <BackIcon />
        </button>
        <h1 className="font-display text-lg font-semibold">Plan &amp; reminders</h1>
      </div>

      <div className="px-5">
        {/* Prescription */}
        <section className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
            Daily practice goal
          </p>
          <div className="mt-2 flex items-center justify-between rounded-2xl border border-line bg-surface p-5">
            <button
              onClick={() => setGoal(dailyGoalMin - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-2xl text-ink-2"
              aria-label="Decrease goal"
            >
              −
            </button>
            <div className="text-center">
              <p className="font-display text-4xl font-semibold text-ink">{dailyGoalMin}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">min / day</p>
            </div>
            <button
              onClick={() => setGoal(dailyGoalMin + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-2xl text-ink-2"
              aria-label="Increase goal"
            >
              +
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-3">
            A gentle, consistent daily dose beats long occasional sessions for vocal recovery.
          </p>
        </section>

        {/* Reminders */}
        <section className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Reminders</p>
          <div className="mt-2 space-y-2">
            {reminders.length === 0 && (
              <p className="rounded-xl bg-surface px-4 py-4 text-center text-sm text-ink-2">
                No reminders yet.
              </p>
            )}
            {reminders.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3"
              >
                <input
                  type="time"
                  value={r.time}
                  onChange={(e) => editTime(r.id, e.target.value)}
                  className="rounded-lg border border-line bg-paper px-2 py-1.5 font-mono text-sm text-ink outline-none focus:border-accent"
                />
                <span className="flex-1 text-sm text-ink-2">{r.on ? "On" : "Off"}</span>
                <button
                  role="switch"
                  aria-checked={r.on}
                  onClick={() => toggle(r.id)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                    r.on ? "bg-accent" : "bg-line"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-paper shadow transition-transform ${
                      r.on ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-3 hover:text-sienna"
                  aria-label="Remove reminder"
                >
                  <CloseIcon className="!h-4 !w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={add}
            className="mt-3 w-full rounded-full border border-accent py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent-tint"
          >
            Add a reminder
          </button>
          <p className="mt-2 text-xs leading-relaxed text-ink-3">
            A working prototype can&apos;t send push notifications from the browser — this is where
            you&apos;d manage them.
          </p>
        </section>
      </div>
    </div>
  );
}
