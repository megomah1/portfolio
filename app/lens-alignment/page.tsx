import type { Metadata } from "next";
import {
  CaseStudyHeader,
  Section,
  Bullets,
  Quote,
  Figure,
} from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Lens polarisation alignment tool",
  description:
    "A laser-based tool that took lens alignment out of the operator's hands on the production line, lifting first-time success from 64% to 99%.",
};

export default function LensAlignmentPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <CaseStudyHeader
        title="Lens polarisation alignment tool"
        tagline="A laser-based tool that took lens alignment out of the operator's hands on the production line — turning a guessing game into a measurement."
        meta={[
          { label: "Role", value: "Design engineer" },
          { label: "Discipline", value: "Production tooling" },
          { label: "Deployed", value: "Manufacturing, India" },
        ]}
      />

      <Figure
        label="Laser projecting through eyewear on a 3D-printed black stand, highlighting the polarisation axis of the lens"
        caption="The tool in use — a laser reveals the lens's polarisation axis so alignment can be checked without touching it."
      />

      <Section heading="The problem">
        <p>
          Polarised lenses have to be inserted with their polarisation axis
          correctly aligned. On the line, operators were doing this by eye, which
          introduced errors — and there was no way to verify the alignment
          without touching, and risking damaging, the lens once it was inserted.
        </p>
        <p className="font-semibold text-ink">What we found</p>
        <Bullets
          items={[
            "Alignment by eye caused errors",
            "We needed a way to measure alignment without damaging or touching the lens once it was inserted",
          ]}
        />
      </Section>

      <Section heading="The challenge">
        <p>Design an alignment solution that would:</p>
        <Bullets
          items={[
            "Measure alignment accurately without touching or damaging the lens",
            "Integrate seamlessly with the existing testing equipment on the line",
            "Remain cost-effective for production-scale implementation",
          ]}
        />
      </Section>

      <Section heading="Research">
        <p>
          The next steps were to research suitable lasers and build a CAD-model
          prototype. The insight that unlocked the design:
        </p>
        <Quote>
          A light laser that highlights the polarisation axis marked in the
          lenses — making the alignment visible, and therefore measurable.
        </Quote>
      </Section>

      <Section heading="Process">
        <p>As the design engineer, I was responsible for:</p>
        <Bullets
          items={[
            "Aligning with stakeholders in Ireland who had worked with the manufacturing teams in India, to understand the problem they were hitting",
            "Sketching and modelling a low-fidelity prototype from a 3D-printed CAD model",
            "Refining the CAD model in SolidWorks",
            "Working with a metal manufacturing company to produce it for the production line",
          ]}
        />
      </Section>

      <Section heading="Impact">
        <Bullets
          items={[
            "Raised first-time alignment success from 64% to 99% — a 35-percentage-point improvement",
            "Successfully implemented in the manufacturing facility in India",
            "Eliminated guesswork from the alignment process",
            "Minimal training required for operators",
          ]}
        />
      </Section>

      <Section heading="Key learnings">
        <Bullets
          items={[
            "A simple, well-aimed tool can remove an entire class of human error.",
            "Contact suppliers and manufacturers sooner to make sure they have capacity within the required timeframe.",
          ]}
        />
      </Section>
    </article>
  );
}
