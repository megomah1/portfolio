"use client";

// The aperture guide from the case study, rebuilt as a live control. It's a
// device-side feature (the physical Vocalynx narrows to this diameter), so the
// app treats it as optional — this just gives a visual target.

export default function Aperture({ mm }: { mm: number }) {
  // Map 3–9 mm to a visible inner-disc radius.
  const min = 3;
  const max = 9;
  const t = (Math.max(min, Math.min(max, mm)) - min) / (max - min);
  const inner = 14 + t * 46; // px radius within a 160 viewbox

  return (
    <svg viewBox="0 0 160 160" className="h-40 w-40" role="img" aria-label={`Aperture ${mm} millimetres`}>
      <circle cx="80" cy="80" r="72" className="fill-surface" />
      <circle cx="80" cy="80" r="56" className="fill-accent-tint" />
      <circle cx="80" cy="80" r={inner} className="fill-accent" />
      <circle cx="80" cy="80" r={inner} className="text-accent-strong" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
