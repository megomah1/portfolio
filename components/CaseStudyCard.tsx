import Link from "next/link";
import Placeholder from "./Placeholder";
import TagPill from "./TagPill";
import type { CaseStudySummary } from "@/lib/site";

export default function CaseStudyCard({ slug, title, summary, tags, imagePlaceholder }: CaseStudySummary) {
  return (
    <Link
      href={`/${slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-zinc-200 transition-colors hover:border-zinc-400 sm:grid-cols-2 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      <Placeholder label={imagePlaceholder} aspect="aspect-[4/3]" className="rounded-none border-none bg-zinc-100 dark:bg-zinc-900" />
      <div className="flex flex-col justify-center gap-3 p-8">
        <h3 className="text-2xl font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
          {title}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400">{summary}</p>
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
