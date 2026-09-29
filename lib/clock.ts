/**
 * Render-time "now" for server components. On statically rendered (ISR)
 * pages this is the regeneration time — time-critical UI must re-check
 * with the browser clock via `useNow`.
 */
export function currentTime(): number {
  return Date.now();
}
