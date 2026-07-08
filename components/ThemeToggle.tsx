"use client";

export default function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.theme = next ? "dark" : "light";
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors duration-200 hover:bg-surface hover:text-ink"
    >
      {/* Render both glyphs and pick via CSS so the icon is correct even
          before hydration finishes */}
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="hidden h-[18px] w-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="4" />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6L16 16M16 4l-1.4 1.4M5.4 14.6L4 16" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="block h-[18px] w-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9Z" />
      </svg>
    </button>
  );
}
