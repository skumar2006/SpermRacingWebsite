import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle case-insensitive UF routes
  if (pathname.toLowerCase() === '/uf' && pathname !== '/uf') {
    return NextResponse.redirect(new URL('/uf', request.url));
  }

  // Handle case-insensitive UT routes
  if (pathname.toLowerCase() === '/ut' && pathname !== '/ut') {
    return NextResponse.redirect(new URL('/ut', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match UF and UT routes with any capitalization
    '/((?!api|_next/static|_next/image|icon.png|opengraph-image.png).*)',
  ],
};
