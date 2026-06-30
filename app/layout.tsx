import type { Metadata } from "next";
import { Fraunces, Spectral } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { getPinnedNews } from "@/lib/seed/news";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description:
    "Deutschsprachige evangelisch-lutherische Gemeinde in Warschau. Gottesdienste, Predigten, Gemeindeleben — unter dem Dach der Evangelisch-Augsburgischen Kirche in Polen.",
  openGraph: {
    title: siteConfig.name,
    description:
      "Deutschsprachige evangelisch-lutherische Gemeinde in Warschau.",
    locale: "de_DE",
    type: "website",
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pinned = getPinnedNews();
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <AnnouncementBar item={pinned} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
