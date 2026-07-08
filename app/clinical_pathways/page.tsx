import type { Metadata } from "next";
import Image from "next/image";
import Placeholder from "@/components/Placeholder";
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
          Designed a visual pathway builder that made our backend architecture
          configurable and demonstrable. Shipped in 6 weeks, supported a
          national NHS contract win, and built the commercial case for a full
          data-model rebuild.
        </p>
        <div className="mt-8">
          <Placeholder
            label="Isla waiting list validation pathway — visual builder UI with event, request and branching pathway cards"
            aspect="aspect-[16/10]"
          />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Business need</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            Our healthcare platform handles complex patient journeys behind the
            scenes. It sent messages, routes patients down different paths
            based on their answers. But none of this was visible and clients
            were untrusting of our capabilities.
          </p>
          <p>
            Sales teams couldn&apos;t show new clients what they were buying.
            Delivery teams couldn&apos;t walk an existing client through their
            own setup in a meeting.
          </p>
          <p>The product was doing meaningful work and no one could point to it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Challenge</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            We had six weeks. Whatever we shipped had to be credible enough to
            use in front of a national NHS audience. The question I was trying
            to answer was:{" "}
            <strong>what is the smallest version that earns trust with our clients.</strong>
          </p>
          <p>That meant being deliberate about three things:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>What to show. What to hide</li>
            <li>
              How to create one visual language that worked for two different
              audiences: clinical leads and operational buyers
            </li>
            <li>How to design within the existing data model without exposing its limitations</li>
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Research</h2>

        <div className="mt-6 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <Placeholder
            label="Research synthesis boards — pathway notes and clustered sticky notes from clinical lead sessions"
            aspect="aspect-[4/3]"
          />
          <div className="leading-relaxed text-ink/80">
            <p>I ran sessions with clinical leads in 2 NHS trusts.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                &ldquo;I want to see - OK my patients are going to receive text
                3 days after surgery&rdquo; NUH clinical lead
              </li>
              <li>
                &ldquo;How do I know the different responses will be put into
                the correct lists&rdquo; Nursing lead, MCHT
              </li>
            </ul>
            <p className="mt-3">There was a lack of trust because of the lack of visibility</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="leading-relaxed text-ink/80 sm:order-1">
            <p>Understanding the 2 user types needs.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Clinical leads scanned for patients: where does this patient
                end up if they answer X?
              </li>
              <li>
                Operational buyers scanned for reporting: How can I report on
                how many patients my teams sees?
              </li>
            </ul>
          </div>
          <Image
            src="/clinical-pathways/persona-mapping.png"
            alt="User persona mapping boards for CFA admin, admin triaging, researcher and admin pathway builder, with app screens and clustered notes for each"
            width={1800}
            height={1016}
            className="rounded-xl border border-line bg-surface sm:order-2"
          />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Principles</h2>
        <div className="mt-6 space-y-8">
          <div>
            <h3 className="font-mono text-sm text-ink-2">01. What to show, what to hide</h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              Surface tags and automation logic, clinically more safe to show
              the why behind what is happening
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
              No good states, no fictional flexibility. The canvas only renders
              what the data model can actually express. But every interaction
              was sketched twice. Once for the 3-branch MVP we were shipping,
              once for the 30-branch system clients would grow into. The MVP
              shipped clean. The case for a full schema rebuild made itself.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Placeholder
            label="Pathway canvas wireframe — branching flow diagram with state labels"
            aspect="aspect-[16/7]"
          />
        </div>

        <div className="mt-8 space-y-4 text-center italic text-ink-2">
          <p>&ldquo;We need to see the automated tags that are being applied and why&rdquo;</p>
          <p>&ldquo;Flexible canvas would require too much technical implementation for MVP&rdquo;</p>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">What shipped</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            The canvas surfaces three things by default: where the patient
            enters the journey, what happens at each touch point, and the
            automated paths the patient could take. Users can expand any branch
            to see detail, collapse it to see structure, and move into pathway
            settings without losing their place.
          </p>
          <p>
            The biggest design decision was make a canvas within the
            constraints of the data. We shipped a solution that validated how
            showing our customers the underlying logic validated their
            assumptions about the platform.
          </p>
        </div>
        <div className="mt-8">
          <Placeholder
            label="Shipped pathway builder — waiting list validation pathway canvas in the Isla product"
            aspect="aspect-[16/10]"
          />
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
            rebuild which is currently in progress
          </li>
        </ul>
      </section>

      <NextProject href="/vocalynx" title="Vocalynx" />
    </article>
  );
}
