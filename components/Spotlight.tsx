import Link from "next/link";
import Image from "next/image";
import TagPill from "./TagPill";

const stats = [
  { value: "65%", label: "clinician adoption in 6 weeks" },
  { value: "+4%", label: "submissions made in-app" },
  { value: "16→7", label: "submission steps" },
];

const screens = [
  {
    src: "/quick-submit/after-01.png",
    alt: "Isla patient list with a large Submit button as the dominant action",
    className: "z-0 translate-y-5 rotate-[-8deg]",
  },
  {
    src: "/quick-submit/after-04.png",
    alt: "Choosing a folder to file the captured images into",
    className: "z-20 -mx-8 sm:-mx-10",
  },
  {
    src: "/quick-submit/after-06.png",
    alt: "Success screen confirming three images added to the patient's Isla record",
    className: "z-10 translate-y-5 rotate-[8deg]",
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
            I led the redesign of Isla's media capture flow for frontline NHS
            staff, using persuasive design reducing a 16-step submission
            process to 7.
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

        <div className="group flex items-end justify-center pt-2">
          {screens.map((screen) => (
            <Image
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              width={700}
              height={1515}
              className={`${screen.className} w-[32%] max-w-[10rem] drop-shadow-[0_12px_32px_rgba(41,36,32,0.18)] transition-all duration-300 ease-out motion-safe:group-hover:translate-y-0 motion-safe:group-hover:rotate-0`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
