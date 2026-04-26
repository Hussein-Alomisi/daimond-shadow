import type { project as PrismaProject } from "@prisma/client";
import type {
  ProjectDetails,
  ProjectSummary,
  ProjectWriteInput,
} from "@/src/models/projects/project";

export function mapProjectToSummary(project: PrismaProject): ProjectSummary {
  return {
    id: String(project.id),
    title: project.title,
    category: project.category ?? undefined,
    image: project.image,
  };
}

export function mapProjectToDetails(project: PrismaProject): ProjectDetails {
  return {
    ...mapProjectToSummary(project),
    description: project.description,
    createdAt: project.createdAt.toISOString(),
  };
}

export function normalizeProjectWriteInput(
  input: Partial<ProjectWriteInput>
): ProjectWriteInput {
  const title = input.title?.trim();
  const description = input.description?.trim();
  const image = input.image?.trim();
  const category = input.category?.trim();

  if (!title || !description || !image) {
    throw new Error("INVALID_PROJECT_INPUT");
  }

  return {
    title,
    description,
    image,
    category: category || null,
  };
}
