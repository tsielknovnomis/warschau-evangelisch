"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { FormState } from "@/lib/actions/events";

export async function updateSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  const announcement = String(formData.get("announcement") ?? "").trim() || null;
  const barHidden = formData.get("bar_hidden") === "on";

  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("settings")
    .update({ announcement, bar_hidden: barHidden, updated_at: new Date().toISOString() })
    .eq("id", true);
  if (error) return { error: "Speichern fehlgeschlagen: " + error.message };

  // The bar lives in the (site) layout → revalidate the whole public tree.
  revalidatePath("/", "layout");
  redirect("/admin?tab=leiste");
}
