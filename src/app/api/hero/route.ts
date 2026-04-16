import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/utils/logger";
import { getHeroSettings, updateHeroSettings } from "@/src/modules/hero/hero.service";

function isInvalidHeroInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_HERO_INPUT";
}

export async function GET(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const settings = await getHeroSettings();
    logResponse(200, url, Date.now() - start);
    return NextResponse.json(settings);
  } catch (error) {
    logError("API Error - GET Hero Settings", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const subtitle = formData.get("subtitle")?.toString() || "";
    const imageFile = formData.get("image") as File | null;

    let imagePath = "";

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const { saveImage } = await import("@/src/lib/utils/file-upload");
      imagePath = await saveImage(imageFile);
    }

    const settings = await updateHeroSettings({
      title,
      subtitle,
      image: imagePath || undefined,
    });

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.message?.includes("Invalid file type") || error.message?.includes("File size exceeds")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (isInvalidHeroInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "العنوان الرئيسي مطلوب" },
        { status: 400 }
      );
    }

    logError("API Error - PUT Hero Settings", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
