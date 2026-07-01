import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free Supabase client for reading public data (RLS "public read").
 * Keeps public pages statically renderable / ISR-cacheable — no per-request
 * cookie access. Never use for writes (those go through the authenticated
 * server client in server.ts).
 */
export function getSupabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
