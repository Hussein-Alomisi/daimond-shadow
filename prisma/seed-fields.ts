import { PrismaClient } from '@prisma/client';
import { fieldsData } from '../src/lib/data/fieldsData';
import { MOCK_FIELDS } from '../src/lib/data/mockFields';

const prisma = new PrismaClient();

export async function seedFields(prisma: PrismaClient) {
  console.log('Start seeding fields...');

  for (const field of fieldsData) {
    // Find cover image from MOCK_FIELDS
    const mockField = MOCK_FIELDS.find(f => f.slug === field.slug);
    
    // Default cover image if not found in MOCK_FIELDS, try to use first gallery image or a placeholder
    const coverImage = mockField?.image || (field.images[0] ?? "/images/hero/hero-bg.gif");


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

  console.log('Fields seeding finished.');
}

