"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsItem } from "@/lib/types";

export function AnnouncementBar({ item }: { item: NewsItem | null }) {
  const [dismissed, setDismissed] = useState(false);
  if (!item || dismissed) return null;

  return (
    <div className="bg-gold text-aubergine-deep">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2 text-sm sm:px-8">
        <span className="hidden shrink-0 font-body text-[0.7rem] font-bold uppercase tracking-[0.15em] sm:inline">
          Aktuell
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-aubergine-deep/30 sm:block" />
        <Link
          href={`/aktuelles/${item.slug}`}
          className="flex-1 truncate font-medium text-aubergine-deep hover:underline"
        >
          {item.title}
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Hinweis schließen"
          className="rounded p-1 text-aubergine-deep/70 transition-colors hover:bg-aubergine-deep/10 hover:text-aubergine-deep"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
