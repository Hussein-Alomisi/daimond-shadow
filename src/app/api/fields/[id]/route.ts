import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/utils/logger";
import {
  deleteField,
  getFieldById,
  updateField,
} from "@/src/modules/fields/field.service";

function isInvalidFieldInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_FIELD_INPUT";
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const field = await getFieldById(id);

    if (!field) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Field not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(field);
  } catch (error) {
    logError(`API Error - GET Field ${id}`, error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const formData = await req.formData();
    
    const title = formData.get("title")?.toString();
    const slug = formData.get("slug")?.toString();
    const mainDescription = formData.get("mainDescription")?.toString();
    const aboutTitle = formData.get("aboutTitle")?.toString();
    const aboutDescription = formData.get("aboutDescription")?.toString();
    const galleryTitle = formData.get("galleryTitle")?.toString();

    let coverImagePath: string | undefined;

    const coverImageFile = formData.get("coverImage") as File | null;
    if (coverImageFile && coverImageFile instanceof File && coverImageFile.size > 0) {
      const { saveImage } = await import("@/src/lib/utils/file-upload");
      coverImagePath = await saveImage(coverImageFile, "fields");
    } else {
      // It might pass the existing coverImage as string
      coverImagePath = formData.get("existingCoverImage")?.toString() || undefined;
    }

    const payload: any = {
      title,
      slug,
      mainDescription,
      aboutTitle,
      aboutDescription,
      galleryTitle,
    };
    
    if (coverImagePath) payload.coverImage = coverImagePath;

    const updatedField = await updateField(id, payload);

    if (!updatedField) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Field not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(updatedField);
  } catch (error: any) {
    if (
      error.message?.includes("Invalid file type") ||
      error.message?.includes("File size exceeds")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (isInvalidFieldInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "Invalid field payload" },
        { status: 400 }
      );
    }

    logError(`API Error - PUT Field ${id}`, error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const success = await deleteField(id);

    if (!success) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Field not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json({ success: true });
  } catch (error) {
    logError(`API Error - DELETE Field ${id}`, error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
