"use client";

import { useState } from "react";
import { YouTubeThumb } from "@/components/sermons/YouTubeThumb";

/**
 * Privacy-friendly 2-click YouTube embed (DSGVO).
 * Shows the real YouTube thumbnail; loads the iframe (youtube-nocookie) only
 * after a consent click. The thumbnail is a single image request to Google
 * (no cookies/tracking); the player + its cookies load only on click.
 */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
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
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-aubergine-deep text-left"
      aria-label={`Video „${title}" abspielen`}
    >
      <YouTubeThumb
        id={id}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {/* subtle gradient for play button + caption legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-aubergine-deep/80 via-aubergine-deep/10 to-aubergine-deep/15"
      />

      {/* play button */}
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-aubergine-deep/70 backdrop-blur-sm transition-transform group-hover:scale-110">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      {/* caption */}
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block font-display text-base text-white drop-shadow sm:text-lg">{title}</span>
        <span className="mt-0.5 block text-[11px] text-white/70">
          Mit Klick wird das Video von YouTube geladen — dabei werden Daten an Google übertragen.
        </span>
      </span>
    </button>
  );
}
