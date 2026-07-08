import type { Metadata } from "next";
import Link from "next/link";
import TagPill from "@/components/TagPill";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and contact details for ${site.name}, Product Designer.`,
};

const experience = [
  {
    role: "Product Designer",
    where: "Isla Health / June '23 to Present (3 years)",
    tags: ["40+ NHS interviews", "9 products supported", "B2B2C"],
    bullets: [
      "Achieved 90% adoption for a core clinical flow by redesigning the image submission journey, reducing steps from 16 to 7 and mapping drop-off through targeted usability sessions.",
      "Designed inclusive, accessible experiences across clinician and patient surfaces, built to NHS accessibility standards",
      "Operated autonomously across problem framing through engineering handoff, partnering closely with product and engineering to keep the experience unified across the platform.",
      'Facilitate workshops as the team\'s Learning Champion, and ran a "Women in Tech" panel for International Women\'s Day and "AI in our workflow" team workshop.',
    ],
  },
  {
    role: "Product Designer & Founder",
    where: "Vocalynx / Sept '20 to June '23 (2 years)",
    tags: ["Voice tech", "30+ vocalist interviews", "2 awards"],
    bullets: [
      "Designed the full product, app and hardware, for a connected vocal health device, and tested it with 30+ singers.",
      "Worked through the unclear regulatory line between wellness and medical devices to keep the product simple and safe.",
      "Secured Irish Research Council funding to found Vocalynx, translating ambiguous, unregulated product requirements into a working device through research, prototyping, and usability testing.",
      "Used rapid prototyping as the primary tool to align stakeholders, testing with 30+ vocalists in partnership with the Irish World Academy of Music and Dance.",
    ],
  },
  {
    role: "Innovation Engineer",
    where: "Transitions Optical / Jan '18 to Sept '19",
    tags: ["Physical product", "98% reduction in human error"],
    bullets: [
      "Partnered with ChildVision to prototype braille-integrated haptic devices, bridging physical touch with audio feedback for visually impaired children.",
      "Designed and prototyped a bespoke laser tool that reduced human error on the manufacturing line by 98%, integrating sensors and 3D-modelled components.",
    ],
  },
  {
    role: "OTC Pharmacy Clerk",
    where: "Collins pharmacy / Jan '17 to Dec '17",
    tags: ["Pharmacy experience", "Part-time"],
    bullets: [
      "Spent 1 year on the pharmacy counter, talking to customers daily about medication and general health concerns.",
      "Handled sensitive conversations with care, working within pharmacy safeguarding protocols under pharmacist supervision.",
    ],
  },
];

export default function CvPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Resume</h1>
      <p className="mt-4 text-lg text-ink-2">{site.role} · London 🇬🇧</p>

      <p className="mt-6 leading-relaxed text-ink/80">
        I have spent six years moving between research and craft, running
        interviews and usability sessions, then shipping the interfaces that
        come out of them. At Isla Health I design across two very different
        audiences, clinicians and patients. Before that, I founded Vocalynx and
        carried a vocal health device from early research through to a tested,
        working product.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
        <Link
          href={`mailto:${site.email}`}
          className="rounded-full bg-accent px-5 py-2.5 text-paper transition-colors hover:bg-accent-strong"
        >
          Email me
        </Link>
        <Link
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line px-5 py-2.5 text-ink/80 transition-colors hover:border-accent hover:text-accent"
        >
          LinkedIn
        </Link>
      </div>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-mono text-sm uppercase tracking-widest text-ink-3">Experience</h2>
        <div className="mt-6 space-y-12">
          {experience.map((job) => (
            <div key={job.role}>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-2xl font-semibold">{job.role}</h3>
                <p className="text-sm italic text-ink-2">{job.where}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/80">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-mono text-sm uppercase tracking-widest text-ink-3">Education</h2>
        <ul className="mt-6 space-y-3 leading-relaxed text-ink/80">
          <li>
            <strong className="text-ink">MSc in Design for Health and Wellbeing</strong>{" "}
            University of Limerick (First class honours)
          </li>
          <li>
            <strong className="text-ink">BSc in Science Product Design &amp; Tech</strong>{" "}
            University of Limerick (Upper second class honours)
          </li>
          <li>Memorisely UI/Visual design bootcamp</li>
        </ul>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-mono text-sm uppercase tracking-widest text-ink-3">Skills</h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 leading-relaxed text-ink/80">
          <li>
            <strong className="text-ink">Design &amp; Strategy:</strong> Figma, Design
            Systems, Mobile &amp; Native iOS/Android Design, Hardware-Software
            Integration, UX Research, Rapid Prototyping, Cross-functional Squad
            Collaboration
          </li>
          <li>
            <strong className="text-ink">AI &amp; Tech:</strong> Claude, Claude design,
            Cursor, Lovable, GitHub, AI-Assisted Prototyping.
          </li>
        </ul>
      </section>

      <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-2">
        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-ink-3">Awards</h2>
          <ul className="mt-6 space-y-2 leading-relaxed text-ink/80">
            <li>Ideate Ireland Start-up Competition Finalist 2022</li>
            <li>Commercialisation Fund Feasibility Grant</li>
            <li>Irish Research Council PhD Scholarship, 2023</li>
          </ul>
        </section>
        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-ink-3">Interest</h2>
          <ul className="mt-6 space-y-2 leading-relaxed text-ink/80">
            <li>
              <strong className="text-ink">Interests:</strong> Songwriting, Guitar, Rugby
              (Munster), Hiking, Travel.
            </li>
            <li>
              <strong className="text-ink">Volunteer work:</strong> Breast cancer
              research, Childvision
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
