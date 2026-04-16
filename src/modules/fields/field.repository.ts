import type { Field, FieldImagesLibrary } from "@prisma/client";
import type {
  FieldWriteInput,
  FieldImageWriteInput,
} from "@/src/models/fields/field";
import { prisma } from "@/src/lib/db/prisma";

export async function findFields(): Promise<Field[]> {
  return prisma.field.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findFieldById(
  id: number
): Promise<(Field & { images: FieldImagesLibrary[] }) | null> {
  return prisma.field.findUnique({
    where: { id },
    include: { images: true },
  });
}

export async function findFieldBySlug(
  slug: string
): Promise<(Field & { images: FieldImagesLibrary[] }) | null> {
  return prisma.field.findUnique({
    where: { slug },
    include: { images: true },
  });
}

export async function createFieldRecord(
  data: FieldWriteInput
): Promise<Field> {
  return prisma.field.create({
    data,
  });
}

export async function updateFieldRecord(
  id: number,
  data: FieldWriteInput
): Promise<Field> {
  return prisma.field.update({
    where: { id },
    data,
  });
}

export async function deleteFieldRecord(id: number): Promise<void> {
  await prisma.field.delete({
    where: { id },
  });
}

export async function addImageToFieldRecord(
  fieldId: number,
  data: FieldImageWriteInput
): Promise<FieldImagesLibrary> {
  return prisma.fieldImagesLibrary.create({
    data: {
      fieldId,
      ...data,
    },
  });
}

export async function updateFieldImageRecord(
  id: number,
  data: FieldImageWriteInput
): Promise<FieldImagesLibrary> {
  return prisma.fieldImagesLibrary.update({
    where: { id },
    data,
  });
}

export async function deleteFieldImageRecord(id: number): Promise<void> {
  await prisma.fieldImagesLibrary.delete({
    where: { id },
  });
}
