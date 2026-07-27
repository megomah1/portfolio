import Image from "next/image";

const interactions = [
  {
    src: "/clinical-pathways/node-hover.png",
    w: 554,
    h: 374,
    title: "Edit or delete inline",
    body: "Hovering any step reveals its controls, so edits happen in place on the canvas.",
  },
  {
    src: "/clinical-pathways/connector-hover.png",
    w: 554,
    h: 374,
    title: "Insert steps on a connector",
    body: "The connectors between steps are interactive too: add or remove a step without rebuilding the flow.",
  },
  {
    src: "/clinical-pathways/condition-panel.png",
    w: 690,
    h: 980,
    title: "Compare data in the condition builder",
    body: "Each branch compares a patient property against a value, combined with AND / OR to express real clinical logic.",
  },
];

export default function PathwayDetails() {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-widest text-ink-3">
        The details that made it usable
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {interactions.map((it) => (
          <figure key={it.src} className="flex flex-col">
            <div className="flex flex-1 items-center justify-center rounded-xl border border-line bg-surface p-4">
              <Image
                src={it.src}
                alt={it.title}
                width={it.w}
                height={it.h}
                quality={95}
                className="w-full rounded-lg"
              />
            </div>
            <figcaption className="mt-3">
              <p className="text-sm font-semibold text-ink">{it.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{it.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
