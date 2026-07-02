import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { getNews } from "@/lib/data/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;
  const staticPaths = [
    "",
    "/gottesdienste",
    "/anfahrt",
    "/ueber-uns",
    "/geschichte",
    "/verein",
    "/beitritt",
    "/satzung",
    "/links",
    "/impressum",
    "/datenschutz",
  ];

  const staticEntries = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const newsEntries = (await getNews()).map((n) => ({
    url: `${base}/aktuelles/${n.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
