import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-ink-2 sm:flex-row sm:items-center">
        <p>© 2024–2025 {site.name}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href={site.uxPortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
          >
            UX portfolio
          </Link>
          <Link
            href={`${site.uxPortfolio}/cv`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
          >
            Resume
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
