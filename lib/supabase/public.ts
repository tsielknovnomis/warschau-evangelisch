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
    {
      auth: { persistSession: false },
      global: {
        // Never let Next's fetch data cache serve stale rows (a cached empty
        // response from an early build once hid all news). Pages stay static;
        // freshness comes from build/revalidatePath.
        fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }),
      },
    },
  );
}
