"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

/**
 * Footer link to revisit the consent choice — clearing it reopens the banner.
 */
export function CookieSettingsButton() {
  const { reset } = useConsent();
  return (
    <button onClick={reset} className="transition-colors hover:text-aubergine">
      Cookie-Einstellungen
    </button>
  );
}
