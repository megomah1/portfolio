"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/90">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
          <span
            aria-hidden
            className="inline-block h-6 w-6 shrink-0 rounded-sm bg-gradient-to-br from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-500"
          />
          {site.name}
        </Link>

        <button
          type="button"
          className="text-sm font-medium text-zinc-700 sm:hidden dark:text-zinc-300"
          aria-expanded={open}
          aria-controls="primary-nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <ul
          id="primary-nav-links"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-4 border-b border-zinc-200 bg-white px-6 py-4 sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:border-none sm:bg-transparent sm:p-0 dark:border-zinc-800 dark:bg-black`}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
