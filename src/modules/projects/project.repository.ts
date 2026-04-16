import type { Project } from "@prisma/client";
import type { ProjectWriteInput } from "@/src/models/projects/project";
import { prisma } from "@/src/lib/db/prisma";

export async function findProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findProjectById(id: number): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function createProjectRecord(
  data: ProjectWriteInput
): Promise<Project> {
  return prisma.project.create({
    data,
  });
}

export async function updateProjectRecord(
  id: number,
  data: ProjectWriteInput
): Promise<Project> {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProjectRecord(id: number): Promise<void> {
  await prisma.project.delete({
    where: { id },
  });
}
