import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesToSeed = [
  {
    title: "المظلات",
    description: "تنفيذ جميع أنواع المظلات بأحدث التصاميم",
    icon: "umbrella",
  },
  {
    title: "السواتر",
    description: "تركيب السواتر بمختلف الخامات",
    icon: "fence",
  },
  {
    title: "برجولات وهناجر",
    description: "تركيب البرجولات والهناجر بأحدث التصاميم",
    icon: "building2",
  },
  {
    title: "أعمال القرميد والديكورات الخارجية",
    description: "تركيب القرميد والديكورات الخارجية بأحدث التصاميم",
    icon: "hammer",
  },
  {
    title: "المقاولات العامة",
    description: "تنفيذ جميع أعمال المقاولات العامة بأحدث التصاميم",
    icon: "building2",
  },
  {
    title: "الترميم والصيانة",
    description: "عقود صيانة وقائية ودورية للمنشآت والمظلات لضمان استدامتها وسلامتها الدائمة.",
    icon: "wrench",
  },
  {
    title: "حلول الساندوتش بانل الحديثة",
    description: "تركيب الساندوتش بانل بأحدث التصاميم",
    icon: "hammer",
  },
];

export async function seedServices(prisma: PrismaClient) {
  console.log("Start seeding Services...");

  for (const s of servicesToSeed) {
    const service = await prisma.service.create({
      data: s,
    });
    console.log(`Created service with id: ${service.id} - ${service.title}`);
  }

  console.log("Services seeding finished.");
}

