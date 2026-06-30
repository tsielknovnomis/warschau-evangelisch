"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsItem } from "@/lib/types";

export function AnnouncementBar({ item }: { item: NewsItem | null }) {
  const [dismissed, setDismissed] = useState(false);
  if (!item || dismissed) return null;

  return (
    <div className="bg-aubergine-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2 text-sm sm:px-8">
        <span className="hidden rounded bg-coral px-2 py-0.5 text-xs font-semibold uppercase tracking-wide sm:inline">
          Aktuell
        </span>
        <Link
          href={`/aktuelles/${item.slug}`}
          className="flex-1 truncate text-white/90 hover:text-white"
        >
          {item.title}
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Hinweis schließen"
          className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
