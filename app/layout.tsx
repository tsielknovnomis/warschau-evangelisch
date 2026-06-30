import type { Metadata } from "next";
import { Spectral, Open_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { getPinnedNews } from "@/lib/seed/news";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
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
      className={`${spectral.variable} ${openSans.variable} h-full antialiased`}
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
