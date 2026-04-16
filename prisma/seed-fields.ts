import { PrismaClient } from '@prisma/client';
import { fieldsData } from '../src/lib/data/fieldsData';
import { MOCK_FIELDS } from '../src/lib/data/mockFields';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding fields...');

  for (const field of fieldsData) {
    // Find cover image from MOCK_FIELDS
    const mockField = MOCK_FIELDS.find(f => f.slug === field.slug);
    
    // Default cover image if not found in MOCK_FIELDS, try to use first gallery image or a placeholder
    const coverImage = mockField?.image || (field.images[0] ?? "/images/hero/hero-bg.jpg");

    // Upsert Field
    const createdField = await prisma.field.upsert({
      where: { slug: field.slug },
      update: {},
      create: {
        title: field.title,
        slug: field.slug,
        coverImage: coverImage,
        mainDescription: field.description,
        aboutTitle: `نبذة عن ${field.title}`,
        aboutDescription: field.description,
        galleryTitle: `معرض صور ${field.title}`,
        images: {
          create: field.images.map((img, index) => ({
            image: img,
            title: `نموذج ${field.title} ${index + 1}`,
          }))
        }
      },
    });

    console.log(`Created field: ${createdField.title} with ${field.images.length} images`);
  }

  console.log('Seeding finished.');
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
