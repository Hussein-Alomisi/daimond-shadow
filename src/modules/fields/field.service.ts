import { cache } from "react";
import type {
  FieldDetails,
  FieldSummary,
  FieldWriteInput,
  FieldImageDetails,
  FieldImageWriteInput,
} from "@/src/models/fields/field";
import { logError } from "@/src/lib/utils/logger";
import {
  mapFieldToDetails,
  mapFieldToSummary,
  normalizeFieldWriteInput,
  mapFieldImageToDetails,
  normalizeFieldImageWriteInput,
} from "./field.mapper";
import {
  createFieldRecord,
  deleteFieldRecord,
  findFieldById,
  findFieldBySlug,
  findFields,
  updateFieldRecord,
  addImageToFieldRecord,
  deleteFieldImageRecord,
  updateFieldImageRecord,
} from "./field.repository";

function parseId(id: string): number | null {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }
  return parsedId;
}

const getFieldsInternal = async (): Promise<FieldSummary[]> => {
  try {
    const fields = await findFields();
    if (fields.length > 0) {
      return fields.map(mapFieldToSummary);
    }
  } catch (error) {
    logError("Fields Service - GET ALL", error);
  }
  return [];
};

export const getFields = cache(getFieldsInternal);

export async function getFieldById(id: string): Promise<FieldDetails | null> {
  const parsedId = parseId(id);
  if (parsedId !== null) {
    try {
      const field = await findFieldById(parsedId);
      if (field) {
        return mapFieldToDetails(field);
      }
    } catch (error) {
      logError("Fields Service - GET BY ID", error);
    }
  }
  return null;
}

export async function getFieldBySlug(slug: string): Promise<FieldDetails | null> {
  try {
    const field = await findFieldBySlug(slug);
    if (field) {
      return mapFieldToDetails(field);
    }
  } catch (error) {
    logError("Fields Service - GET BY SLUG", error);
  }
  return null;
}

export async function createField(
  input: Partial<FieldWriteInput>
): Promise<FieldSummary> {
  const normalizedInput = normalizeFieldWriteInput(input);
  const field = await createFieldRecord(normalizedInput);
  return mapFieldToSummary(field);
}

export async function updateField(
  id: string,
  input: Partial<FieldWriteInput>
): Promise<FieldSummary | null> {
  const parsedId = parseId(id);
  if (parsedId === null) {
    return null;
  }

  const existingField = await findFieldById(parsedId);
  if (!existingField) {
    return null;
  }

  const normalizedInput = normalizeFieldWriteInput(input);
  const updatedField = await updateFieldRecord(parsedId, normalizedInput);
  return mapFieldToSummary(updatedField);
}

export async function deleteField(id: string): Promise<boolean> {
  const parsedId = parseId(id);
  if (parsedId === null) {
    return false;
  }

  const existingField = await findFieldById(parsedId);
  if (!existingField) {
    return false;
  }

  await deleteFieldRecord(parsedId);
  return true;
}

export async function addImageToField(
  fieldIdStr: string,
  input: Partial<FieldImageWriteInput>
): Promise<FieldImageDetails | null> {
  const fieldId = parseId(fieldIdStr);
  if (fieldId === null) {
    return null;
  }

  const normalizedInput = normalizeFieldImageWriteInput(input);
  const image = await addImageToFieldRecord(fieldId, normalizedInput);
  return mapFieldImageToDetails(image);
}

export async function updateFieldImage(
  imageIdStr: string,
  input: Partial<FieldImageWriteInput>
): Promise<FieldImageDetails | null> {
  const imageId = parseId(imageIdStr);
  if (imageId === null) {
    return null;
  }

  const normalizedInput = normalizeFieldImageWriteInput(input);
  const image = await updateFieldImageRecord(imageId, normalizedInput);
  return mapFieldImageToDetails(image);
}

export async function deleteFieldImage(imageIdStr: string): Promise<boolean> {
  const imageId = parseId(imageIdStr);
  if (imageId === null) {
    return false;
  }

  await deleteFieldImageRecord(imageId);
  return true;
}
