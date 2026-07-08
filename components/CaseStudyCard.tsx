import Link from "next/link";
import Placeholder from "./Placeholder";
import TagPill from "./TagPill";
import type { CaseStudySummary } from "@/lib/site";

export default function CaseStudyCard({ slug, title, summary, tags, imagePlaceholder }: CaseStudySummary) {
  return (
    <Link
      href={`/${slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-xl border border-line bg-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_2px_16px_rgba(41,36,32,0.07)] motion-reduce:transform-none sm:grid-cols-2"
    >
      <Placeholder
        label={imagePlaceholder}
        aspect="aspect-[4/3]"
        className="rounded-none border-none bg-surface"
      />
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
