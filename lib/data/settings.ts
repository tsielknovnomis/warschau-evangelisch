import { readDoc } from "@/lib/storage";

export type SiteSettings = {
  announcement: string | null;
  barHidden: boolean;
};

const KEY = "settings";
const DEFAULTS: SiteSettings = { announcement: null, barHidden: false };

/** Global site settings (single document). Controls the announcement bar. */
export async function getSettings(): Promise<SiteSettings> {
  const s = await readDoc<SiteSettings>(KEY, DEFAULTS);
  return {
    announcement: s.announcement?.trim() || null,
    barHidden: s.barHidden ?? false,
  };
}
