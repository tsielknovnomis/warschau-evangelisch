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
      className="group relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[4px] border border-gold/30 bg-gradient-to-br from-aubergine to-aubergine-deep text-white transition-colors"
      aria-label={`Video „${title}" abspielen`}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 45%, var(--gold-soft) 0deg 0.4deg, transparent 0.4deg 8deg)",
          maskImage: "radial-gradient(circle at 50% 45%, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 0%, transparent 60%)",
        }}
      />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-white/10 ring-1 ring-white/20 transition-transform group-hover:scale-110">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold-soft)" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="relative px-6 text-center font-display text-lg">{title}</span>
      <span className="relative max-w-xs px-6 text-center text-xs text-white/65">
        Mit Klick wird das Video von YouTube geladen. Dabei werden Daten an Google übertragen.
      </span>
    </button>
  );
}
