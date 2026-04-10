import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { logError, logResponse } from "@/src/lib/logger";

// GET single project
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const start = Date.now();
    const url = new URL(req.url).pathname;

    try {
        const { id } = await context.params;

        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
        });

        logResponse(200, url, Date.now() - start);
        return NextResponse.json(project);
    } catch (error) {
        logError("API Error - GET Project", error);
        logResponse(500, url, Date.now() - start);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// UPDATE project
export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const start = Date.now();
    const url = new URL(req.url).pathname;

    try {
        const { id } = await context.params;
        const body = await req.json();

        const project = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                title: body.title,
                description: body.description,
                image: body.image,
                category: body.category,
            },
        });

        logResponse(200, url, Date.now() - start);
        return NextResponse.json(project);
    } catch (error) {
        logError("API Error - PUT Project", error);
        logResponse(500, url, Date.now() - start);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE project
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const start = Date.now();
    const url = new URL(req.url).pathname;

    try {
        const { id } = await context.params;

        await prisma.project.delete({
            where: { id: Number(id) },
        });

        logResponse(200, url, Date.now() - start);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        logError("API Error - DELETE Project", error);
        logResponse(500, url, Date.now() - start);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}