import Link from "next/link";

export default function NextProject({ href, title }: { href: string; title: string }) {
  return (
    <nav aria-label="Next project" className="mt-20 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <Link href={href} className="group flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">Next project</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 group-hover:underline dark:text-zinc-50">
            {title}
          </p>
        </div>
        <span aria-hidden className="text-2xl text-zinc-400 transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </nav>
  );
}
