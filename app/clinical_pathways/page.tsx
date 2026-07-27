import type { Metadata } from "next";
import Image from "next/image";
import NextProject from "@/components/NextProject";
import PathwayShowcase from "@/components/PathwayShowcase";
import PathwayDetails from "@/components/PathwayDetails";

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
          <dd className="mt-1 italic text-ink/80">5 minutes</dd>
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
            based on their answers. But none of it was visible, and clients
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
        <h2 className="text-2xl font-semibold">Mapping the pathways end to end</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            Before designing anything, I mapped complete clinical pathways with
            NHS clients, from eRS referral through Isla, patient contact and
            the EPR, all the way to the hospital. Working across trusts let me
            understand what each one actually wanted, where their journeys were
            the same, and where they diverged.
          </p>
          <p>
            Mapping every touch point together did two things: it built a shared
            picture of the journey with the client, and it exposed where Isla
            was missing the data to represent a step. Those gaps became the
            argument for what the builder, and the data model behind it, had
            to support.
          </p>
        </div>

        <figure className="mt-8 -mx-6 sm:mx-0">
          <div className="overflow-x-auto rounded-none border-y border-line bg-surface sm:rounded-2xl sm:border">
            <Image
              src="/clinical-pathways/blueprint.png"
              alt="End-to-end clinical pathway service blueprint across five swimlanes (eRS/Referral, Isla DPP, Patient contact / NHS App / NHS notify, FDP / EPR and Hospital staff) mapped with sticky notes from workshops with NHS clients"
              width={1275}
              height={725}
              quality={95}
              className="w-full min-w-[900px]"
            />
          </div>
          <figcaption className="mt-3 px-6 text-sm text-ink-3 sm:px-0">
            One pathway mapped end to end with a trust, across every system and
            team it touches. Repeating this surfaced the common structure between
            trusts, and the data Isla didn&apos;t yet hold.
          </figcaption>
        </figure>
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
        <p className="mt-4 leading-relaxed text-ink/80">
          Research ran in two waves. Discovery with clinical leads at NUH and
          MCHT before build. Then a heuristics eval and a usability programme
          through build and post-launch: five sessions across varied roles (2
          consultants, 2 admin users, 1 clinician), delivery workshops, and a
          language validation session. Findings fed back into the builder, the
          terminology, and the patient record pattern.
        </p>

        <div className="mt-8 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <Image
            src="/clinical-pathways/brainstorm.png"
            quality={90}
            alt="FigJam brainstorm board exploring how users think about pathways, with clustered sticky notes on user understanding, adoption, success measurement and a mapped emergency laparotomy pathway"
            width={2000}
            height={1110}
            className="rounded-xl border border-line bg-surface"
          />
          <div className="leading-relaxed text-ink/80">
            <p>Discovery, with clinical leads at NUH and MCHT:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                &ldquo;I want to see: OK, my patients are going to receive a
                text 3 days after surgery&rdquo; · NUH clinical lead
              </li>
              <li>
                &ldquo;How do I know the different responses will be put into
                the correct lists?&rdquo; · Nursing lead, MCHT
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
            quality={90}
            alt="Persona boards for admin users: Tony McGuin (SPA admin), Joanna Michalska (admin), Clare Gately (researcher) and an ideal admin persona, each with goals, workflow, pain points and frustrations"
            width={1190}
            height={779}
            className="rounded-xl border border-line bg-surface sm:order-2"
          />
        </div>

        <p className="mt-10 leading-relaxed text-ink/80">
          The usability wave kept surfacing the same split: builders wanted the
          full picture, day-to-day clinicians wanted position, not
          configuration.
        </p>
        <blockquote className="mt-4 border-l-2 border-accent pl-6">
          <p className="italic leading-relaxed text-ink/80">
            &ldquo;Timeline good for data history, pathway view better for
            showing current patient position in pathway.&rdquo;
          </p>
          <p className="mt-2 text-sm text-ink-3">· Colleague, usability session</p>
        </blockquote>
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
            <p className="mt-4 leading-relaxed text-ink/80">
              After MVP shipped, the team wanted to bring the canvas into the
              patient record. I pushed back. Validation with day-to-day users
              (nurses, community clinicians, admins working on mobile) surfaced
              the opposite need. They said explicitly that a pathway view would
              be confusing and would clutter the timeline. They needed to know
              where a patient was on the journey, not how the pathway was
              configured. Builders get the canvas. Clinicians get a stepper. Two
              views, one data model.
            </p>
            <blockquote className="mt-4 border-l-2 border-accent pl-6">
              <p className="italic leading-relaxed text-ink/80">
                &ldquo;A pathway tab would be confusing… does not want to clutter
                the timeline.&rdquo;
              </p>
              <p className="mt-2 text-sm text-ink-3">· NUH clinical lead</p>
            </blockquote>
          </div>
          <div>
            <h3 className="font-mono text-sm text-ink-2">
              03. Design within the data, and ahead of it
            </h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              No good states, no fictional flexibility. The canvas only renders
              what the data model can actually express. But every interaction
              was sketched twice: once for the 3-branch MVP we were shipping,
              once for the 30-branch system clients would grow into. Consistent
              node dimensions, fixed connector geometry, left to right flow only.
              The pattern holds because the constraints are designed in, not out.
              I looked at n8n&apos;s node annotation and multi-trigger model as a
              reference for how experienced builders navigate complex flows. The
              MVP shipped clean, and the case for a full schema rebuild made
              itself.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <figure>
            <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4">
              <Image
                src="/clinical-pathways/wireframe-flow.png"
                quality={95}
                alt="Wireframe of the pathway canvas: a horizontal flow of referral, form and image, decision, appointment and assessment steps, with branches for responded and discharged states leading to lifestyle-optimisation requests"
                width={1202}
                height={310}
                className="w-full min-w-[720px]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-3">
              Early wireframe: laying the journey out left to right, with each
              step, its timing and its branches made explicit on the canvas.
            </figcaption>
          </figure>

          <figure>
            <div className="mx-auto max-w-md rounded-xl border border-line bg-surface p-4">
              <Image
                src="/clinical-pathways/wireframe-metrics.png"
                quality={95}
                alt="Wireframe showing a pathway with a metrics header (total patients, active, rejected, reviewed and abandoned) and branch percentages such as 10% and 80% on each step"
                width={766}
                height={595}
                className="w-full rounded-lg"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ink-3">
              Wireframing the reporting layer: cohort counts on top, and the
              share of patients taking each branch: the data operational buyers
              were asking for.
            </figcaption>
          </figure>
        </div>

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

        <div className="mt-8 rounded-xl border border-line bg-accent-tint/50 p-6">
          <p className="leading-relaxed text-ink/80">
            The library reads as &lsquo;Message&rsquo;, &lsquo;Wait&rsquo;,
            &lsquo;Wait for encounter&rsquo;, &lsquo;Update submission&rsquo;,
            &lsquo;Pathology result&rsquo;. Clinical vocabulary, not developer
            vocabulary. Node became Step. Delay became Wait. These were
            considered choices, validated with clinical leads before shipping.
          </p>
        </div>

        <div className="mt-10">
          <PathwayShowcase />
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">What I cut</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          Branch rescheduling was originally scoped for phase 2. When the team
          asked what use cases we had in the go-live pathways, the honest answer
          was none. I pushed to cut it and prioritise stages in the canvas
          instead, backed by demand from NUH, RBHH, and multiple national
          pathway builders. Killing scope on the evidence bought engineering a
          month back.
        </p>

        <div className="mt-10">
          <PathwayDetails />
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Impact</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/80">
          <li>5 trusts now live on node pathways.</li>
          <li>45 national pathways planned for rollout by end of year.</li>
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

        <blockquote className="mt-8 border-l-2 border-accent pl-6">
          <p className="italic leading-relaxed text-ink/80">
            &ldquo;Some lovely feedback for this node pathway using outcome nodes
            to review patients.&rdquo;
          </p>
          <p className="mt-2 text-sm text-ink-3">· Product</p>
        </blockquote>
      </section>

      <NextProject href="/vocalynx" title="Vocalynx" />
    </article>
  );
}
