import { prisma } from "@/src/lib/db/prisma";
import type { SocialSettings } from "@prisma/client";

export async function getSocialSettingsRecord(): Promise<SocialSettings | null> {
  return prisma.socialSettings.findUnique({
    where: { id: 1 },
  });
}

export async function upsertSocialSettingsRecord(
  data: Omit<SocialSettings, "id" | "updatedAt">
): Promise<SocialSettings> {
  return prisma.socialSettings.upsert({
    where: { id: 1 },
    update: data,
    create: {
      id: 1,
      ...data,
    },
  });
}
