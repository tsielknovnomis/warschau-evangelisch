import { getSupabasePublic } from "@/lib/supabase/public";

export type SiteSettings = {
  announcement: string | null;
  barHidden: boolean;
};

/** Global site settings (single row). Controls the announcement bar. */
export async function getSettings(): Promise<SiteSettings> {
  const supabase = getSupabasePublic();
  const { data } = await supabase
    .from("settings")
    .select("announcement, bar_hidden")
    .maybeSingle();
  return {
    announcement: data?.announcement?.trim() || null,
    barHidden: data?.bar_hidden ?? false,
  };
}
