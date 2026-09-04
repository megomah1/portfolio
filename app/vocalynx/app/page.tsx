import type { Metadata } from "next";
import Link from "next/link";
import VocalynxApp from "./_app/VocalynxApp";

export const metadata: Metadata = {
  title: "Vocalynx — the app",
  description:
    "A working prototype of the Vocalynx companion: guided vocal exercises with live visual feedback, a voice log, and a vocal-health report — usable with just your phone's microphone.",
};

export default function VocalynxAppPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-3">
          Interactive prototype
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Vocalynx, <em>working</em>.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          The case-study concept, built into a real app. It listens through your microphone to
          guide exercises, visualise your voice and breathing, log how you sound, and chart your
          vocal recovery over time — all on-device, no account, nothing uploaded.
        </p>
        <p className="mt-3 text-sm text-ink-3">
          Best on a phone. Allow microphone access for live feedback; it falls back to a demo
          signal if you&apos;d rather not. Everything works without the physical device.
        </p>
      </div>

      {/* Phone frame */}
      <div className="mt-12 flex justify-center">
        <div className="relative w-full max-w-[390px]">
          <div className="absolute -inset-x-6 -inset-y-4 -z-10 rounded-[3rem] bg-accent-tint/40 blur-2xl sm:-inset-x-10" />
          <div className="h-[760px] max-h-[85vh] w-full overflow-hidden rounded-[2.5rem] border-[7px] border-ink/85 bg-paper shadow-2xl ring-1 ring-black/5">
            <VocalynxApp />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 border-t border-line pt-10 sm:grid-cols-3">
        <Feature
          title="See your voice"
          body="Live waveform, pitch tracking against a moving target, and a breathing pacer — so home practice isn't working blind."
        />
        <Feature
          title="Log your progress"
          body="One-tap voice takes with steadiness and phonation-time metrics, kept as a dated log you can play back."
        />
        <Feature
          title="Track the healing"
          body="A vocal-health score, 14-day trend and per-exercise breakdown — the summary a therapist can read at a glance."
        />
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <Link
          href="/vocalynx"
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          ← Read the Vocalynx case study
        </Link>
      </div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{body}</p>
    </div>
  );
}
