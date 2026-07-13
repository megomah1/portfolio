import Link from "next/link";

const references = [
  {
    quote:
      "Effective collaboration with engineering and product — Meg works closely with the team through the build process, and design reviews remain clear and efficient, keeping feature development moving at pace.",
    name: "Matt Spurgeon",
    role: "Lead Frontend Engineer",
    href: null as string | null,
  },
  {
    quote:
      "I was fortunate enough to be Megan’s manager during her internship at Transitions optical. From her first day in our facility, Megan impressed our Global Engineering team by her willingness to take on any task. Her strength as a “learner” played a very big role in her success.",
    name: "William Carpenter",
    role: "Innovation and Emerging Technology Manager",
    href: "https://www.linkedin.com/in/william-carpenter-1a66a6b7/",
  },
];

export default function References() {
  return (
    <section aria-labelledby="references-heading" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 id="references-heading" className="text-3xl font-semibold sm:text-4xl">
        References
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {references.map((ref) => (
          <figure key={ref.name} className="flex flex-col justify-between rounded-xl border border-line p-8 sm:p-10">
            <blockquote className="text-lg font-medium italic leading-relaxed text-ink sm:text-xl">
              &ldquo;{ref.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm">
              {ref.href ? (
                <Link
                  href={ref.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                >
                  {ref.name}
                </Link>
              ) : (
                <span className="font-semibold text-ink">{ref.name}</span>
              )}
              <span className="text-ink-2"> — {ref.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
