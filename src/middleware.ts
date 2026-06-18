import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes and API routes
  if (
    pathname.startsWith("/api") || 
    pathname.startsWith("/_next") || 
    pathname === "/favicon.ico" ||
    pathname === "/signup" ||
    pathname === "/verification-pending" ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("auth-token")?.value;
  
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For now, we allow the request to proceed and let the page 
  // handle specific role checks to avoid Edge Runtime DB issues.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
