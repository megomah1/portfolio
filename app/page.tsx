import Link from "next/link";
import TagPill from "@/components/TagPill";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import HeroRule from "@/components/HeroRule";
import Spotlight from "@/components/Spotlight";
import References from "@/components/References";
import PolaroidStack from "@/components/PolaroidStack";
import { caseStudies } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-20 sm:pt-28 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="anim-rise text-xl leading-relaxed text-ink-2 sm:text-2xl">
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
            <p className="text-sm text-ink-2">Just stopping by?</p>
            <Link
              href="/quick_submit"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-accent-strong"
            >
              View spotlight project
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="anim-settle relative mx-auto w-full max-w-sm">
          <PolaroidStack />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <HeroRule />
      </div>

      <Reveal>
        <Spotlight />
      </Reveal>

      <section id="case-studies" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-24 pt-16">
        <Reveal>
          <h2 className="flex items-center gap-3 text-3xl font-semibold sm:text-4xl">
            {caseStudies.length} selected case studies <span aria-hidden>↓</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8">
          {caseStudies.map((cs) => (
            <Reveal key={cs.slug}>
              <CaseStudyCard {...cs} />
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <References />
      </Reveal>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="rounded-xl border border-line bg-surface p-10 text-center">
            <p className="text-lg leading-relaxed text-ink-2">
              I&apos;m currently open to new opportunities, product design, creative,
              and people-facing roles. Always happy to have a conversation.
            </p>
            <Link
              href="/cv"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-accent-strong"
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
