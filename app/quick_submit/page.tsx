import type { Metadata } from "next";
import Image from "next/image";
import StatBlock from "@/components/StatBlock";
import NextProject from "@/components/NextProject";

const beforeScreens = [
  { label: "Choose patient", w: 330, h: 726 },
  { label: "Choose folder", w: 330, h: 726 },
  { label: "Add button", w: 330, h: 726 },
  { label: "Consent", w: 330, h: 726 },
  { label: "Add items", w: 330, h: 726 },
  { label: "Capture photo", w: 327, h: 710 },
  { label: "Upload", w: 327, h: 710 },
  { label: "Uploaded", w: 327, h: 710 },
];

const afterScreens = [
  { label: "Patient list" },
  { label: "Capture" },
  { label: "Review images" },
  { label: "Choose folder" },
  { label: "Confirm" },
  { label: "Done" },
];

export const metadata: Metadata = {
  title: "A quicker way to submit images",
  description:
    "I led the redesign of the core submission flow for NHS staff: the journey from deciding to capture a clinical image to filing it against a patient record. A 12-step process became six, and adoption reached 90%.",
};

export default function QuickSubmitPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">A quicker way to submit images</h1>

      <p className="mt-6 text-lg leading-relaxed text-ink-2">
        I led the redesign of the core submission flow for NHS staff: the journey
        from deciding to capture a clinical image to filing it against a patient
        record. A 12-step process became six, and adoption reached 90%.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-3">
        <StatBlock value="12→6" label="submission steps" />
        <StatBlock value="26" unit="min" label="of email workarounds, eliminated" />
        <StatBlock value="90" unit="%" label="clinician adoption, post-launch" />
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Discipline</dt>
          <dd className="mt-1 italic text-ink/80">UX, UI · Research</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Reading time</dt>
          <dd className="mt-1 italic text-ink/80">3 minutes</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Team</dt>
          <dd className="mt-1 italic text-ink/80">
            1 designer (me), 1 product manager, 1 software developer
          </dd>
        </div>
      </dl>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Business need</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            The existing flow wasn&apos;t being used. Clinicians were avoiding
            in-app submission entirely - one trust told us staff were spending 26
            minutes emailing images to themselves and uploading them manually
            when they got back to wifi.
          </p>
          <p>
            When we looked at the flow, the reason was clear. Before a nurse
            could take a single photo, they had to complete a sequence of
            administrative steps: find the patient, choose a folder, add a
            submission, give consent - and only then capture the image. 12
            steps in total, with search on top of that.
          </p>
          <p>The flow had been built around the system&apos;s logic, not the user&apos;s reality.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Research</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            This started as an offline-access investigation. A user had asked
            for full offline access, and I was researching how the platform
            held up on limited connectivity. That research reframed the problem:
            the real issue wasn&apos;t being offline. It was that capturing a
            single image meant loading the patient record and working through
            too many steps, each pulling more data than a weak signal could
            carry.
          </p>
          <p>What I did:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>
                Ran discovery and user research to find the real pain point.
              </strong>{" "}
              I spoke with around 10 users, community nurses, ward staff and
              team leads, mostly in Birmingham, to understand when and where
              they actually use the product.{" "}
              <em>
                Objective: separate the assumed problem (offline access) from
                the real one: too many steps, too much data, before you can even
                capture.
              </em>
            </li>
            <li>
              <strong>Interrogated the existing flow end to end.</strong> I
              mapped every screen from &ldquo;decide to capture&rdquo; to
              &ldquo;filed against the record&rdquo; and timed it at 26 minutes
              all in.{" "}
              <em>
                Objective: make the cost of the current order visible, and
                pinpoint where clinicians churned: choosing a folder while still
                with the patient.
              </em>
            </li>
            <li>
              <strong>Mapped personas and user flows in FigJam.</strong> I
              turned the interviews into personas and flow maps.{" "}
              <em>
                Objective: design for the clinician&apos;s reality
                (time-pressured, hands-on, mid-dressing-change), not the
                system&apos;s logic.
              </em>
            </li>
            <li>
              <strong>Looked outward for a better capture pattern.</strong> I
              pulled apart how Snapchat and Instagram handle capture, where
              persuasive design gets you to shoot and submit first, edit later.{" "}
              <em>
                Objective: borrow a &ldquo;capture first, admin after&rdquo;
                model so the right behaviour became the easiest one.
              </em>
            </li>
            <li>
              <strong>Validated the redesign with users and internally.</strong>{" "}
              I took the new flow back to clinicians and the team, ran usability
              testing, and noted what I&apos;d test next.{" "}
              <em>
                Objective: confirm the reversed order held up before build, not
                after.
              </em>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-2">
            Before · 9 screen, 16 steps - churning at screen 3
          </span>
          <p className="mt-4 leading-relaxed text-ink/80">
            The moment of action is not until screen 6, the churn is happening
            at screen 3 as they have to choose or create a folder while with
            patient.
          </p>

          <ol className="mt-6 flex gap-5 overflow-x-auto pb-2">
            {beforeScreens.map((screen, i) => (
              <li key={screen.label}>
                <figure className="w-40 shrink-0 sm:w-44">
                  <Image
                    src={`/quick-submit/before-${i + 1}.png`}
                    alt={`Isla before flow, step ${i + 1}: ${screen.label}`}
                    width={screen.w}
                    height={screen.h}
                    quality={90}
                    className="w-full rounded-xl border border-line shadow-[0_8px_24px_rgba(41,36,32,0.12)]"
                  />
                  <figcaption className="mt-3 text-xs text-ink-2">
                    <span className="font-medium text-ink">{i + 1}.</span> {screen.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <blockquote className="mt-16 border-y border-line py-10 text-center text-xl font-medium leading-relaxed sm:text-2xl">
        The admin steps weren&apos;t the problem. The{" "}
        <span className="text-sienna">order</span> was. So I
        flipped the flow: <strong>capture first, admin after.</strong>
      </blockquote>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Concept</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            Rather than rearranging the existing steps, I flipped the entire
            flow. The primary action became capture first, admin after so
            clinicians have more time to care for patients.
          </p>
          <p>
            A Submit button sits as the dominant action on the patient list.
            Tap it, take the photo, then fill in the details. The clinical
            moment is secured immediately. Everything else follows once the
            image is safe.
          </p>
          <p>
            The new flow: capture → review and consent → choose patient →
            choose folder → uploaded. Six steps, with search only if needed.
          </p>
          <p>
            This was a persuasive design decision. Making capture the path of
            least resistance meant the right behaviour became the easiest one.
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Final designs</h2>
        <span className="mt-4 inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-2">
          After · 6 steps, capture first
        </span>
        <p className="mt-4 leading-relaxed text-ink/80">
          A large submit button now sits as the dominant action. No friction
          between deciding to capture and capturing. The clinical moment is
          secured first; the cognitive load is saved to after.
        </p>

        <ol className="mt-6 flex gap-5 overflow-x-auto pb-2">
            {afterScreens.map((screen, i) => (
              <li key={screen.label}>
                <figure className="w-40 shrink-0 sm:w-44">
                  <Image
                    src={`/quick-submit/after-0${i + 1}.png`}
                    alt={`Isla after flow, step ${i + 1}: ${screen.label}`}
                    width={700}
                    height={1515}
                    quality={90}
                    className="w-full drop-shadow-[0_8px_24px_rgba(41,36,32,0.12)]"
                  />
                  <figcaption className="mt-3 text-xs text-ink-2">
                    <span className="font-medium text-ink">{i + 1}.</span> {screen.label}
                  </figcaption>
                </figure>
              </li>
            ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold">Outcome</h2>
        <div className="mt-6 grid grid-cols-1 items-center gap-8 sm:grid-cols-[auto_1fr]">
          <div>
            <p className="font-display text-6xl font-semibold text-accent">
              90<span className="text-3xl">%</span>
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-2">
              Adoption
            </p>
          </div>
          <p className="leading-relaxed text-ink/80">
            The redesign worked because it started from an honest observation
            about when and where clinicians actually use the product, and was
            willing to reverse an assumption that had been baked into the
            original design from the start.
          </p>
        </div>
      </section>

      <NextProject href="/clinical_pathways" title="Visualising Clinical Pathway Data" />
    </article>
  );
}
