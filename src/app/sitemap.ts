import { MetadataRoute } from "next";
import { getFields } from "@/src/modules/fields/field.service";
import { getProjects } from "@/src/modules/projects/project.service";

const STATIC_ROUTES = ["", "/about", "/services", "/projects", "/contact"];

function getBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://tashyed-alqwa.com").replace(/\/+$/, "");
}

function buildSitemapEntry(url: string, lastModified: Date): MetadataRoute.Sitemap[number] {
  return {
    url,
    lastModified,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const [fields, projects] = await Promise.all([getFields(), getProjects()]);
  const lastModified = new Date();

  const fieldRoutes = fields
    .map((field) => field.slug?.trim())
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => `/fields/${slug}`);

  const projectRoutes = projects
    .map((project) => {
      const slug = "slug" in project && typeof project.slug === "string" ? project.slug.trim() : "";
      const segment = slug || project.id?.trim();

      if (!segment) {
        return null;
      }

      return `/projects/${segment}`;
    })
    .filter((route): route is string => Boolean(route));

  const seenUrls = new Set<string>();
  const allRoutes = [...STATIC_ROUTES, ...fieldRoutes, ...projectRoutes];

  return allRoutes
    .map((route) => `${baseUrl}${route}`)
    .filter((url) => {
      if (seenUrls.has(url)) {
        return false;
      }

      seenUrls.add(url);
      return true;
    })
    .map((url) => buildSitemapEntry(url, lastModified));
}
