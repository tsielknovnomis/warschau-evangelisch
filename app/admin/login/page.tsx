import type { Metadata } from "next";
import { Lutherrose } from "@/components/content/Lutherrose";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Login", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-16">
      <div className="w-full max-w-sm rounded-[6px] border border-line bg-surface p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Lutherrose className="h-10 w-10" alt="" />
          <div>
            <p className="font-display text-lg text-aubergine">Verwaltung</p>
            <p className="text-xs text-muted">Evangelisch in Warschau</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
