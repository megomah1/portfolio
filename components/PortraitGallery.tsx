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
  const [popping, setPopping] = useState(false);

  const cycle = () => {
    setI((v) => (v + 1) % shots.length);
    setPopping(true);
  };

  return (
    <figure className="mx-auto w-full max-w-sm">
      <button
        type="button"
        onClick={cycle}
        aria-label={`Megan O'Mahony as ${shots[i].label}. Click to see another side of her.`}
        className="group relative block w-full cursor-pointer"
      >
        <div
          onAnimationEnd={() => setPopping(false)}
          className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-line shadow-[0_6px_28px_rgba(41,36,32,0.12)] ${
            popping ? "animate-photo-pop" : ""
          }`}
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
              className={`object-cover transition-opacity duration-300 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/85 px-3 py-1 font-display text-sm italic text-ink backdrop-blur-sm">
            {shots[i].label}
          </figcaption>
        </div>

        {/* Fun call-to-action sticker */}
        <span
          className={`pointer-events-none absolute -right-3 -top-3 z-10 rotate-6 rounded-full bg-accent px-3 py-1.5 text-center text-xs font-semibold leading-tight text-paper shadow-md transition-transform duration-200 group-hover:rotate-12 ${
            popping ? "animate-badge-wiggle" : ""
          }`}
        >
          Click to learn
          <br />
          more about me
        </span>
      </button>

      <div className="mt-4 flex items-center justify-between px-1">
        <span className="text-xs text-ink-3">
          {i + 1} / {shots.length}
        </span>
        <div className="flex gap-1.5">
          {shots.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              onClick={() => {
                setI(idx);
                setPopping(true);
              }}
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
