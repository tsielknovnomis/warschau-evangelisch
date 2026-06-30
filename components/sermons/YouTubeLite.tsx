"use client";

import { useState } from "react";
import { YouTubeThumb } from "@/components/sermons/YouTubeThumb";
import { useConsent } from "@/components/consent/ConsentProvider";

/**
 * Privacy-friendly YouTube embed (DSGVO).
 * Loads the iframe (youtube-nocookie) directly when global consent is
 * "accepted"; otherwise shows the real thumbnail and loads only after a
 * per-embed click. The thumbnail is a single image request (no cookies).
 */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const { consent } = useConsent();
  const [active, setActive] = useState(false);

  if (active || consent === "accepted") {
    // Autoplay only when the user actively clicked play — not when the embed
    // loads automatically via global consent.
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=${active ? 1 : 0}&rel=0`}
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
