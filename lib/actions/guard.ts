import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

/**
 * Every mutating server action must call this first: with the database gone,
 * there is no RLS safety net anymore — the action itself is the gate.
 * Returns true when the request carries a valid admin session.
 */
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}
