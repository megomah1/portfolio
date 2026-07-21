"use client";

import Image from "next/image";
import { useState } from "react";

const personas = [
  { src: "/portrait/designer.png", label: "Designer" },
  { src: "/portrait/researcher.png", label: "Researcher" },
  { src: "/portrait/explorer.png", label: "Explorer" },
];

export default function PolaroidStack() {
  const [i, setI] = useState(0);
  const persona = personas[i];

  return (
    <button
      type="button"
      onClick={() => setI((v) => (v + 1) % personas.length)}
      aria-label={`Megan O'Mahony as ${persona.label}. Select to see another side of her.`}
      className="group mx-auto block w-full max-w-sm rounded-lg"
    >
      <Image
        key={persona.src}
        src={persona.src}
        alt={`Megan O'Mahony, pictured as a ${persona.label}`}
        width={725}
        height={742}
        priority
        quality={95}
        className="w-full select-none transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1"
      />
    </button>
  );
}
