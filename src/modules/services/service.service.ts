import { cache } from "react";
import type {
  ServiceDetails,
  ServiceSummary,
  ServiceWriteInput,
} from "@/src/models/services/service";
import { logError } from "@/src/lib/utils/logger";
import {
  mapServiceToDetails,
  mapServiceToSummary,
  normalizeServiceWriteInput,
} from "./service.mapper";
import {
  createServiceRecord,
  deleteServiceRecord,
  findServiceById,
  findServices,
  updateServiceRecord,
} from "./service.repository";

function parseServiceId(id: string): number | null {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

const getServicesInternal = async (): Promise<ServiceDetails[]> => {
  try {
    const services = await findServices();
    return services.map(mapServiceToDetails);
  } catch (error) {
    logError("Services Service - GET ALL", error);
    return [];
  }
};

export const getServices = cache(getServicesInternal);

export async function getServiceById(id: string): Promise<ServiceDetails | null> {
  const parsedId = parseServiceId(id);

  if (parsedId !== null) {
    try {
      const service = await findServiceById(parsedId);

      if (service) {
        return mapServiceToDetails(service);
      }
    } catch (error) {
      logError("Services Service - GET BY ID", error);
    }
  }

  return null;
}

export async function createService(
  input: Partial<ServiceWriteInput>
): Promise<ServiceDetails> {
  const normalizedInput = normalizeServiceWriteInput(input);
  const service = await createServiceRecord(normalizedInput);

  return mapServiceToDetails(service);
}

export async function updateService(
  id: string,
  input: Partial<ServiceWriteInput>
): Promise<ServiceDetails | null> {
  const parsedId = parseServiceId(id);

  if (parsedId === null) {
    return null;
  }

  const existingService = await findServiceById(parsedId);

  if (!existingService) {
    return null;
  }

  const normalizedInput = normalizeServiceWriteInput(input);
  const updatedService = await updateServiceRecord(parsedId, normalizedInput);

  return mapServiceToDetails(updatedService);
}

export async function deleteService(id: string): Promise<boolean> {
  const parsedId = parseServiceId(id);

  if (parsedId === null) {
    return false;
  }

  const existingService = await findServiceById(parsedId);

  if (!existingService) {
    return false;
  }

  await deleteServiceRecord(parsedId);
  return true;
}
