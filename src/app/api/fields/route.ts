import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/utils/logger";
import {
  createField,
  getFields,
} from "@/src/modules/fields/field.service";

function isInvalidFieldInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_FIELD_INPUT";
}

export async function GET(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const fields = await getFields();
    logResponse(200, url, Date.now() - start);
    return NextResponse.json(fields);
  } catch (error) {
    logError("API Error - GET Fields", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const formData = await req.formData();
    
    // Extracting all the fields
    const title = formData.get("title")?.toString() || "";
    const slug = formData.get("slug")?.toString() || "";
    const mainDescription = formData.get("mainDescription")?.toString() || "";
    const aboutTitle = formData.get("aboutTitle")?.toString() || "";
    const aboutDescription = formData.get("aboutDescription")?.toString() || "";
    const galleryTitle = formData.get("galleryTitle")?.toString() || "";
    
    const coverImageFile = formData.get("coverImage") as File | null;

    if (!coverImageFile || !(coverImageFile instanceof File) || coverImageFile.size === 0) {
      return NextResponse.json({ error: "Cover image is required" }, { status: 400 });
    }

    const { saveImage } = await import("@/src/lib/utils/file-upload");
    const coverImagePath = await saveImage(coverImageFile, "fields");

    const field = await createField({
      title,
      slug,
      coverImage: coverImagePath,
      mainDescription,
      aboutTitle,
      aboutDescription,
      galleryTitle,
    });

    logResponse(201, url, Date.now() - start);
    return NextResponse.json(field, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes("Invalid file type") || error.message?.includes("File size exceeds")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (isInvalidFieldInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "Invalid field payload" },
        { status: 400 }
      );
    }

    logError("API Error - POST Field", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
