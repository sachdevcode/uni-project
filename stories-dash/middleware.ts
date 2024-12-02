import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Try to retrieve the token from cookies
  let token: string | undefined;
  try {
    token = request.cookies.get('token')?.value;
  } catch (error) {
    console.error('Error retrieving token from cookies:', error);
  }

  const publicPages = ['/', '/signup'];

  const isPublicPage = publicPages.includes(request.nextUrl.pathname);

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*']
};
