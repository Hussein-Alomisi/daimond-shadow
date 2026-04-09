import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET all projects
export async function GET() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
}

// POST create project
export async function POST(req: Request) {
    const body = await req.json();

    const project = await prisma.project.create({
        data: {
            title: body.title,
            description: body.description,
            image: body.image,
            category: body.category,
        },
    });

    return NextResponse.json(project);
}