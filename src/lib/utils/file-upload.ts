import { writeFile } from "fs/promises";
import path from "path";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function saveImage(file: File): Promise<string> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Only JPEG, PNG, and WebP are allowed.`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 2MB limit.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean filename to prevent weird characters
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
  const uniqueName = `project-${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public/images/projects");
  const filePath = path.join(uploadDir, uniqueName);

  await writeFile(filePath, buffer);

  // Return the path relative to the public directory
  return `/images/projects/${uniqueName}`;
}
