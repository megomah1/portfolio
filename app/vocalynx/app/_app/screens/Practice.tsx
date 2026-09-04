"use client";

import type { Exercise, ExerciseCategory } from "../types";
import type { Store } from "../store";
import { categoryLabels, exercises } from "../exercises";
import { ChevronRight, PlayIcon } from "../viz/icons";

const order: ExerciseCategory[] = ["warmup", "breath", "range", "recovery"];

export default function Practice({
  store,
  onStart,
}: {
  store: Store;
  onStart: (ex: Exercise) => void;
}) {
  const hasDevice = store.data?.settings.hasDevice ?? false;
  const grouped = order
    .map((cat) => ({ cat, items: exercises.filter((e) => e.category === cat) }))
    .filter((g) => g.items.length);

  return (
    <div className="flex h-full flex-col overflow-y-auto px-5 pb-6">
      <div className="pt-5">
        <h1 className="font-display text-3xl font-semibold">Practice</h1>
        <p className="mt-1 text-sm text-ink-2">
          Guided exercises with a rhythm to follow and live visual feedback.
        </p>
      </div>

      {grouped.map((g) => (
        <section key={g.cat} className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
            {categoryLabels[g.cat]}
          </p>
          <div className="mt-2 space-y-3">
            {g.items.map((ex) => (
              <button
                key={ex.id}
                onClick={() => onStart(ex)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-accent"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent transition-colors group-hover:bg-accent group-hover:text-paper">
                  <PlayIcon className="!h-4 !w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-lg font-semibold text-ink">{ex.name}</span>
                    {ex.usesDevice && (
                      <span className="rounded-full bg-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-2">
                        straw
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-ink-2">{ex.blurb}</span>
                  <span className="mt-1 block font-mono text-[11px] text-ink-3">
                    {Math.round(ex.minutes)} min · {ex.phases.length} steps
                  </span>
                </span>
                <ChevronRight className="shrink-0 text-ink-3" />
              </button>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-xs leading-relaxed text-ink-2">
        {hasDevice
          ? "Straw exercises will show the aperture to twist your Vocalynx to. Every exercise also works by ear."
          : "Every exercise works with just your phone. Straw exercises suggest a straw in a glass of water — a Vocalynx handheld gives a precise aperture, but it's never required."}
      </p>
    </div>
  );
}
