import type { Metadata } from "next";
import Link from "next/link";
import TodoBanner from "@/components/TodoBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and contact details for ${site.name}, Product Designer.`,
};

export default function CvPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Resume</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-2">
        {site.role} · London 🇬🇧
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
        <Link
          href={`mailto:${site.email}`}
          className="rounded-full bg-accent px-5 py-2.5 text-paper transition-colors hover:bg-accent-strong"
        >
          Email me
        </Link>
        <Link
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line px-5 py-2.5 text-ink/80 transition-colors hover:border-accent hover:text-accent"
        >
          LinkedIn
        </Link>
      </div>

      <div className="mt-14 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="mt-4">
            <TodoBanner>
              Work history (companies, titles, dates, bullet points) wasn&apos;t
              fetchable — this environment&apos;s network policy blocks all
              external domains, so I couldn&apos;t reach /cv on the live site.
              Please paste the resume content or send a screenshot/PDF.
            </TodoBanner>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="mt-4">
            <TodoBanner>Not fetchable — same network restriction as above.</TodoBanner>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="mt-4">
            <TodoBanner>Not fetchable — same network restriction as above.</TodoBanner>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Download</h2>
          <div className="mt-4">
            <TodoBanner>
              No downloadable CV/resume file URL was available. Once you
              share the PDF, I&apos;ll add it to /public and link a
              &quot;Download CV&quot; button here.
            </TodoBanner>
          </div>
        </section>
      </div>
    </article>
  );
}
