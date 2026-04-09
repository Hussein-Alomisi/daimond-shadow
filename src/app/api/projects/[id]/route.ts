import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET single project
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const project = await prisma.project.findUnique({
        where: { id: Number(params.id) },
    });

    return NextResponse.json(project);
}

// UPDATE project
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    const project = await prisma.project.update({
        where: { id: Number(params.id) },
        data: {
            title: body.title,
            description: body.description,
            image: body.image,
            category: body.category,
        },
    });

    return NextResponse.json(project);
}

// DELETE project
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    await prisma.project.delete({
        where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
}