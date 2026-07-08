import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Product Designer`,
    template: `%s — ${site.name}`,
  },
  description:
    "Product designer with a background in industrial design. Systems thinking, hands-on UX research, and sharp UI craft for complex software.",
  openGraph: {
    title: `${site.name} — Product Designer`,
    description:
      "Product designer with a background in industrial design. Systems thinking, hands-on UX research, and sharp UI craft for complex software.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Product Designer`,
    description:
      "Product designer with a background in industrial design. Systems thinking, hands-on UX research, and sharp UI craft for complex software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
