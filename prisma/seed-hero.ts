import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const heroData = {
  id: 1,
  title: "نبني المستقبل \nبجودة وإتقان",
  subtitle: "شركة رائدة في مجال تصميم وتنفيذ المشاريع والمظلات وفق أعلى معايير الجودة.",
  image: "/images/hero/hero-bg.gif"
};

export async function seedHero(prisma: PrismaClient) {
  console.log("Start seeding Hero...");

  const hero = await prisma.heroSettings.upsert({
    where: { id: 1 },
    update: heroData,
    create: heroData,
  });

  console.log(`Hero settings seeded at id: ${hero.id}`);
  console.log("Hero seeding finished.");
}

