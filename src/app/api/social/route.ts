import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/utils/logger";
import { getSocialSettings, updateSocialSettings } from "@/src/modules/social/social.service";

function isInvalidSocialInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_SOCIAL_INPUT";
}

export async function GET(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const settings = await getSocialSettings();
    logResponse(200, url, Date.now() - start);
    return NextResponse.json(settings);
  } catch (error) {
    logError("API Error - GET Social Settings", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const body = await req.json();
    const settings = await updateSocialSettings(body);

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(settings);
  } catch (error) {
    if (isInvalidSocialInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "رقم الهاتف والواتساب مطلوبة" },
        { status: 400 }
      );
    }

    logError("API Error - PUT Social Settings", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
