export interface FieldImageSummary {
  id: string;
  image: string;
  title?: string | null;
}

export interface FieldImageDetails extends FieldImageSummary {
  description?: string | null;
  fieldId: string;
}

export interface FieldImageWriteInput {
  image: string;
  title?: string | null;
  description?: string | null;
}

export interface FieldSummary {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
}

export interface FieldDetails extends FieldSummary {
  mainDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  galleryTitle: string;
  images: FieldImageDetails[];
  createdAt?: string;
}

export interface FieldWriteInput {
  title: string;
  slug: string;
  coverImage: string;
  mainDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  galleryTitle: string;
}
