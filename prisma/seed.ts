import { PrismaClient } from '@prisma/client';
import { seedFields } from './seed-fields';
import { seedHero } from './seed-hero';
import { seedServices } from './seed-services';
import { seedProjects } from './seed-projects';
import { seedSocial } from './seed-social';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database seeding...');
  
  try {
    // Clear existing data to avoid duplicates (except for settings which use upsert)
    console.log('🧹 Cleaning up database...');
    await prisma.project.deleteMany({});
    await prisma.service.deleteMany({});
    // Note: Field and Hero use upsert so they don't strictly need clearing, 
    // but clearing ensures a clean state for everything.
    await prisma.field.deleteMany({});

    await seedHero(prisma);
    await seedServices(prisma);
    await seedFields(prisma);
    await seedProjects(prisma);
    await seedSocial(prisma);
    
    console.log('✅ Seeding completed successfully!');
  } catch (error) {



    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
