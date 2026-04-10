import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logRequest } from "@/src/lib/logger";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;

    // Track Request method, URL, Timestamp via logger
    logRequest(request.method, url);

    const response = NextResponse.next();

    // We can also set a custom header to pass the start time if we want,
    // but wrapping the API routes will handle execution time logging.

    return response;
}

export const config = {
    // Only apply to API routes
    matcher: ['/api/:path*'],
};
