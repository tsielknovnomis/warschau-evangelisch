import { readDoc } from "@/lib/storage";
import { sanitizeAnnouncementLink } from "@/lib/service-status";

export type SiteSettings = {
  announcement: string | null;
  /** Last day (YYYY-MM-DD, Warsaw, inclusive) the custom text is shown. */
  announcementUntil: string | null;
  /** Internal link behind the custom text ("/aktuelles" or "/aktuelles/<slug>"). */
  announcementLink: string | null;
  barHidden: boolean;
};

const KEY = "settings";
const DEFAULTS: SiteSettings = {
  announcement: null,
  announcementUntil: null,
  announcementLink: null,
  barHidden: false,
};

/** Global site settings (single document). Controls the announcement bar. */
export async function getSettings(): Promise<SiteSettings> {
  const s = await readDoc<Partial<SiteSettings>>(KEY, DEFAULTS);
  return {
    announcement: s.announcement?.trim() || null,
    announcementUntil: s.announcementUntil || null,
    announcementLink: sanitizeAnnouncementLink(s.announcementLink),
    barHidden: s.barHidden ?? false,
  };
}
