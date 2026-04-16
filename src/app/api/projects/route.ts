import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/utils/logger";
import {
  createProject,
  getProjects,
} from "@/src/modules/projects/project.service";

function isInvalidProjectInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_PROJECT_INPUT";
}

export async function GET(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const projects = await getProjects();

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(projects);
  } catch (error) {
    logError("API Error - GET Projects", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const { saveImage } = await import("@/src/lib/utils/file-upload");
    const imagePath = await saveImage(imageFile);

    const project = await createProject({
      title,
      description,
      category,
      image: imagePath,
    });

    logResponse(201, url, Date.now() - start);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes("Invalid file type") || error.message?.includes("File size exceeds")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (isInvalidProjectInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "Invalid project payload" },
        { status: 400 }
      );
    }

    logError("API Error - POST Project", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
