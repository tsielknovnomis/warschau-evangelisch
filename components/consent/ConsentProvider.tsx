"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ConsentValue = "accepted" | "declined" | null;

const STORAGE_KEY = "we-consent-external";

type ConsentContextValue = {
  /** "accepted" | "declined" | null (no decision yet) */
  consent: ConsentValue;
  /** true once the value has been read from localStorage on the client */
  hydrated: boolean;
  accept: () => void;
  decline: () => void;
  /** clears the choice so the banner shows again */
  reset: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Global consent for embedded third-party services (YouTube, Google Maps).
 * One decision, stored in localStorage. When "accepted", embeds load directly;
 * otherwise the per-embed 2-click fallback stays in place.
 */
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") setConsent(stored);
    } catch {
      // localStorage unavailable (private mode etc.) — treat as no decision
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((value: ConsentValue) => {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore write failures
    }
    setConsent(value);
  }, []);

  const value: ConsentContextValue = {
    consent,
    hydrated,
    accept: () => persist("accepted"),
    decline: () => persist("declined"),
    reset: () => persist(null),
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
