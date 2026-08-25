import type { Metadata } from "next";
import {
  CaseStudyHeader,
  Section,
  Bullets,
  Figure,
  FigureRow,
} from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Transitions Optical marketing device",
  description:
    "A portable, illuminated display that brings light-adaptive lenses to life across ski, motorbike, and everyday eyewear.",
};

export default function TransitionPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <CaseStudyHeader
        title="Transitions Optical marketing device"
        tagline="A portable, illuminated display that brings light-adaptive lenses to life across ski goggles, motorbike visors, and everyday eyewear."
        meta={[
          { label: "Role", value: "Lead designer" },
          { label: "Timeline", value: "6 weeks" },
          { label: "Discipline", value: "Physical product" },
        ]}
      />

      <Figure
        label="Final illuminated Transitions Signature GEN8 stand holding a motorbike helmet with a light-adaptive visor"
        caption="The final display — a lit plinth that shows the lens darkening in real time."
      />

      <Section heading="The business need">
        <p>
          The marketing team wanted a single device to showcase the different
          types of lens Transitions make — ski goggle lenses, motorbike visor
          lenses, and everyday eyewear lenses — at a live event. The device had
          to make the light-adaptive effect obvious to anyone walking past.
        </p>
      </Section>

      <Section heading="The challenge">
        <p>Design and build one display that would:</p>
        <Bullets
          items={[
            "Be multi-functional — showing every lens type from a single unit — since the event was in Italy and it needed to ship easily",
            "Bring the light-adaptive effect to life so visitors could see the lenses respond",
            "Stay cost-effective and repeatable enough to reproduce for production",
          ]}
        />
      </Section>

      <Section heading="My role">
        <p>As the lead designer, I was responsible for:</p>
        <Bullets
          items={[
            "Aligning with key stakeholders across the marketing and engineering teams",
            "Sketching and modelling a low-fidelity prototype from a 3D-printed CAD model",
            "Refining the design and implementing the electronics for the final build",
          ]}
        />
      </Section>

      <Section heading="Process">
        <p>
          I started rough and cheap — printing low-fidelity parts to test the
          form and the lighting before committing to a finished build.
        </p>
        <Figure
          label="Early foam / 3D-printed housing showing a ski beanie and goggles mounted on the display"
          caption="First iteration: testing the mount, proportions, and how the lenses read under light."
        />
      </Section>

      <Section heading="Electronics">
        <p>
          The display was driven by an Arduino board controlling addressable
          LEDs, backlighting the housing and the branding so the lens effect was
          visible from across the room.
        </p>
        <FigureRow
          labels={[
            "Illuminated housing with the Transitions logo lit from within",
            "Arduino board and wiring inside the open housing",
            "Assembled unit with the LED strip running along the front edge",
          ]}
          caption="Minor electronics built around an Arduino board and an addressable LED strip."
        />
      </Section>

      <Section heading="Final prototype">
        <Bullets
          items={[
            "Amended the issues found in testing and presented the CAD model to stakeholders for validation",
            "Reprinted at higher resolution for an accurate, presentation-ready finish",
            "Implemented the electronics with support from my manager",
          ]}
        />
        <FigureRow
          labels={[
            "Finished beanie-and-goggles display lit on a blue backdrop",
            "Finished helmet display on the illuminated GEN8 plinth",
            "Close-up of the Transitions Signature GEN8 branding on the lit base",
          ]}
        />
      </Section>

      <Section heading="Key learnings">
        <Bullets
          items={[
            "The value of low-fidelity prototyping — testing ideas cheaply before committing to a finished build.",
            "Engage suppliers sooner to confirm they have capacity within the project timeline.",
          ]}
        />
      </Section>
    </article>
  );
}
