import { NextResponse } from 'next/server';
// import { verifyIdToken } from './utils/firebaseAdmin';

const protectedPaths = ['/dashboard', '/history'];

export async function middleware(req) {
  const token = req.cookies.get('__session')?.value;
  const pathname = req.nextUrl.pathname;

  // Jika bukan route yang di-protect → next()
  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Kalau gak ada token → redirect ke /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // await verifyIdToken(token);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/history/:path*'],
};