import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const jwtSecret = process.env.JWT_ACCESS_SECRET;

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isLoginPage = request.nextUrl.pathname === '/';

  // If no tokens exist and trying to access any route except login page,
  // redirect to login page
  if (!accessToken && !refreshToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If tokens exist and trying to access login page,
  // redirect to dashboard or home page
  if (accessToken && refreshToken && isLoginPage) {
    return NextResponse.redirect(new URL('/StudentDashboard', request.url));
  }

  // For all other routes when tokens exist, verify the access token
  if (accessToken && !isLoginPage) {
    try {
      const encoder = new TextEncoder();
      await jwtVerify(accessToken, encoder.encode(jwtSecret));
      return NextResponse.next();
    } catch (error) {
      // If verification fails, redirect to login page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Exclude static files and certain paths from the middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};