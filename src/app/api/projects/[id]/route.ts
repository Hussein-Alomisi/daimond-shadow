import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/logger";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/src/server/projects/project.service";

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
    const body = await req.json();
    const project = await updateProject(id, body);

    if (!project) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(project);
  } catch (error) {
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
