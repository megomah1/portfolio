export const site = {
  name: "Megan O'Mahony",
  role: "Product Designer",
  email: "megomahony97@gmail.com",
  linkedin: "https://www.linkedin.com/in/megan-omahony/",
  url: "https://portfolio-nextjs-vercel-nxynck.vercel.app",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Case studies", href: "/#case-studies" },
  { label: "Resume", href: "/cv" },
  { label: "Linkedin", href: site.linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: true },
];

export type CaseStudySummary = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  imagePlaceholder: string;
};

export const caseStudies: CaseStudySummary[] = [
  {
    slug: "quick_submit",
    title: "A quick way to submit",
    summary:
      "I led the redesign of Isla media capture flow for frontline NHS staff, using persuasive design reducing a 12-step submission process to 6.",
    tags: ["NHS", "90% adoption rate", "50% reduction in time to task", "UX flow", "B2B"],
    imagePlaceholder: "Isla media capture flow — patient list, capture photo, review items screens",
  },
  {
    slug: "clinical_pathways",
    title: "Visualising clinical pathways",
    summary:
      "How I translated dense pathway configuration logic into a visual builder used by NHS clinicians.",
    tags: ["NHS", "UX flow", "B2B healthtech", "Information architecture"],
    imagePlaceholder: "Isla waiting list validation pathway visual builder",
  },
  {
    slug: "vocalynx",
    title: "Vocalynx (Founder)",
    summary: "Designing a vocal therapy companion for people recovering at home",
    tags: [],
    imagePlaceholder: "Vocalynx app screens and vocal therapy device",
  },
  {
    slug: "transition",
    title: "Transitions Optical marketing device",
    summary: "Building a projection display to bring light-adaptive lenses to life",
    tags: [],
    imagePlaceholder: "Transitions Optical projection display device on ski helmet and beanie",
  },
];
