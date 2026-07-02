import { siteConfig } from "@/lib/site-config";

/**
 * Canonical base URL for absolute links (og:image, sitemap, canonical, JSON-LD).
 * Netlify sets URL to the site's primary URL — the preview domain now, and the
 * real domain automatically once it is switched over. Falls back to the
 * configured production URL for local builds.
 */
export const siteUrl = process.env.URL ?? siteConfig.url;
