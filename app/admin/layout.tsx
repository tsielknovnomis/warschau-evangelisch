import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { Lutherrose } from "@/components/content/Lutherrose";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → this is the login page (middleware guards the rest). Render bare.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-gold/40 bg-aubergine-deep text-bg">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/admin" className="flex items-center gap-2 text-bg hover:text-bg">
            <Lutherrose className="h-7 w-7" alt="" />
            <span className="font-display text-base">Verwaltung</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-bg/50 sm:inline">{user.email}</span>
            <form action={signOut}>
              <button className="text-sm text-bg/70 hover:text-bg">Abmelden</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>
    </div>
  );
}
