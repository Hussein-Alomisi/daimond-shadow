import type { field as PrismaField, FieldImagesLibrary as PrismaFieldImagesLibrary } from "@prisma/client";
import type {
  FieldSummary,
  FieldDetails,
  FieldWriteInput,
  FieldImageSummary,
  FieldImageDetails,
  FieldImageWriteInput,
} from "@/src/models/fields/field";

type PrismaFieldWithImages = PrismaField & { images?: PrismaFieldImagesLibrary[] };

export function mapFieldImageToSummary(image: PrismaFieldImagesLibrary): FieldImageSummary {
  return {
    id: String(image.id),
    image: image.image,
    title: image.title ?? undefined,
  };
}

export function mapFieldImageToDetails(image: PrismaFieldImagesLibrary): FieldImageDetails {
  return {
    ...mapFieldImageToSummary(image),
    description: image.description ?? undefined,
    fieldId: String(image.fieldId),
  };
}

export function mapFieldToSummary(field: PrismaField): FieldSummary {
  return {
    id: String(field.id),
    title: field.title,
    slug: field.slug,
    coverImage: field.coverImage,
  };
}

export function mapFieldToDetails(field: PrismaFieldWithImages): FieldDetails {
  return {
    ...mapFieldToSummary(field),
    mainDescription: field.mainDescription,
    aboutTitle: field.aboutTitle,
    aboutDescription: field.aboutDescription,
    galleryTitle: field.galleryTitle,
    images: field.images ? field.images.map(mapFieldImageToDetails) : [],
    createdAt: field.createdAt.toISOString(),
  };
}

export function normalizeFieldWriteInput(
  input: Partial<FieldWriteInput>
): FieldWriteInput {
  const title = input.title?.trim();
  const slug = input.slug?.trim();
  const coverImage = input.coverImage?.trim();
  const mainDescription = input.mainDescription?.trim();
  const aboutTitle = input.aboutTitle?.trim();
  const aboutDescription = input.aboutDescription?.trim();
  const galleryTitle = input.galleryTitle?.trim();

  if (
    !title ||
    !slug ||
    !coverImage ||
    !mainDescription ||
    !aboutTitle ||
    !aboutDescription ||
    !galleryTitle
  ) {
    throw new Error("INVALID_FIELD_INPUT");
  }

  return {
    title,
    slug,
    coverImage,
    mainDescription,
    aboutTitle,
    aboutDescription,
    galleryTitle,
  };
}

export function normalizeFieldImageWriteInput(
  input: Partial<FieldImageWriteInput>
): FieldImageWriteInput {
  const image = input.image?.trim();
  const title = input.title?.trim() || null;
  const description = input.description?.trim() || null;

  if (!image) {
    throw new Error("INVALID_FIELD_IMAGE_INPUT");
  }

  return {
    image,
    title,
    description,
  };
}
