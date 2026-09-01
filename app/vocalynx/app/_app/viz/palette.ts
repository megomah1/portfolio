// Canvas can't read Tailwind classes, so it needs concrete colours. These are
// pulled from the same CSS custom properties the rest of the site theme uses,
// so the visualisers track light/dark automatically. Read on setup and on
// theme change rather than per-frame (getComputedStyle isn't free).

export type Palette = {
  accent: string;
  accentStrong: string;
  accentTint: string;
  line: string;
  ink: string;
  ink2: string;
  ink3: string;
  paper: string;
  surface: string;
  sienna: string;
};

const FALLBACK: Palette = {
  accent: "#196c5d",
  accentStrong: "#0f5548",
  accentTint: "#e4efe9",
  line: "#e6ded0",
  ink: "#292420",
  ink2: "#6e6558",
  ink3: "#9c9184",
  paper: "#faf6ef",
  surface: "#f4eee3",
  sienna: "#b64a26",
};

export function readPalette(): Palette {
  if (typeof window === "undefined") return FALLBACK;
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;
  return {
    accent: v("--accent", FALLBACK.accent),
    accentStrong: v("--accent-strong", FALLBACK.accentStrong),
    accentTint: v("--accent-tint", FALLBACK.accentTint),
    line: v("--line", FALLBACK.line),
    ink: v("--ink", FALLBACK.ink),
    ink2: v("--ink-2", FALLBACK.ink2),
    ink3: v("--ink-3", FALLBACK.ink3),
    paper: v("--paper", FALLBACK.paper),
    surface: v("--surface", FALLBACK.surface),
    sienna: v("--sienna", FALLBACK.sienna),
  };
}
