export const site = {
  name: "Megan O'Mahony",
  role: "Product Designer",
  email: "megomahony97@gmail.com",
  linkedin: "https://www.linkedin.com/in/megan-omahony/",
  // TODO: replace with this site's real Vercel URL after importing the repo
  url: "https://industrial-design.vercel.app",
  // TODO: replace with the UI/UX portfolio's real Vercel URL
  uxPortfolio: "https://portfolio-seven-alpha-xf2or6s8no.vercel.app",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "UX portfolio", href: site.uxPortfolio, external: true },
  { label: "Linkedin", href: site.linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: true },
];

export type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  imageLabel: string;
};

export const projects: ProjectSummary[] = [
  {
    slug: "transition",
    title: "Transitions Optical marketing device",
    summary:
      "A portable, illuminated display that brings light-adaptive lenses to life across ski, motorbike, and everyday eyewear.",
    tags: ["Physical product", "Electronics", "3D printing", "Event display"],
    imageLabel:
      "Illuminated Transitions Signature GEN8 stand with a motorbike helmet",
  },
  {
    slug: "lens-alignment",
    title: "Lens polarisation alignment tool",
    summary:
      "A laser-based tool that took lens alignment out of the operator's hands on the production line, lifting first-time success from 64% to 99%.",
    tags: ["Production tooling", "CAD / SolidWorks", "Manufacturing", "64% → 99%"],
    imageLabel:
      "Laser highlighting the polarisation axis of a lens on a 3D-printed stand",
  },
];
