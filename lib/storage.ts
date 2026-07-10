import { getStore } from "@netlify/blobs";
import { promises as fs } from "fs";
import path from "path";

/**
 * JSON document storage for the site content (events, news, settings).
 *
 * - On Netlify (build + runtime) documents live in Netlify Blobs
 *   (store "content", strong consistency so saves are visible immediately).
 * - In local dev (plain `pnpm dev`, no Blobs context) documents live in
 *   .data/*.json (gitignored).
 * - If a document does not exist yet, the seed from data/seed/<key>.json
 *   is returned — so a fresh deploy starts with sensible content.
 */

const onNetlify = Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);

function store() {
  return getStore({ name: "content", consistency: "strong" });
}

async function readSeed<T>(key: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "data", "seed", `${key}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function readDoc<T>(key: string, fallback: T): Promise<T> {
  if (onNetlify) {
    try {
      const value = await store().get(key, { type: "json" });
      if (value !== null && value !== undefined) return value as T;
    } catch {
      // fall through to seed
    }
  } else {
    try {
      const raw = await fs.readFile(path.join(process.cwd(), ".data", `${key}.json`), "utf8");
      return JSON.parse(raw) as T;
    } catch {
      // fall through to seed
    }
  }
  return (await readSeed<T>(key)) ?? fallback;
}

export async function writeDoc<T>(key: string, value: T): Promise<void> {
  if (onNetlify) {
    await store().setJSON(key, value);
    return;
  }
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${key}.json`), JSON.stringify(value, null, 2), "utf8");
}
