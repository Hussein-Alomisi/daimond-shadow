import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logError, logResponse } from "@/src/lib/utils/logger";
import {
  deleteService,
  getServiceById,
  updateService,
} from "@/src/modules/services/service.service";

function isInvalidServiceInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_SERVICE_INPUT";
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const { id } = await context.params;
    const service = await getServiceById(id);

    if (!service) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(service);
  } catch (error) {
    logError("API Error - GET Service", error);
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
    const service = await updateService(id, body);

    if (!service) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/services");

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(service);
  } catch (error: any) {

    if (isInvalidServiceInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "Invalid service payload" },
        { status: 400 }
      );
    }

    logError("API Error - PUT Service", error);
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
    const deleted = await deleteService(id);

    if (!deleted) {
      logResponse(404, url, Date.now() - start);
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/services");

    logResponse(200, url, Date.now() - start);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    logError("API Error - DELETE Service", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
