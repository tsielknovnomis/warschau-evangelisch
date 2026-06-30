"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useConsent } from "@/components/consent/ConsentProvider";

/**
 * Google Maps embed (DSGVO). Loads the iframe directly when global consent is
 * "accepted"; otherwise shows a calm placeholder and loads only after a click.
 * Fills its parent's height so it lines up with the address column.
 */
export function MapEmbed() {
  const { consent } = useConsent();
  const [active, setActive] = useState(false);
  const { address } = siteConfig;
  const query = encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  );
  const src = `https://www.google.com/maps?q=${query}&z=16&hl=de&output=embed`;

  if (active || consent === "accepted") {
    return (
      <iframe
        src={src}
        title={`Karte: ${address.street}, ${address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[20rem] w-full"
      />
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="group flex h-full min-h-[20rem] w-full flex-col items-center justify-center gap-3 bg-aubergine-50 p-6 text-center transition-colors hover:bg-aubergine-100"
      aria-label="Google-Maps-Karte laden"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-aubergine shadow-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>
      <span className="font-display text-lg text-aubergine">
        {address.street}, {address.city}
      </span>
      <span className="rounded-[3px] bg-aubergine px-5 py-2.5 font-body text-sm font-semibold text-bg transition-colors group-hover:bg-aubergine-deep">
        Karte mit Google Maps laden
      </span>
      <span className="max-w-xs text-[11px] leading-tight text-muted">
        Beim Laden werden Daten an Google übertragen.
      </span>
    </button>
  );
}
