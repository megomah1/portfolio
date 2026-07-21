import type { Metadata } from "next";
import Image from "next/image";
import NextProject from "@/components/NextProject";

export const metadata: Metadata = {
  title: "Visualising Clinical Pathway Data",
  description:
    "Designed a visual pathway builder that made our backend architecture configurable and demonstrable. Shipped in 6 weeks, supported a national NHS contract win, and built the commercial case for a full data-model rebuild.",
};

export default function ClinicalPathwaysPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Visualising Clinical Pathway Data</h1>
      <p className="mt-4 text-xl italic text-ink-2">
        Making complex care logic legible, for the right audience
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 text-sm sm:grid-cols-4">
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Discipline</dt>
          <dd className="mt-1 italic text-ink/80">UX, UI · Research</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Reading time</dt>
          <dd className="mt-1 italic text-ink/80">4 minutes</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Timeline</dt>
          <dd className="mt-1 italic text-ink/80">6 weeks</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Team</dt>
          <dd className="mt-1 italic text-ink/80">
            1 designer (me), 1 product manager, 1 software developer
          </dd>
        </div>
      </dl>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          I designed a visual pathway builder that made our backend
          architecture configurable and demonstrable. It shipped in six weeks,
          supported a national NHS contract win, and built the commercial case
          for a full data-model rebuild.
        </p>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Business need</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            Our healthcare platform handles complex patient journeys behind the
            scenes: it sends messages and routes patients down different paths
            based on their answers. But none of it was visible — and clients
            didn&apos;t trust what they couldn&apos;t see.
          </p>
          <p>
            Sales teams couldn&apos;t show new clients what they were buying.
            Delivery teams couldn&apos;t walk an existing client through their
            own setup in a meeting.
          </p>
          <p>The product was doing meaningful work, and no one could point to it.</p>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Challenge</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            We had six weeks. Whatever we shipped had to be credible enough to
            put in front of a national NHS audience. The question I was trying
            to answer:{" "}
            <strong>what&apos;s the smallest version that earns trust with our clients?</strong>
          </p>
          <p>That meant being deliberate about three things:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>What to show, and what to hide</li>
            <li>
              How to create one visual language that worked for two different
              audiences: clinical leads and operational buyers
            </li>
            <li>How to design within the existing data model without exposing its limitations</li>
          </ul>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Research</h2>

        <div className="mt-6 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <Image
            src="/clinical-pathways/brainstorm.png"
            alt="FigJam brainstorm board exploring how users think about pathways, with clustered sticky notes on user understanding, adoption, success measurement and a mapped emergency laparotomy pathway"
            width={2000}
            height={1110}
            className="rounded-xl border border-line bg-surface"
          />
          <div className="leading-relaxed text-ink/80">
            <p>I ran sessions with clinical leads in two NHS trusts.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                &ldquo;I want to see — OK, my patients are going to receive a
                text 3 days after surgery&rdquo; — NUH clinical lead
              </li>
              <li>
                &ldquo;How do I know the different responses will be put into
                the correct lists?&rdquo; — Nursing lead, MCHT
              </li>
            </ul>
            <p className="mt-3">The mistrust came from a lack of visibility.</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="leading-relaxed text-ink/80 sm:order-1">
            <p>The two user types needed different things from the same view.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Clinical leads scanned for patients: where does this patient end
                up if they answer X?
              </li>
              <li>
                Operational buyers scanned for reporting: how do I report on how
                many patients my team sees?
              </li>
            </ul>
          </div>
          <Image
            src="/clinical-pathways/personas.png"
            alt="Persona boards for admin users — Tony McGuin (SPA admin), Joanna Michalska (admin), Clare Gately (researcher) and an ideal admin persona, each with goals, workflow, pain points and frustrations"
            width={1190}
            height={779}
            className="rounded-xl border border-line bg-surface sm:order-2"
          />
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Principles</h2>
        <div className="mt-6 space-y-8">
          <div>
            <h3 className="font-mono text-sm text-ink-2">01. What to show, what to hide</h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              Surface the tags and automation logic. Clinically, it&apos;s safer
              to show the why behind what&apos;s happening than to hide it.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm text-ink-2">02. One language for two audiences</h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              Clinical leads read for safety, operational buyers for control.
              Same canvas, two reading orders: colour-coded states for
              clinicians, branch counts for operations.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm text-ink-2">
              03. Design within the data, and ahead of it
            </h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              No good states, no fictional flexibility — the canvas only renders
              what the data model can actually express. But every interaction
              was sketched twice: once for the 3-branch MVP we were shipping,
              once for the 30-branch system clients would grow into. The MVP
              shipped clean, and the case for a full schema rebuild made itself.
            </p>
          </div>
        </div>

        <figure className="mt-8">
          <Image
            src="/clinical-pathways/pathway-wireframe.png"
            alt="Branching pathway canvas wireframe — a patient journey splitting into responded, awaiting response and no response states across two decision points"
            width={1235}
            height={299}
            className="w-full rounded-xl border border-line bg-surface p-4"
          />
          <figcaption className="mt-3 text-center text-sm text-ink-3">
            The canvas branches on each response — responded, awaiting response,
            no response — across every decision point.
          </figcaption>
        </figure>

        <div className="mt-10 space-y-4 border-l-2 border-accent pl-6 italic text-ink-2">
          <p>&ldquo;We need to see the automated tags that are being applied, and why.&rdquo;</p>
          <p>&ldquo;A flexible canvas would require too much technical implementation for the MVP.&rdquo;</p>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">What shipped</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            The canvas surfaces three things by default: where the patient
            enters the journey, what happens at each touch point, and the
            automated paths they could take. Users can expand any branch to see
            detail, collapse it to see structure, and move into pathway settings
            without losing their place.
          </p>
          <p>
            The biggest decision was to build the canvas within the constraints
            of the data, not around them. Showing customers the underlying logic
            validated their assumptions about the platform.
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Impact</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/80">
          <li>Delivery and sales walked clients through live pathways in real time for the first time.</li>
          <li>
            The platform was selected for a national NHS project shortly after
            launch, with the canvas supporting the conversation.
          </li>
          <li>
            The shipped MVP made the commercial case for a full data-model
            rebuild, which is currently in progress.
          </li>
        </ul>
      </section>

      <NextProject href="/vocalynx" title="Vocalynx" />
    </article>
  );
}
