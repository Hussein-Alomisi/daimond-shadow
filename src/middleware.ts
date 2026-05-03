import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logRequest } from "@/src/lib/utils/logger";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;

    // Track Request method, URL, Timestamp via logger
    logRequest(request.method, url);

    const session = request.cookies.get("admin_session")?.value;
    const sessionSecret = process.env.SESSION_SECRET;

    // 1. Protect /dashboard
    if (url.startsWith("/dashboard")) {
        if (!session || session !== sessionSecret) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 2. Prevent logged in users from visiting /login
    if (url === "/login") {
        if (session && session === sessionSecret) {
            const dashboardUrl = new URL("/dashboard", request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    // Apply to dashboard, login and all API routes
    matcher: ['/dashboard/:path*', '/login', '/api/:path*'],
};
