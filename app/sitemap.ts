import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getNews } from "@/lib/seed/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticPaths = [
    "",
    "/gottesdienste",
    "/anfahrt",
    "/ueber-uns",
    "/ueber-uns/geschichte",
    "/ueber-uns/verein",
    "/ueber-uns/verein/beitritt",
    "/ueber-uns/verein/satzung",
    "/links",
    "/impressum",
    "/datenschutz",
  ];

  const staticEntries = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const newsEntries = getNews().map((n) => ({
    url: `${base}/aktuelles/${n.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
