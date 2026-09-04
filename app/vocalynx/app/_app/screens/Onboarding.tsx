"use client";

import { useState } from "react";
import type { Store } from "../store";
import Aperture from "../viz/Aperture";
import { ChevronRight } from "../viz/icons";

// First-run setup. The one decision that matters here is whether the person
// owns a Vocalynx handheld — the app works fully either way, this just tailors
// the straw exercises and the aperture guide. Everything else has a sensible
// default they can change later in Profile.

type Step = "welcome" | "device" | "band";

const bandLabel: Record<number, string> = {
  3: "recovery",
  5: "gentle",
  7: "warm-up",
  9: "open",
};

export default function Onboarding({ store }: { store: Store }) {
  const settings = store.data?.settings;
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState(settings?.name ?? "");
  const [band, setBand] = useState(settings?.apertureMm ?? 7);

  const finish = (hasDevice: boolean) => {
    store.updateSettings({
      name: name.trim() || "there",
      hasDevice,
      apertureMm: hasDevice ? band : (settings?.apertureMm ?? 7),
      onboarded: true,
    });
  };

  const dots = (["welcome", "device", "band"] as Step[]).filter(
    (s) => s !== "band" || step === "band"
  );

  return (
    <div className="flex h-full flex-col">
      {step === "welcome" ? (
        <div className="flex h-full flex-col justify-between bg-accent px-7 py-10 text-paper">
          <div />
          <div className="text-center">
            <p aria-hidden className="text-4xl leading-none">
              ⌄
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">vocalynx</h1>
            <p className="mt-2 font-display text-lg italic text-paper/80">find your voice</p>
            <p className="mx-auto mt-6 max-w-[16rem] text-sm leading-relaxed text-paper/80">
              Guided vocal exercises with live feedback, a voice log, and a report that shows how
              your voice is healing.
            </p>
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest text-paper/70">
              What should we call you?
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-xl border border-paper/30 bg-paper/10 px-4 py-3 text-paper outline-none placeholder:text-paper/50 focus:border-paper/70"
            />
            <button
              onClick={() => setStep("device")}
              className="mt-4 w-full rounded-full bg-paper py-3.5 font-medium text-accent transition-transform active:scale-[0.98]"
            >
              Get started
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col px-7 py-10">
          <div className="flex justify-center gap-1.5">
            {dots.map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? "w-6 bg-accent" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>

          {step === "device" && (
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col justify-center text-center">
                <div className="mx-auto">
                  <Aperture mm={7} />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold">
                  Do you have a Vocalynx handheld?
                </h2>
                <p className="mx-auto mt-3 max-w-[18rem] text-sm leading-relaxed text-ink-2">
                  The Vocalynx is a small handheld you hum through — you twist it to set the
                  aperture for each exercise. It&apos;s optional: everything in the app works
                  without one.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setStep("band")}
                  className="flex w-full items-center justify-between rounded-2xl bg-accent px-5 py-4 text-left text-paper transition-transform active:scale-[0.99]"
                >
                  <span>
                    <span className="block font-medium">Yes, I have one</span>
                    <span className="block text-sm text-paper/70">Set my therapy band</span>
                  </span>
                  <ChevronRight />
                </button>
                <button
                  onClick={() => finish(false)}
                  className="flex w-full items-center justify-between rounded-2xl border border-line px-5 py-4 text-left transition-colors hover:border-accent"
                >
                  <span>
                    <span className="block font-medium text-ink">No — I&apos;ll use the app on its own</span>
                    <span className="block text-sm text-ink-2">Straw exercises still work by ear</span>
                  </span>
                  <ChevronRight className="text-ink-3" />
                </button>
              </div>
            </div>
          )}

          {step === "band" && (
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <h2 className="font-display text-2xl font-semibold">Set your therapy band</h2>
                <p className="mt-2 max-w-[16rem] text-sm text-ink-2">
                  Twist your Vocalynx to match. You can change this any time.
                </p>
                <div className="mt-6">
                  <Aperture mm={band} />
                </div>
                <p className="mt-4 font-display text-3xl font-semibold text-accent">
                  {band.toFixed(1)} mm
                </p>
                <p className="text-xs text-ink-3">{bandLabel[band] ?? "therapy band"}</p>
                <div className="mt-5 flex gap-2">
                  {[3, 5, 7, 9].map((mm) => (
                    <button
                      key={mm}
                      onClick={() => setBand(mm)}
                      className={`h-10 w-10 rounded-full font-mono text-sm ${
                        band === mm ? "bg-accent text-paper" : "border border-line text-ink-2"
                      }`}
                    >
                      {mm}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => finish(true)}
                className="w-full rounded-full bg-accent py-3.5 font-medium text-paper transition-transform active:scale-[0.98]"
              >
                Continue
              </button>
              <button
                onClick={() => setStep("device")}
                className="mt-2 w-full py-2 text-sm text-ink-2"
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
