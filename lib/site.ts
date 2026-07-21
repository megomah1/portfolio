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
  { label: "Project", href: "/transition" },
  { label: "UX portfolio", href: site.uxPortfolio, external: true },
  { label: "Linkedin", href: site.linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: true },
];
