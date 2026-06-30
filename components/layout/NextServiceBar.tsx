"use client";

import { useState } from "react";
import Link from "next/link";
import type { ChurchEvent } from "@/lib/types";

const fmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "numeric",
  month: "long",
});

export function NextServiceBar({ event }: { event: ChurchEvent | null }) {
  const [dismissed, setDismissed] = useState(false);
  if (!event || dismissed) return null;

  const date = fmt.format(new Date(event.startsAt));
  const time = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.startsAt));

  return (
    <div className="bg-gold text-aubergine-deep">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-1.5 text-[0.82rem] sm:px-8">
        <span className="font-body font-semibold uppercase tracking-[0.13em]">
          Nächster Gottesdienst
        </span>
        <span aria-hidden className="h-3 w-px bg-aubergine-deep/40" />
        <Link href="/gottesdienste" className="font-medium text-aubergine-deep hover:underline">
          {date} · {time} Uhr
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Hinweis schließen"
          className="ml-1 rounded p-0.5 text-aubergine-deep/70 transition-colors hover:bg-aubergine-deep/10 hover:text-aubergine-deep"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
