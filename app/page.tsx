import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import TagPill from "@/components/TagPill";
import Reveal from "@/components/Reveal";
import HeroRule from "@/components/HeroRule";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
        <div className="max-w-2xl">
          <p className="anim-rise text-xl leading-relaxed text-ink-2 sm:text-2xl">
            <span className="anim-wave" aria-hidden>
              👋
            </span>{" "}
            Hey! I&apos;m Megan, a product designer with a background in
            industrial design. This is my physical development work — hardware,
            prototyping, and manufacturing. For my software work, visit my{" "}
            <Link
              href={site.uxPortfolio}
              className="text-accent underline underline-offset-4 transition-colors duration-200 hover:text-accent-strong"
            >
              UX portfolio
            </Link>
            .
          </p>

          <div className="anim-rise anim-delay-2 mt-6 flex flex-wrap gap-2">
            <TagPill>Industrial design</TagPill>
            <TagPill>Physical product</TagPill>
            <TagPill>Based in London 🇬🇧</TagPill>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <HeroRule />
      </div>

      <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-24 pt-16">
        <Reveal>
          <h2 className="flex items-center gap-3 text-3xl font-semibold sm:text-4xl">
            Featured project <span aria-hidden>↓</span>
          </h2>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <Link
              href="/transition"
              className="group grid grid-cols-1 overflow-hidden rounded-xl border border-line bg-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_2px_16px_rgba(41,36,32,0.07)] motion-reduce:transform-none sm:grid-cols-2"
            >
              <Placeholder
                label="Transitions Optical projection display device on ski helmet and beanie"
                aspect="aspect-[4/3]"
                className="rounded-none border-none bg-surface"
              />
              <div className="flex flex-col justify-center gap-3 p-8">
                <h3 className="font-display text-2xl font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
                  Transitions Optical marketing device
                </h3>
                <p className="leading-relaxed text-ink-2">
                  Building a projection display to bring light-adaptive lenses
                  to life
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="rounded-xl border border-line bg-surface p-10 text-center">
            <p className="text-lg leading-relaxed text-ink-2">
              I&apos;m currently open to new opportunities, product design, creative,
              and people-facing roles. Always happy to have a conversation.
            </p>
            <Link
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-accent-strong"
            >
              Get in touch
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
