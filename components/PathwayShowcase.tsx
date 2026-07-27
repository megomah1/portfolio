import Image from "next/image";

const hotspots = [
  {
    n: 1,
    x: 81,
    y: 20,
    title: "Drag-and-drop step library",
    body: "Steps are grouped by intent (pathway controls, patient comms, clinical workflows) so builders reach for the right one.",
  },
  {
    n: 2,
    x: 9,
    y: 57,
    title: "One explicit entry point",
    body: "Every pathway starts from a single Pathway Start node, so there's never ambiguity about where a patient begins.",
  },
  {
    n: 3,
    x: 56,
    y: 57,
    title: "Outcomes branch the pathway",
    body: "An Outcome node splits the journey, routing patients down different routes based on what happened.",
  },
  {
    n: 4,
    x: 72,
    y: 43,
    title: "Conditional waits",
    body: "Steps can pause for a real-world event, like waiting for an appointment, before the pathway continues.",
  },
  {
    n: 5,
    x: 84,
    y: 10,
    title: "Inline warnings",
    body: "Misconfigured steps are flagged before a build can be saved, keeping live pathways safe.",
  },
];

export default function PathwayShowcase() {
  return (
    <div>
      {/* Break out wider than the article column for the hero canvas */}
      <figure className="relative left-1/2 w-[min(1100px,92vw)] -translate-x-1/2">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_8px_40px_rgba(41,36,32,0.10)]">
          <Image
            src="/clinical-pathways/canvas.png"
            alt="The shipped Isla pathway builder: an ENT surgical pathway laid out as connected nodes (Pathway Start, Message, Delay, Action and a branching Outcome) beside a drag-and-drop step library"
            width={2400}
            height={1192}
            quality={95}
            className="w-full"
          />
          {/* Numbered hotspots (decorative; described in the legend below) */}
          {hotspots.map((h) => (
            <span
              key={h.n}
              aria-hidden
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper bg-accent text-xs font-semibold text-paper shadow-md ring-2 ring-accent/30"
            >
              {h.n}
            </span>
          ))}
        </div>

        <figcaption className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotspots.map((h) => (
            <div key={h.n} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-paper">
                {h.n}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{h.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{h.body}</p>
              </div>
            </div>
          ))}
        </figcaption>
      </figure>
    </div>
  );
}
