"use client";

import Image from "next/image";
import { useState } from "react";

const shots = [
  { src: "/portrait/designer.png", label: "Designer" },
  { src: "/portrait/researcher.png", label: "Researcher" },
  { src: "/portrait/explorer.png", label: "Explorer" },
];

export default function PortraitGallery() {
  const [i, setI] = useState(0);

  return (
    <figure className="mx-auto w-full max-w-sm">
      <button
        type="button"
        onClick={() => setI((v) => (v + 1) % shots.length)}
        aria-label={`Megan O'Mahony as ${shots[i].label}. Select to see another side of her.`}
        className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-line shadow-[0_6px_28px_rgba(41,36,32,0.12)]"
      >
        {shots.map((s, idx) => (
          <Image
            key={s.src}
            src={s.src}
            alt={`Megan O'Mahony, pictured as a ${s.label}`}
            fill
            sizes="(max-width: 640px) 90vw, 384px"
            quality={90}
            priority={idx === 0}
            className={`object-cover transition-all duration-500 ease-out ${
              idx === i ? "opacity-100" : "opacity-0"
            } motion-safe:group-hover:scale-[1.03]`}
          />
        ))}
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/85 px-3 py-1 font-display text-sm italic text-ink backdrop-blur-sm">
          {shots[i].label}
        </figcaption>
      </button>

      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-xs italic text-ink-3">Select to see another side of me</span>
        <div className="flex gap-1.5">
          {shots.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show ${s.label}`}
              aria-current={idx === i}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                idx === i ? "bg-accent" : "bg-line hover:bg-ink-3"
              }`}
            />
          ))}
        </div>
      </div>
    </figure>
  );
}
