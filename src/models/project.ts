export interface ProjectSummary {
  id: string;
  title: string;
  category?: string;
  image: string;
  location?: string;
}

export interface ProjectDetails extends ProjectSummary {
  description: string;
  createdAt?: string;
}

export interface ProjectWriteInput {
  title: string;
  description: string;
  image: string;
  category?: string | null;
}
