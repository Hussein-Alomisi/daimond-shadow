import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logError, logResponse } from "@/src/lib/utils/logger";
import { updateFieldImage, deleteFieldImage } from "@/src/modules/fields/field.service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string, imageId: string }> }
) {
  const { imageId } = await params;
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const formData = await req.formData();
    
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    
    let imagePath: string | undefined;
    const imageFile = formData.get("image") as File | null;
    
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const { saveImage } = await import("@/src/lib/utils/file-upload");
      imagePath = await saveImage(imageFile, "fields/gallery");
    } else {
      imagePath = formData.get("existingImage")?.toString() || "";
    }

    if (!imagePath) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const updatedImage = await updateFieldImage(imageId, {
      title,
      description,
      image: imagePath,
    });

    if (!updatedImage) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    revalidatePath("/fields");
    revalidatePath("/fields/[slug]", "page");

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(updatedImage);
  } catch (error: any) {
    logError(`API Error - PUT Field Image ${imageId}`, error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, imageId: string }> }
) {
  const { imageId } = await params;
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const success = await deleteFieldImage(imageId);

    if (!success) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    revalidatePath("/fields");
    revalidatePath("/fields/[slug]", "page");

    logResponse(200, url, Date.now() - start);
    return NextResponse.json({ success: true });
  } catch (error) {
    logError(`API Error - DELETE Field Image ${imageId}`, error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
