import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/pages/de");

export interface PageContent {
  title: string;
  description?: string;
  lead?: string;
  body: string; // markdown
}

export function getPage(slug: string): PageContent {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    lead: data.lead ? String(data.lead) : undefined,
    body: content.trim(),
  };
}

export function pageExists(slug: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, `${slug}.md`));
}
