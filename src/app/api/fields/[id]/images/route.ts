import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logError, logResponse } from "@/src/lib/utils/logger";
import { addImageToField } from "@/src/modules/fields/field.service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const formData = await req.formData();
    
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const { saveImage } = await import("@/src/lib/utils/file-upload");
    const imagePath = await saveImage(imageFile, "fields/gallery");

    const image = await addImageToField(id, {
      title,
      description,
      image: imagePath,
    });

    if (!image) {
      return NextResponse.json({ error: "Could not add image, maybe field does not exist" }, { status: 400 });
    }

    revalidatePath("/fields");
    revalidatePath("/fields/[slug]", "page");

    logResponse(201, url, Date.now() - start);
    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    logError("API Error - POST Field Image", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
