import type { Metadata } from "next";
import { Fraunces, Spectral } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";
import "lenis/dist/lenis.css";
import "./globals.css";

// Fraunces — characterful "old-style" display serif (headings). Variable + optical sizing.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Spectral — calm, readable text serif (body), like a printed devotional.
const spectral = Spectral({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description:
    "Deutschsprachige evangelisch-lutherische Gemeinde in Warschau. Gottesdienste, Predigten, Gemeindeleben — unter dem Dach der Evangelisch-Augsburgischen Kirche in Polen.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    siteName: siteConfig.shortName,
    title: siteConfig.name,
    description: "Deutschsprachige evangelisch-lutherische Gemeinde in Warschau.",
    locale: "de_DE",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: "Deutschsprachige evangelisch-lutherische Gemeinde in Warschau.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
