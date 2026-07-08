import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-400">
        <p>© 2024–2025 {site.name}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/cv" className="hover:text-zinc-900 dark:hover:text-white">
            Resume
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            LinkedIn
          </Link>
          <Link href={`mailto:${site.email}`} className="hover:text-zinc-900 dark:hover:text-white">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
