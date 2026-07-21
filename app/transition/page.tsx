import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import TodoBanner from "@/components/TodoBanner";

export const metadata: Metadata = {
  title: "Transitions Optical marketing device",
  description: "Building a projection display to bring light-adaptive lenses to life",
};

export default function TransitionPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Transitions Optical marketing device
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-2">
        Building a projection display to bring light-adaptive lenses to life
      </p>

      <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-line py-8 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Role</dt>
          <dd className="mt-1 italic text-ink/80">Innovation Engineer</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Timeline</dt>
          <dd className="mt-1 italic text-ink/80">Jan &apos;18 to Sept &apos;19</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-ink-3">Discipline</dt>
          <dd className="mt-1 italic text-ink/80">Physical product</dd>
        </div>
      </dl>

      <div className="mt-10">
        <Placeholder
          label="Transitions Optical projection display device — ski helmet and beanie with light-adaptive lens projection"
          aspect="aspect-[16/10]"
        />
      </div>

      <div className="mt-10">
        <TodoBanner>
          The full write-up for this project (business need, process,
          prototyping, outcome sections, and supporting images) hasn&apos;t
          been provided yet. Send screenshots or paste the copy and I&apos;ll
          build it out verbatim.
        </TodoBanner>
      </div>
    </article>
  );
}
