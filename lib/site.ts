export const site = {
  name: "Megan O'Mahony",
  role: "Product Designer",
  email: "megomahony97@gmail.com",
  linkedin: "https://www.linkedin.com/in/megan-omahony/",
  url: "https://meganomahony.vercel.app",
  // TODO: replace with the industrial-design site's real Vercel URL after import
  physicalPortfolio: "https://industrial-design.vercel.app",
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
  heroScreens?: string[];
  heroImage?: { src: string; className: string };
};

export const caseStudies: CaseStudySummary[] = [
  {
    slug: "quick_submit",
    title: "A quick way to submit",
    summary:
      "I led the redesign of Isla's media capture flow for frontline NHS staff, using persuasive design reducing a 16-step submission process to 7.",
    tags: ["NHS", "65% adoption rate", "20 min faster to file", "UX flow", "B2B"],
    imagePlaceholder: "Isla's media capture flow: patient list, capture photo, review items screens",
    heroScreens: [
      "/quick-submit/after-01.png",
      "/quick-submit/after-04.png",
      "/quick-submit/after-06.png",
    ],
  },
  {
    slug: "clinical_pathways",
    title: "Visualising clinical pathways",
    summary:
      "How I translated dense pathway configuration logic into a visual builder used by NHS clinicians.",
    tags: ["NHS", "UX flow", "B2B healthtech", "Information architecture"],
    imagePlaceholder: "Isla waiting list validation pathway visual builder",
    heroImage: {
      src: "/clinical-pathways/canvas.png",
      className: "object-contain p-6",
    },
  },
  {
    slug: "vocalynx",
    title: "Vocalynx (Founder)",
    summary: "Designing a vocal therapy companion for people recovering at home",
    tags: [],
    imagePlaceholder: "Vocalynx app screens and vocal therapy device",
    heroImage: {
      src: "/vocalynx/hero.png",
      className: "object-contain p-6",
    },
  },
];
