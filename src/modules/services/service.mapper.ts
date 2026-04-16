import type { Service as PrismaService } from "@prisma/client";
import type {
  ServiceDetails,
  ServiceSummary,
  ServiceWriteInput,
} from "@/src/models/services/service";

export function mapServiceToSummary(service: PrismaService): ServiceSummary {
  return {
    id: String(service.id),
    title: service.title,
    icon: service.icon,
  };
}

export function mapServiceToDetails(service: PrismaService): ServiceDetails {
  return {
    ...mapServiceToSummary(service),
    description: service.description,
    createdAt: service.createdAt.toISOString(),
  };
}

export function normalizeServiceWriteInput(
  input: Partial<ServiceWriteInput>
): ServiceWriteInput {
  const title = input.title?.trim();
  const description = input.description?.trim();
  const icon = input.icon?.trim();

  if (!title || !description || !icon) {
    throw new Error("INVALID_SERVICE_INPUT");
  }

  return {
    title,
    description,
    icon,
  };
}
