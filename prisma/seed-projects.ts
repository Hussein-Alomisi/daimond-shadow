import { PrismaClient } from '@prisma/client';
import { MOCK_PROJECTS } from '../src/lib/data/mockProjects';

export async function seedProjects(prisma: PrismaClient) {
  console.log("Start seeding Projects...");

  for (const p of MOCK_PROJECTS) {
    await prisma.project.create({
      data: {
        title: p.title,
        description: `هذا وصف لمشروع ${p.title} المنفذ من قبل مؤسستنا بأعلى معايير الجودة والاتقان.`,
        image: p.image,
        category: p.category,
      },
    });
  }

  console.log(`Seeded ${MOCK_PROJECTS.length} projects.`);
  console.log("Projects seeding finished.");
}
