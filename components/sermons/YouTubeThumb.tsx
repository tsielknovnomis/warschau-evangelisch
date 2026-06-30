"use client";

import { useState } from "react";

/**
 * YouTube thumbnail with graceful fallback. If the video has no real preview
 * (YouTube returns its 120×90 grey placeholder) or the request fails, we show
 * a calm aubergine gradient instead of the ugly grey image.
 */
export function YouTubeThumb({ id, className = "" }: { id: string; className?: string }) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div
        aria-hidden
        className={`bg-gradient-to-br from-aubergine to-aubergine-deep ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
      alt=""
      loading="lazy"
      onLoad={(e) => {
        // YouTube's "no thumbnail" placeholder is 120px wide.
        if (e.currentTarget.naturalWidth <= 120) setOk(false);
      }}
      onError={() => setOk(false)}
      className={className}
    />
  );
}
