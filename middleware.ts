import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PAGES = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies?.get("token")?.value;

  if (PUBLIC_PAGES.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (!PUBLIC_PAGES.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico|public).*)",
};
