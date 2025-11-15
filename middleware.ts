import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple middleware without next-auth middleware
// We'll handle auth in the app itself
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow access to login page
  if (path === "/admin/login") {
    return NextResponse.next()
  }

  // For now, allow all admin routes
  // Auth will be handled by NextAuth in the app
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}

