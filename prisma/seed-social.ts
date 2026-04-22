import { PrismaClient } from '@prisma/client';

export async function seedSocial(prisma: PrismaClient) {
  console.log("Start seeding Social Settings...");

  const social = await prisma.socialSettings.upsert({
    where: { id: 1 },
    update: {
      phone: "0500000000",
      whatsapp: "966500000000",
      email: "info@tashyed-alqwa.com",
    },
    create: {
      id: 1,
      phone: "0500000000",
      whatsapp: "966500000000",
      email: "info@tashyed-alqwa.com",
    },
  });

  console.log(`Social settings seeded at id: ${social.id}`);
  console.log("Social seeding finished.");
}
