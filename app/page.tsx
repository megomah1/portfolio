import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import TagPill from "@/components/TagPill";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="anim-rise text-xl leading-relaxed text-zinc-600 sm:text-2xl dark:text-zinc-300">
            <span className="anim-wave" aria-hidden>
              👋
            </span>{" "}
            Hey! I&apos;m Megan, a product designer with a background in industrial
            design. Bringing systems thinking, hands-on UX research, and sharp UI
            craft to complex software, and exploring how AI can make that work
            better and faster.
          </p>

          <div className="anim-rise anim-delay-2 mt-6 flex flex-wrap gap-2">
            <TagPill>Product Designer</TagPill>
            <TagPill>B2B2C | SaaS | Healthcare</TagPill>
            <TagPill>5+ years experience</TagPill>
            <TagPill>Based in London 🇬🇧</TagPill>
          </div>

          <div className="anim-rise anim-delay-3 mt-10">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Just stopping by?</p>
            <Link
              href="/quick_submit"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View spotlight project
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          <p className="anim-rise anim-delay-4 mb-3 text-right text-sm italic text-zinc-500 dark:text-zinc-400">
            Select to learn more about me
          </p>
          <div className="anim-settle rotate-2 rounded-md border border-zinc-200 bg-white p-3 pb-6 shadow-md transition-transform duration-300 hover:rotate-0 dark:border-zinc-800 dark:bg-zinc-950">
            <Placeholder label="Portrait photo of Megan O'Mahony" aspect="aspect-[4/5]" />
            <p className="mt-3 text-center font-serif italic text-zinc-700 dark:text-zinc-300">
              - Product Designer -
            </p>
          </div>
        </div>
      </section>

      <section id="case-studies" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-24">
        <Reveal>
          <h2 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl">
            4 selected case studies <span aria-hidden>↓</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {caseStudies.map((cs) => (
            <Reveal key={cs.slug}>
              <CaseStudyCard {...cs} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="rounded-2xl border border-zinc-200 p-10 text-center dark:border-zinc-800">
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              I&apos;m currently open to new opportunities, product design, creative,
              and people-facing roles. Always happy to have a conversation.
            </p>
            <Link
              href="/cv"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              My CV
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
