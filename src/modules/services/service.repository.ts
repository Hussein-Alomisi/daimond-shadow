import type { service as Service } from "@prisma/client";
import type { ServiceWriteInput } from "@/src/models/services/service";
import { prisma } from "@/src/lib/db/prisma";

export async function findServices(): Promise<Service[]> {
  return prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findServiceById(id: number): Promise<Service | null> {
  return prisma.service.findUnique({
    where: { id },
  });
}

export async function createServiceRecord(
  data: ServiceWriteInput
): Promise<Service> {
  return prisma.service.create({
    data,
  });
}

export async function updateServiceRecord(
  id: number,
  data: ServiceWriteInput
): Promise<Service> {
  return prisma.service.update({
    where: { id },
    data,
  });
}

export async function deleteServiceRecord(id: number): Promise<void> {
  await prisma.service.delete({
    where: { id },
  });
}
