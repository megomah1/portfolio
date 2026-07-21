import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Physical Development`,
    template: `%s — ${site.name}`,
  },
  description:
    "Physical development and industrial design work by Megan O'Mahony: hardware, prototyping, and manufacturing.",
  openGraph: {
    title: `${site.name} — Physical Development`,
    description:
      "Physical development and industrial design work by Megan O'Mahony: hardware, prototyping, and manufacturing.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Physical Development`,
    description:
      "Physical development and industrial design work by Megan O'Mahony: hardware, prototyping, and manufacturing.",
  },
};

// Applies the saved theme before first paint so there is no flash of the
// wrong theme. Light is the default; dark is an explicit visitor choice.
const themeScript = `try{if(localStorage.theme==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
