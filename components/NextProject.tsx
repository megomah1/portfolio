import Link from "next/link";

export default function NextProject({ href, title }: { href: string; title: string }) {
  return (
    <nav aria-label="Next project" className="mt-20 border-t border-line pt-10">
      <Link href={href} className="group flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-3">Next project</p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
            {title}
          </p>
        </div>
        <span
          aria-hidden
          className="text-2xl text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
        >
          →
        </span>
      </Link>
    </nav>
  );
}
