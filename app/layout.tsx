import type { Metadata } from "next";
import { Fraunces, Spectral } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextServiceBar } from "@/components/layout/NextServiceBar";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getNextEvent } from "@/lib/data/events";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextEvent = await getNextEvent();
  // Compute "on break" on the server so the client never calls Date.now()
  // during render (avoids a hydration mismatch). Frozen at build time.
  const onBreak = nextEvent
    ? (new Date(nextEvent.startsAt).getTime() - Date.now()) / 86_400_000 > 20
    : false;
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <SmoothScroll>
          <ConsentProvider>
            <NextServiceBar event={nextEvent} onBreak={onBreak} />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </ConsentProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
