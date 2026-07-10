/**
 * Minimal team-password auth for /admin.
 *
 * The team password lives in the ADMIN_PASSWORD env var (Netlify env).
 * A successful login sets an HttpOnly cookie containing an expiring token
 * signed with HMAC-SHA256 (keyed by the password, so changing the password
 * invalidates all sessions). Web Crypto only — works in Edge middleware
 * and in Node server actions alike.
 */

export const SESSION_COOKIE = "we-admin-session";
const SESSION_DAYS = 30;

function secret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(`we-admin:${secret()}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function verifyPassword(input: string): boolean {
  const pw = secret();
  return pw.length > 0 && constantTimeEqual(input, pw);
}

/** "exp.signature" token, valid for SESSION_DAYS. */
export async function createSessionToken(): Promise<string> {
  const exp = String(Date.now() + SESSION_DAYS * 86_400_000);
  return `${exp}.${await hmac(exp)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || secret().length === 0) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return constantTimeEqual(sig, await hmac(exp));
}
