import { prisma } from "@/src/lib/db/prisma";
import type { HeroSettings } from "@prisma/client";

export async function getHeroSettingsRecord(): Promise<HeroSettings | null> {
  return prisma.heroSettings.findUnique({
    where: { id: 1 },
  });
}

export async function upsertHeroSettingsRecord(
  data: Omit<HeroSettings, "id" | "updatedAt">
): Promise<HeroSettings> {
  return prisma.heroSettings.upsert({
    where: { id: 1 },
    update: data,
    create: {
      id: 1,
      ...data,
    },
  });
}
