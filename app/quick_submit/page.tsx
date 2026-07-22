import type { Metadata } from "next";
import Image from "next/image";
import StatBlock from "@/components/StatBlock";
import NextProject from "@/components/NextProject";

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
            The people using this product most were community nurses and ward
            staff - clinicians in time-pressured, often hands-on situations. A
            district nurse might have 30 minutes with a patient. A ward nurse
            might be mid-dressing change or chatting to patient.
          </p>
          <p>
            What became clear from speaking to users was that the
            administrative steps weren&apos;t the problem - consent, patient
            selection, and folder routing all matter. The problem was the
            order. We were asking clinicians to do the hardest cognitive work
            first, at the exact moment they needed to act quickly.
          </p>
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

          <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface p-4">
            <Image
              src="/quick-submit/before-strip.png"
              alt="Isla before flow, eight screens: 1. Choose patient, 2. Choose folder, 3. Add button, 4. Consent, 5. Add items, 6. Capture photo, 7. Upload, 8. Uploaded"
              width={2200}
              height={720}
              quality={90}
              className="h-auto w-full min-w-[720px]"
            />
          </div>
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

        <div className="mt-8">
          <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-2">
            After · 6 steps - capture first
          </span>
          <p className="mt-4 leading-relaxed text-ink/80">
            A large submit button now sits as the dominant action. No friction
            between deciding to capture and capturing. The clinical moment is
            secured first; the cognitive load is saved to after
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface p-4">
            <Image
              src="/quick-submit/after-strip.png"
              alt="Isla after flow, six connected screens: patient list with a large Submit button, capture photo, review items, choose folder, confirm consent, and a success screen confirming three items added"
              width={2200}
              height={656}
              quality={90}
              className="h-auto w-full min-w-[720px]"
            />
          </div>
        </div>
      </section>

      <section className="mt-14">
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
