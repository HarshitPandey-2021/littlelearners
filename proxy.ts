// // proxy.ts (was middleware.ts)
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function proxy(request: NextRequest) {
//   // Check if trying to access admin routes
//   if (request.nextUrl.pathname.startsWith('/admin')) {
//     // Check for auth cookie
//     const authCookie = request.cookies.get('admin_logged_in')
    
//     if (!authCookie) {
//       // Redirect to login if not authenticated
//       return NextResponse.redirect(new URL('/login', request.url))
//     }
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: '/admin/:path*',
// }