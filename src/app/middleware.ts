import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); 
  }

  if (isAdminRoute && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], 
};
