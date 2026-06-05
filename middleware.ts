import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of protected routes
  const protectedRoutes = ["/profile", "/communities", "/messages"];

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    // Check for auth cookie
    const authCookie =
      request.cookies.get("authToken") || request.cookies.get("token");

    if (!authCookie) {
      // Redirect to sign-in if no auth cookie
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Allow access or redirect
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
