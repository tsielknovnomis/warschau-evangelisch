"use client";

import { useState } from "react";

/**
 * Privacy-friendly 2-click YouTube embed (DSGVO).
 * Shows a neutral placeholder; loads the iframe (youtube-nocookie) only after consent click.
 * No request reaches Google until the user clicks play.
 */
export function YouTubeLite({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="group relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-br from-aubergine to-aubergine-900 text-white transition-colors"
      aria-label={`Video „${title}" abspielen`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 transition-transform group-hover:scale-110">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="px-6 text-center font-serif text-lg">{title}</span>
      <span className="max-w-xs px-6 text-center text-xs text-white/70">
        Mit Klick wird das Video von YouTube geladen. Dabei werden Daten an Google übertragen.
      </span>
    </button>
  );
}
