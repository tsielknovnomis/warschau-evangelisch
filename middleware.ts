import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

/**
 * Guards /admin: without a valid session cookie you land on the login page
 * (and with one, the login page bounces you to the dashboard).
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const loggedIn = await verifySessionToken(token);
  const { pathname } = request.nextUrl;
  const isLogin = pathname.startsWith("/admin/login");

  if (!loggedIn && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (loggedIn && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
