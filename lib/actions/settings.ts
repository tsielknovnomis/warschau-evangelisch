"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeDoc } from "@/lib/storage";
import { isAdmin } from "@/lib/actions/guard";
import type { SiteSettings } from "@/lib/data/settings";
import type { FormState } from "@/lib/actions/events";

export async function updateSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return { error: "Nicht angemeldet — bitte lade die Seite neu und melde dich an." };

  const until = String(formData.get("announcement_until") ?? "").trim();
  const settings: SiteSettings = {
    announcement: String(formData.get("announcement") ?? "").trim() || null,
    announcementUntil: /^\d{4}-\d{2}-\d{2}$/.test(until) ? until : null,
    barHidden: formData.get("bar_hidden") === "on",
  };
  await writeDoc("settings", settings);

  // The bar lives in the (site) layout → revalidate the whole public tree.
  revalidatePath("/", "layout");
  redirect("/admin?tab=leiste");
}
