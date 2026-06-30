import type { Metadata } from "next";
import { getPage } from "./page";

/**
 * Build page metadata from a content file's frontmatter.
 */
export function pageMetadata(slug: string): Metadata {
  const page = getPage(slug);
  return {
    title: page.title,
    description: page.description ?? page.lead,
  };
}
