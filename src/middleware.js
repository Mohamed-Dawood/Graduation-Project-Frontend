import { NextResponse } from 'next/server';
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('role').value;
  if (pathname.startsWith('/adminDashboard')) {
    if (role === 'Admin') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/adminDashboard/:path*'],
};
