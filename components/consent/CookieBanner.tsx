"use client";

import Link from "next/link";
import { useConsent } from "@/components/consent/ConsentProvider";

/**
 * Global cookie/consent banner. Appears on first visit (no decision yet).
 * "Akzeptieren" lets YouTube and Google Maps load directly across the site;
 * "Ablehnen" keeps the per-embed 2-click fallback. Reopened via the footer.
 */
export function CookieBanner() {
  const { consent, hydrated, accept, decline } = useConsent();

  // Render nothing until we know the stored choice (avoids hydration flash),
  // and only show while no decision has been made.
  if (!hydrated || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Hinweis zu externen Diensten"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/40 bg-aubergine-deep text-bg shadow-[0_-6px_24px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-bg/90">
          Wir binden externe Dienste ein — <strong className="font-semibold text-bg">YouTube</strong> für
          Predigtvideos und <strong className="font-semibold text-bg">Google&nbsp;Maps</strong> für die
          Anfahrt. Erst mit deiner Zustimmung werden Inhalte dieser Anbieter geladen und dabei
          Daten übertragen. Du kannst das jederzeit ändern. Mehr in der{" "}
          <Link
            href="/datenschutz"
            className="font-medium underline decoration-gold/60 underline-offset-2 hover:text-white"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-[3px] border border-bg/40 px-5 py-2.5 font-body text-sm font-semibold text-bg transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-aubergine-deep"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="rounded-[3px] bg-bg px-5 py-2.5 font-body text-sm font-semibold text-aubergine shadow-sm transition-colors hover:bg-parchment-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-aubergine-deep"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
