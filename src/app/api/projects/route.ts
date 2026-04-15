import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/logger";
import {
  createProject,
  getProjects,
} from "@/src/server/projects/project.service";

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
    const body = await req.json();
    const project = await createProject(body);

    logResponse(201, url, Date.now() - start);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
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
