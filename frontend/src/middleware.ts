import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  

  // If user is not authenticated and tries to access /dashboard, redirect to /login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, continue normally
  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: ["/dashboard/:path*"],
};
