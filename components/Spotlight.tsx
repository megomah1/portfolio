import Link from "next/link";
import Image from "next/image";
import TagPill from "./TagPill";

const stats = [
  { value: "12→6", label: "submission steps" },
  { value: "26 min", label: "of email workarounds, eliminated" },
  { value: "90%", label: "clinician adoption" },
];

const screens = [
  {
    src: "/quick-submit/after-1.png",
    alt: "Isla patient list with a large Submit button as the dominant action",
    className: "rotate-[-3deg]",
  },
  {
    src: "/quick-submit/after-2.png",
    alt: "Camera view capturing a clinical photo immediately",
    className: "z-10 -mx-4 -translate-y-3 sm:-mx-6",
  },
  {
    src: "/quick-submit/after-6.png",
    alt: "Success screen confirming three items added to the patient's Isla record",
    className: "rotate-[3deg]",
  },
];

export default function Spotlight() {
  return (
    <section aria-labelledby="spotlight-heading" className="mx-auto max-w-5xl px-6 pt-16">
      <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-xl border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[5fr_4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Spotlight</p>
          <h2 id="spotlight-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
            A quicker way to submit images
          </h2>
          <p className="mt-4 leading-relaxed text-ink-2">
            I led the redesign of Isla media capture flow for frontline NHS
            staff, using persuasive design reducing a 12-step submission
            process to 6.
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-ink">{stat.value}</dd>
                <dd className="mt-0.5 max-w-36 text-xs text-ink-2">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <TagPill>NHS</TagPill>
            <TagPill>UX flow</TagPill>
            <TagPill>B2B</TagPill>
          </div>

          <Link
            href="/quick_submit"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-accent-strong"
          >
            Read the case study
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="group flex items-center justify-center pt-2">
          {screens.map((screen) => (
            <Image
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              width={476}
              height={852}
              className={`${screen.className} w-1/3 max-w-36 rounded-lg border border-line bg-paper shadow-[0_4px_20px_rgba(41,36,32,0.10)] transition-transform duration-300 motion-safe:group-hover:rotate-0 motion-safe:group-hover:translate-y-0`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
