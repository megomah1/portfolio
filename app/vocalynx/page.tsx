import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import NextProject from "@/components/NextProject";

export const metadata: Metadata = {
  title: "Vocalynx (Founder)",
  description:
    "Vocalynx is a portable phonation device and companion app that helps singers, performers and post-surgical patients rebuild vocal strength, without the plastic straws, the guesswork, or the silence between sessions.",
};

const insights = [
  {
    heading: (
      <>
        Users are <em>working blind</em> between sessions.
      </>
    ),
    body: "Every SLT I interviewed described the same gap: no quantifiable feedback on whether home practice happened, was correct, or had any effect",
  },
  {
    heading: <>Users want to track their progress at home</>,
    body: "No way to track progress without a professional vocal teacher or speech therapist measuring it",
  },
  {
    heading: <>No easy way to record and share vocal progress</>,
    body: "Uploading recordings on the go meant juggling Dropbox and Google Drive logins — most users simply stopped",
  },
  {
    heading: <>Existing tools cost too much</>,
    body: (
      <>
        The £209 competitor tool ships <em>five</em> separate parts. Musicians
        and busy people on the go kept losing pieces
      </>
    ),
  },
];

const decisions = [
  {
    number: "Decision 1",
    heading: "Single device not five",
    body: "The market-leading tool ships as five loose parts that users kept losing. Vocalynx is one sealed unit — nothing to assemble, nothing to lose, and cheaper to manufacture.",
  },
  {
    number: "Decision 2",
    heading: "Immediate visual feedback",
    body: "Users practising at home were working blind. A built-in aperture guide gives a visual target for every exercise, so users can see they're doing it correctly without a professional in the room.",
  },
  {
    number: "Decision 3",
    heading: "Easy way to upload sound recordings",
    body: "Progress recordings lived in scattered Dropbox and Google Drive folders. One-tap recording in the companion app captures a voice sample in seconds and shares it straight to the user's therapist.",
  },
];

export default function VocalynxPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Designing a tool to <em>find</em> the voice before it breaks.
      </h1>

      <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-line py-8 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Discipline</dt>
          <dd className="mt-1 italic text-ink/80">
            Product · Industrial · Research
          </dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Reading time</dt>
          <dd className="mt-1 italic text-ink/80">3 minutes</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Context</dt>
          <dd className="mt-1 italic text-ink/80">
            University research → Founder
          </dd>
        </div>
      </dl>

      <p className="mt-8 text-lg leading-relaxed text-ink-2">
        Vocalynx is a portable phonation device and companion app that helps
        singers, performers and post-surgical patients rebuild vocal strength,
        without the plastic straws, the guesswork, or the silence between
        sessions.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Placeholder
          label="Vocalynx companion app — log in screen and 'Hi, Mona' home screen with Straw warm-up session"
          aspect="aspect-[4/3]"
        />
        <Placeholder
          label="Vocalynx phonation device — single sealed handheld unit render"
          aspect="aspect-[4/3]"
        />
      </div>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Challenge</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          People with vocal injuries have no way of knowing if they&apos;re
          doing their therapy exercises correctly unless they&apos;re with a
          trained professional
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/80">
          <li>No visual feedback</li>
          <li>Exercises are difficult, discouraging and loud</li>
          <li>Shame and embarrassment associated with vocal exercises</li>
        </ul>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Research</h2>
        <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
          <p className="font-display text-3xl font-semibold sm:text-4xl">What the evidence said</p>
          <p className="leading-relaxed text-ink/80">
            I spoke to Speech &amp; Language Therapists, ran a survey of{" "}
            <strong>58 voice-users</strong> (singers, teachers, broadcasters),
            and benchmarked the small market of clinical phonation tools. Four
            insights shaped the device.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {insights.map((insight, i) => (
            <div key={i} className="bg-paper p-6">
              <h3 className="text-lg font-semibold">{insight.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {insight.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">The design direction</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          Each decision was anchored to a clinical insight, and checked against
          manufacturing feasibility for MVP.
        </p>

        <div className="mt-8 space-y-8">
          {decisions.map((decision) => (
            <div key={decision.number} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-8">
              <div>
                <p className="font-mono text-sm text-ink-2">{decision.number}</p>
                <h3 className="mt-1 text-2xl font-semibold text-accent">
                  {decision.heading}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-2">
                {decision.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">The solution</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          The companion app pairs with the device: an aperture guide for
          warm-ups, one-tap voice samples, and a profile that keeps the
          therapy prescription, progress reports and reminders in one place.
        </p>
        <div className="mt-8">
          <Placeholder
            label="Vocalynx app tools — aperture guide (7.0 mm warm-up), voice samples recording screen, and profile with prescription and reminders"
            aspect="aspect-[16/9]"
          />
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Outcome and solution</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          Designing the hardware and the app together meant every interface
          decision had a physical constraint behind it — the 7 mm aperture, the
          single sealed unit, the hum that stands in for data. The lesson that
          stuck: <em>reducing the parts reduced the anxiety</em>, as much as
          the cost.
        </p>
      </section>

      <NextProject href="/quick_submit" title="A quicker way to submit images" />
    </article>
  );
}
