import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  const protectedRoutes = ["/products"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}