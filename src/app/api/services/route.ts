import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logError, logResponse } from "@/src/lib/utils/logger";
import {
  createService,
  getServices,
} from "@/src/modules/services/service.service";

function isInvalidServiceInput(error: unknown): boolean {
  return error instanceof Error && error.message === "INVALID_SERVICE_INPUT";
}

export async function GET(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const services = await getServices();

    logResponse(200, url, Date.now() - start);
    return NextResponse.json(services);
  } catch (error) {
    logError("API Error - GET Services", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const start = Date.now();
  const url = new URL(req.url).pathname;

  try {
    const body = await req.json();
    const service = await createService(body);

    revalidatePath("/");
    revalidatePath("/services");

    logResponse(201, url, Date.now() - start);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (isInvalidServiceInput(error)) {
      logResponse(400, url, Date.now() - start);
      return NextResponse.json(
        { error: "Invalid service payload" },
        { status: 400 }
      );
    }

    logError("API Error - POST Service", error);
    logResponse(500, url, Date.now() - start);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
