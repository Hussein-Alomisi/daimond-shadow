import { cache } from "react";
import type {
  ProjectDetails,
  ProjectSummary,
  ProjectWriteInput,
} from "@/src/models/projects/project";
import { logError } from "@/src/lib/utils/logger";
import { MOCK_PROJECTS } from "@/src/lib/data/mockProjects";
import {
  mapProjectToDetails,
  mapProjectToSummary,
  normalizeProjectWriteInput,
} from "./project.mapper";
import {
  createProjectRecord,
  deleteProjectRecord,
  findProjectById,
  findProjects,
  updateProjectRecord,
} from "./project.repository";

function parseProjectId(id: string): number | null {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

function mapMockProjectToDetails(project: ProjectSummary): ProjectDetails {
  return {
    ...project,
    description: "",
  };
}

const getProjectsInternal = async (): Promise<ProjectSummary[]> => {
  try {
    const projects = await findProjects();

    if (projects.length > 0) {
      return projects.map(mapProjectToSummary);
    }
  } catch (error) {
    logError("Projects Service - GET ALL", error);
  }

  return MOCK_PROJECTS;
};

export const getProjects = cache(getProjectsInternal);

export async function getProjectById(id: string): Promise<ProjectDetails | null> {
  const parsedId = parseProjectId(id);

  if (parsedId !== null) {
    try {
      const project = await findProjectById(parsedId);

      if (project) {
        return mapProjectToDetails(project);
      }
    } catch (error) {
      logError("Projects Service - GET BY ID", error);
    }
  }

  const mockProject = MOCK_PROJECTS.find((project) => project.id === id);
  return mockProject ? mapMockProjectToDetails(mockProject) : null;
}

export async function createProject(
  input: Partial<ProjectWriteInput>
): Promise<ProjectDetails> {
  const normalizedInput = normalizeProjectWriteInput(input);
  const project = await createProjectRecord(normalizedInput);

  return mapProjectToDetails(project);
}

export async function updateProject(
  id: string,
  input: Partial<ProjectWriteInput>
): Promise<ProjectDetails | null> {
  const parsedId = parseProjectId(id);

  if (parsedId === null) {
    return null;
  }

  const existingProject = await findProjectById(parsedId);

  if (!existingProject) {
    return null;
  }

  const normalizedInput = normalizeProjectWriteInput(input);
  const updatedProject = await updateProjectRecord(parsedId, normalizedInput);

  return mapProjectToDetails(updatedProject);
}

export async function deleteProject(id: string): Promise<boolean> {
  const parsedId = parseProjectId(id);

  if (parsedId === null) {
    return false;
  }

  const existingProject = await findProjectById(parsedId);

  if (!existingProject) {
    return false;
  }

  await deleteProjectRecord(parsedId);
  return true;
}
