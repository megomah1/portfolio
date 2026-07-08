"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink transition-colors duration-200 hover:text-accent"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-2 transition-colors duration-200 hover:bg-surface hover:text-ink"
            aria-expanded={open}
            aria-controls="primary-nav-links"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div className="hidden items-center gap-8 sm:flex">
          <ul id="primary-nav-links-desktop" className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <ul
          id="primary-nav-links"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-4 border-b border-line bg-paper px-6 py-5 sm:!hidden`}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-ink-2 transition-colors duration-200 hover:text-accent"
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
