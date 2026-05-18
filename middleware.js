// frontend/middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
  // Get token from cookies
  const token = req.cookies.get('token');

  // Protected Routes
  const protectedRoutes = [
    '/dashboard',
    '/products',
    '/profile',
  ];

  // Check Protected Route
  const isProtectedRoute =
    protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

  // Redirect if no token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL('/login', req.url)
    );
  }

  // Continue
  return NextResponse.next();
}