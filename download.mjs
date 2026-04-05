import fs from 'fs/promises';
import path from 'path';

const basePath = path.join(process.cwd(), 'public', 'images');

const dirs = ['projects', 'services', 'fields', 'hero'];

async function init() {
  // Create dirs
  for (const dir of dirs) {
    await fs.mkdir(path.join(basePath, dir), { recursive: true });
  }

  // downloads
  const downloads = [
    { url: 'https://images.unsplash.com/photo-1541888086225-f6740b9de6ad?q=80&w=2600&auto=format&fit=crop', dest: 'hero/hero-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2671&auto=format&fit=crop', dest: 'hero/about-bg.jpg' },
    // projects
    { url: 'https://images.unsplash.com/photo-1577983058863-71822c9ea9ee?q=80&w=2670&auto=format&fit=crop', dest: 'projects/project-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop', dest: 'projects/project-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1587560699334-bea5356ac8ce?q=80&w=2670&auto=format&fit=crop', dest: 'projects/project-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2677&auto=format&fit=crop', dest: 'projects/project-4.jpg' },
    { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop', dest: 'projects/project-5.jpg' },
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop', dest: 'projects/project-6.jpg' },
    // fields
    { url: 'https://images.unsplash.com/photo-1541888086225-f6740b9de6ad?q=80&w=2600&auto=format&fit=crop', dest: 'fields/field-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1596706798031-bb969ce7edb7?q=80&w=2670&auto=format&fit=crop', dest: 'fields/field-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2671&auto=format&fit=crop', dest: 'fields/field-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1589718429402-53b02ce3f46f?q=80&w=2670&auto=format&fit=crop', dest: 'fields/field-4.jpg' },
    { url: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?q=80&w=2670&auto=format&fit=crop', dest: 'fields/field-5.jpg' },
    { url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2672&auto=format&fit=crop', dest: 'fields/field-6.jpg' },
    { url: 'https://images.unsplash.com/photo-1599813580552-32a220267cb4?q=80&w=2670&auto=format&fit=crop', dest: 'fields/field-7.jpg' }
  ];

  for (const d of downloads) {
    try {
      console.log(`Downloading ${d.dest}...`);
      const res = await fetch(d.url);
      const buffer = await res.arrayBuffer();
      await fs.writeFile(path.join(basePath, d.dest), Buffer.from(buffer));
      console.log(`Saved ${d.dest}`);
    } catch(err) {
      console.error(`Error with ${d.dest}`, err);
    }
  }
}

init();
