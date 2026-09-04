"use client";

// Small, dependency-free SVG charts for the vocal-health report. Colours come
// from the theme via currentColor / Tailwind text-* classes, so they track
// light and dark automatically.

export function TrendChart({
  points,
  height = 120,
}: {
  points: Array<{ label: string; value: number | null }>;
  height?: number;
}) {
  const W = 300;
  const H = height;
  const padX = 6;
  const padY = 12;
  const n = points.length;
  const x = (i: number) => padX + (i / Math.max(1, n - 1)) * (W - padX * 2);
  const y = (v: number) => H - padY - (v / 100) * (H - padY * 2);

  const withVals = points.map((p, i) => ({ ...p, i })).filter((p) => p.value != null);
  const line = withVals.map((p) => `${x(p.i)},${y(p.value as number)}`).join(" ");
  const area =
    withVals.length > 1
      ? `M ${x(withVals[0].i)},${H - padY} L ${withVals
          .map((p) => `${x(p.i)},${y(p.value as number)}`)
          .join(" L ")} L ${x(withVals[withVals.length - 1].i)},${H - padY} Z`
      : "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Vocal health trend">
      <defs>
        <linearGradient id="vx-trend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0, 50, 100].map((g) => (
        <line
          key={g}
          x1={padX}
          x2={W - padX}
          y1={y(g)}
          y2={y(g)}
          className="text-line"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      ))}
      {area && <path d={area} className="text-accent" fill="url(#vx-trend)" />}
      {withVals.length > 1 && (
        <polyline
          points={line}
          fill="none"
          className="text-accent"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {withVals.map((p) => (
        <circle
          key={p.i}
          cx={x(p.i)}
          cy={y(p.value as number)}
          r="3.2"
          className="text-accent"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const W = 80;
  const H = 24;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * W},${H - ((v - min) / span) * H}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-6 w-20" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        className="text-accent"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MetricBar({
  value,
  max = 100,
  tone = "accent",
}: {
  value: number;
  max?: number;
  tone?: "accent" | "sienna";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-line">
      <div
        className={`h-full rounded-full ${tone === "accent" ? "bg-accent" : "bg-sienna"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** A donut-style score dial, 0..100. */
export function ScoreDial({ score, size = 132 }: { score: number; size?: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={`Vocal health ${score} out of 100`}>
      <circle cx="60" cy="60" r={r} fill="none" className="text-line" stroke="currentColor" strokeWidth="9" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        className="text-accent"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="56" textAnchor="middle" className="fill-ink font-display" fontSize="30" fontWeight="600">
        {score}
      </text>
      <text x="60" y="76" textAnchor="middle" className="fill-ink-3" fontSize="10" letterSpacing="1.5">
        / 100
      </text>
    </svg>
  );
}
