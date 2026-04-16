import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/utils/logger";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/src/modules/projects/project.service";

function isInvalidProjectInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_PROJECT_INPUT";
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const { id } = await context.params;
    const project = await getProjectById(id);

    if (!project) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(project);
  } catch (error) {
    logError("API Error - GET Project", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const { id } = await context.params;
    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const category = formData.get("category")?.toString();
    const imageFile = formData.get("image");

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;

    if (imageFile instanceof File && imageFile.size > 0) {
      const { saveImage } = await import("@/src/lib/utils/file-upload");
      updateData.image = await saveImage(imageFile);
    } else if (typeof imageFile === "string" && imageFile !== "") {
      updateData.image = imageFile;
    }

    const project = await updateProject(id, updateData);

    if (!project) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(project);
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

    logError("API Error - PUT Project", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const { id } = await context.params;
    const deleted = await deleteProject(id);

    if (!deleted) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    logError("API Error - DELETE Project", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
