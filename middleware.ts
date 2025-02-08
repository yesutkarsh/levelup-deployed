// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const jwtSecret = process.env.JWT_ACCESS_SECRET;

export async function middleware(request: NextRequest) {
  // Allow the homepage to be accessed freely
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Attempt to get the token from cookies
  const token = request.cookies.get('accessToken')?.value;
  
  // If token is missing, redirect to the homepage (login page)
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Verify the token's integrity using the secret
  try {
    const encoder = new TextEncoder();
    await jwtVerify(token, encoder.encode(jwtSecret));
  } catch (error) {
    // If verification fails, redirect to the homepage
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Token exists and is valid; allow the request to proceed.
  return NextResponse.next();
}

// Exclude static files and certain paths from the middleware
export const config = {
  matcher: [
    // Protect all routes except:
    // - API routes
    // - _next static files
    // - Next.js images
    // - favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
