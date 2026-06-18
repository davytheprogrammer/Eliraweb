import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname.startsWith("/api")) return response;

  // Allow signup and verification-pending without auth
  if (pathname === "/signup" || pathname === "/verification-pending") {
    return response;
  }

  if (pathname === "/" || pathname === "/login") {
    if (user) {
      const role = user.user_metadata?.role as string | undefined;
      const isDoctor = role === 'DOCTOR' || role === 'GYNECOLOGIST';
      const dest = role === "ADMIN" ? "/admin/dashboard" : "/doctor/dashboard";
      return NextResponse.redirect(new URL(dest, request.url));
    }
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  const role = user.user_metadata?.role as string | undefined;
  const isDoctor = role === 'DOCTOR' || role === 'GYNECOLOGIST';
  const isAdmin = role === 'ADMIN';

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/doctor/dashboard", request.url));
  }

  if (pathname.startsWith("/doctor") && !isDoctor) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
