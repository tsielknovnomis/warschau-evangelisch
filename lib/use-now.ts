"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 60_000;

function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
}

function getSnapshot(): number {
  return Math.floor(Date.now() / TICK_MS) * TICK_MS;
}

/**
 * Browser clock at minute precision. Uses `serverNow` during SSR and hydration,
 * then the real clock — so a cached page can never show stale "next" data.
 */
export function useNow(serverNow: number): number {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverNow);
}
