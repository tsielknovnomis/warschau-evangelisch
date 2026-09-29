import { readDoc } from "@/lib/storage";

export type SiteSettings = {
  announcement: string | null;
  /** Last day (YYYY-MM-DD, Warsaw, inclusive) the custom text is shown. */
  announcementUntil: string | null;
  barHidden: boolean;
};

const KEY = "settings";
const DEFAULTS: SiteSettings = { announcement: null, announcementUntil: null, barHidden: false };

/** Global site settings (single document). Controls the announcement bar. */
export async function getSettings(): Promise<SiteSettings> {
  const s = await readDoc<Partial<SiteSettings>>(KEY, DEFAULTS);
  return {
    announcement: s.announcement?.trim() || null,
    announcementUntil: s.announcementUntil || null,
    barHidden: s.barHidden ?? false,
  };
}
