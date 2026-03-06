import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "./lib/authUtils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const verify = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!)
    : null;

  const isValidAccessToken = verify?.success;
  const decodedAccessToken = verify?.data;

  const isValidRefreshToken = refreshToken
    ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!).success
    : false;

  const isAuthenticated = isValidAccessToken || isValidRefreshToken;

  const authRoutes = ["/login", "/register"];

  const publicRoutes = ["/", "/about", "/contact"];

  const userRole = decodedAccessToken?.role as UserRole;

  const redirect = request.nextUrl.searchParams.get("redirect");

  // =========================
  // AUTH ROUTES
  // =========================
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      const dashboardRoute = getDefaultDashboardRoute(userRole);

      if (redirect && isValidRedirectForRole(redirect, userRole)) {
        return NextResponse.redirect(new URL(redirect, request.url));
      }

      return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }

    return NextResponse.next();
  }

  // =========================
  // PRIVATE ROUTES
  // =========================
  if (!publicRoutes.includes(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // =========================
  // EMAIL VERIFY + PASSWORD CHANGE LOGIC
  // =========================
  if (decodedAccessToken) {
    const { emailVerified, needPasswordChange, email } = decodedAccessToken;

    if (emailVerified === false) {
      if (pathname !== "/verify-email") {
        const verifyEmailUrl = new URL("/verify-email", request.url);
        verifyEmailUrl.searchParams.set("email", email);
        return NextResponse.redirect(verifyEmailUrl);
      }

      return NextResponse.next();
    }

    if (emailVerified && pathname === "/verify-email") {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url)
      );
    }

    if (needPasswordChange) {
      if (pathname !== "/reset-password") {
        const resetPasswordUrl = new URL("/reset-password", request.url);
        resetPasswordUrl.searchParams.set("email", email);
        return NextResponse.redirect(resetPasswordUrl);
      }

      return NextResponse.next();
    }

    if (!needPasswordChange && pathname === "/reset-password") {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/register",
    "/verify-email",
    "/reset-password",
  ],
};