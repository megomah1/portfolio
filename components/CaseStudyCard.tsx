import Link from "next/link";
import Image from "next/image";
import Placeholder from "./Placeholder";
import TagPill from "./TagPill";
import type { CaseStudySummary } from "@/lib/site";

const heroTilts = [
  "z-0 translate-y-4 rotate-[-8deg]",
  "z-20 -mx-5",
  "z-10 translate-y-4 rotate-[8deg]",
];

export default function CaseStudyCard({
  slug,
  title,
  summary,
  tags,
  imagePlaceholder,
  heroScreens,
  heroImage,
}: CaseStudySummary) {
  return (
    <Link
      href={`/${slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-xl border border-line bg-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_2px_16px_rgba(41,36,32,0.07)] motion-reduce:transform-none sm:grid-cols-2"
    >
      {heroScreens ? (
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface px-6">
          {heroScreens.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={700}
              height={1515}
              className={`${heroTilts[i]} w-[30%] max-w-[7rem] drop-shadow-[0_10px_28px_rgba(41,36,32,0.18)] transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0 motion-safe:group-hover:rotate-0`}
            />
          ))}
        </div>
      ) : heroImage ? (
        <div className="aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src={heroImage.src}
            alt=""
            width={1235}
            height={919}
            quality={90}
            className={`h-full w-full transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] ${heroImage.className}`}
          />
        </div>
      ) : (
        <Placeholder
          label={imagePlaceholder}
          aspect="aspect-[4/3]"
          className="rounded-none border-none bg-surface"
        />
      )}
      <div className="flex flex-col justify-center gap-3 p-8">
        <h3 className="font-display text-2xl font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>
        <p className="leading-relaxed text-ink-2">{summary}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
