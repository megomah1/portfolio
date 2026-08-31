import type { Metadata } from "next";
import Image from "next/image";
import StatBlock from "@/components/StatBlock";
import NextProject from "@/components/NextProject";
import PathwayShowcase from "@/components/PathwayShowcase";

export const metadata: Metadata = {
  title: "Visualising Clinical Pathway Data",
  description:
    "I designed a visual pathway builder that turned Isla's invisible backend into something NHS clients could see, trust and configure live. Prototyped with AI to fit a six-week window, it supported a national NHS contract win and made the case for a full data-model rebuild.",
};

export default function ClinicalPathwaysPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Visualising Clinical Pathway Data</h1>

      <p className="mt-6 text-lg leading-relaxed text-ink-2">
        I designed a visual pathway builder that turned Isla&apos;s invisible
        backend into something NHS clients could see, trust and configure live.
        Prototyped with AI to fit a six-week window, it supported a national NHS
        contract win and made the case for a full data-model rebuild.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-3">
        <StatBlock value="5" unit="trusts" label="live on node pathways" />
        <StatBlock value="45" label="national pathways planned by year end" />
        <StatBlock value="6" unit="weeks" label="concept to shipped MVP" />
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Discipline</dt>
          <dd className="mt-1 italic text-ink/80">UX, UI · Research</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Timeline</dt>
          <dd className="mt-1 italic text-ink/80">6 weeks</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Team</dt>
          <dd className="mt-1 italic text-ink/80">1 designer (me), 1 PM, 1 developer</dd>
        </div>
      </dl>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Business need</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            Our platform runs complex patient journeys behind the scenes,
            messaging patients and routing them on their answers, but none of it
            was visible. To align with NHS clients, we&apos;d been mapping their
            pathways end to end in FigJam: from eRS referral through Isla,
            patient contact and the EPR, to the hospital.
          </p>
          <p>
            Doing that across trusts made the problem obvious. Clients
            couldn&apos;t see the product working, so they couldn&apos;t trust or
            defend it. Sales couldn&apos;t demo it; delivery couldn&apos;t walk a
            client through their own setup. The mapping also exposed where Isla
            didn&apos;t hold the data to represent a step. That invisibility, and
            those gaps, became the case for a builder.
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

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">What I did</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Mapped the pathways end to end with NHS clients.</strong>{" "}
              In FigJam, across trusts, from referral to hospital.{" "}
              <em>
                Objective: find the structure common to every trust, and expose
                where Isla didn&apos;t hold the data to represent a step.
              </em>
            </li>
            <li>
              <strong>Ran discovery with clinical leads.</strong> Sessions at
              NUH and MCHT, retested through build.{" "}
              <em>
                Objective: understand why clients didn&apos;t trust a working
                product. The answer was visibility, not function.
              </em>
            </li>
            <li>
              <strong>
                Prototyped the canvas with AI to hit the six-week window.
              </strong>{" "}
              Used Figma Make to build a scalable, interactive prototype in days,
              with a right-hand step library and drag-and-drop.{" "}
              <em>
                Objective: get engineers, clients and me reacting to one working
                thing, fast.
              </em>
            </li>
            <li>
              <strong>Ran a clinical safety workshop.</strong> Defined validation
              rules, protected states for active pathways, and inline warnings
              that block an unsafe build from saving.{" "}
              <em>
                Objective: keep live pathways safe. The AI bought speed, the
                safety thinking was mine.
              </em>
            </li>
            <li>
              <strong>
                Turned the AI interactions into Figma design files and
                components.
              </strong>{" "}
              Once the interactions were settled, I built them out in Figma with
              exact measurements and components referencing our design system, so
              engineers had everything to pull from.{" "}
              <em>
                Objective: hand engineers precise specs and reusable components,
                not just a prototype.
              </em>
            </li>
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <figure>
            <Image
              src="/clinical-pathways/brainstorm.png"
              quality={90}
              alt="FigJam brainstorm board exploring how users think about pathways, with clustered sticky notes on user understanding, adoption, success measurement and a mapped emergency laparotomy pathway"
              width={2000}
              height={1110}
              className="rounded-xl border border-line bg-surface"
            />
            <figcaption className="mt-3 text-sm text-ink-3">
              Mapping and discovery: clustering how each trust thinks about a
              pathway.
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/clinical-pathways/personas.png"
              quality={90}
              alt="Persona boards for admin users: an SPA admin, an admin, a researcher and an ideal admin persona, each with goals, workflow, pain points and frustrations"
              width={1190}
              height={779}
              className="rounded-xl border border-line bg-surface"
            />
            <figcaption className="mt-3 text-sm text-ink-3">
              Personas built from the interviews, so the canvas served real
              roles, not the system&apos;s logic.
            </figcaption>
          </figure>
        </div>

        <figure className="mt-8">
          <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4">
            <Image
              src="/clinical-pathways/wireframe-flow.png"
              quality={95}
              alt="AI-built interactive prototype of the pathway canvas: a horizontal flow of referral, form and image, decision, appointment and assessment steps, with branches for responded and discharged states"
              width={1202}
              height={310}
              className="w-full min-w-[720px]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-3">
            The AI-built Figma Make prototype: an interactive canvas with a
            right-hand step library and drag-and-drop, working within days.
          </figcaption>
        </figure>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">What shipped</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          The shipped canvas reads left to right: where a patient enters, what
          happens at each step, and the automated paths they could take. Expand
          any branch for detail, collapse it for structure. The pattern that
          carried a three-branch MVP now holds pathways with dozens of nodes.
        </p>

        <div className="mt-10">
          <PathwayShowcase />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Impact</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/80">
          <li>5 trusts live on node pathways.</li>
          <li>45 national pathways planned for rollout by year end.</li>
          <li>
            Sales and delivery walked clients through live pathways in real
            time, for the first time.
          </li>
          <li>
            Selected for a national NHS project shortly after launch, the canvas
            supporting the conversation.
          </li>
          <li>
            The MVP made the commercial case for a full data-model rebuild, now
            in progress.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Where I&apos;d take it next</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          The MVP was deliberately built to scale first: a structure that could
          keep adding nodes and hold up across trusts, before a polished UI.
          Next I&apos;d take it to client-grade: refining the interface, language
          and usability by usability-testing the shipped version with builders
          and clinical leads, and feeding what surfaces back into the canvas.
        </p>
      </section>

      <NextProject href="/vocalynx" title="Vocalynx" />
    </article>
  );
}
