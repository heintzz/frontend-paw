"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const isAuthenticated = cookies().get("accessToken");
  const requiredLoginPaths = ["/dashboard", "/expense", "/income", "/goal"];
  const requiredLogoutPaths = ["/login", "/signup"];

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && requiredLoginPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && requiredLogoutPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Specify matchers for more specific paths
  matchers: [
    { pathname: "/" },
    { pathname: "/home" },
    { pathname: "/login" },
    { pathname: "/signup" },
    { pathname: "/expense/:path*" },
    { pathname: "/income/:path*" },
    { pathname: "/goal/:path*" },
  ],
};
