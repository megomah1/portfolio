import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";

/* ---------------------------------------------------------------------------
   Shared building blocks for the case-study pages. Keeps the two projects
   visually consistent: same heading rhythm, bullet style, and figure framing.
--------------------------------------------------------------------------- */

type MetaItem = { label: string; value: string };

export function CaseStudyHeader({
  title,
  tagline,
  meta,
}: {
  title: string;
  tagline: string;
  meta: MetaItem[];
}) {
  // Explicit classes so Tailwind's scanner can see them (no dynamic interpolation).
  const cols = meta.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <header>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-2">{tagline}</p>

      <dl
        className={`mt-10 grid grid-cols-1 gap-6 border-y border-line py-8 text-sm ${cols}`}
      >
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="font-mono uppercase tracking-wide text-ink-3">
              {item.label}
            </dt>
            <dd className="mt-1 italic text-ink/80">{item.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-16">
      <section>
        <h2 className="text-2xl font-semibold sm:text-3xl">{heading}</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink-2">{children}</div>
      </section>
    </Reveal>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-8 border-l-2 border-accent pl-5 text-lg italic leading-relaxed text-ink/85">
      {children}
    </blockquote>
  );
}

/* A single labelled image slot. Swap Placeholder for next/image once the
   real photo has been uploaded to the given path in /public. */
export function Figure({
  label,
  caption,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className="mt-8">
      <Placeholder label={label} aspect={aspect} />
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* A row of image slots (e.g. a build sequence). */
export function FigureRow({
  labels,
  caption,
}: {
  labels: string[];
  caption?: string;
}) {
  return (
    <figure className="mt-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {labels.map((label, i) => (
          <Placeholder key={i} label={label} aspect="aspect-[3/4]" />
        ))}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
