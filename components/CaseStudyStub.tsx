import Placeholder from "./Placeholder";
import TagPill from "./TagPill";
import TodoBanner from "./TodoBanner";

export default function CaseStudyStub({
  title,
  summary,
  tags,
  imagePlaceholder,
}: {
  title: string;
  summary: string;
  tags: string[];
  imagePlaceholder: string;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-2">{summary}</p>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Placeholder label={imagePlaceholder} aspect="aspect-[16/10]" />
      </div>

      <div className="mt-10">
        <TodoBanner>
          This case study&apos;s full write-up (business need, research,
          process, outcome sections, and supporting images) wasn&apos;t
          fetchable — this environment&apos;s network policy blocks all
          external domains, including framer.website and
          framerusercontent.com, so I only have the title, one-line summary,
          and tags shown on the homepage card. Please paste the page copy or
          send screenshots of this case study so I can rebuild it verbatim.
        </TodoBanner>
      </div>
    </article>
  );
}
