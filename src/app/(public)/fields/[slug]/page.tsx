import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getFieldBySlug, fieldsData } from "@/src/lib/fieldsData";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { ProjectsGrid } from "@/src/components/sections/ProjectsGrid";
import { SITE_INFO } from "@/src/lib/constants";
import type { ProjectSummary } from "@/src/models/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const field = getFieldBySlug(resolvedParams.slug);

  if (!field) {
    return {
      title: "غير موجود",
    };
  }

  return {
    title: `${field.title} | ${SITE_INFO.name}`,
    description: field.description,
  };
}

export async function generateStaticParams() {
  return fieldsData.map((field) => ({
    slug: field.slug,
  }));
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const field = getFieldBySlug(resolvedParams.slug);

  if (!field) {
    notFound();
  }

  // Map field images to the Project interface so we can seamlessly reuse the existing ProjectsGrid!
  const mappedProjects: ProjectSummary[] = field.images.map((img, index) => ({
    id: `${field.slug}-${index}`,
    title: `نموذج ${field.title} ${index + 1}`,
    category: field.title,
    image: img,
  }));

  return (
    <>
      <HeroBanner
        title={field.title}
        subtitle={field.description}
        backgroundImage={field.images[0] || "/images/hero/hero-bg.jpg"}
        backgroundImageAlt={field.title}
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "المجالات", href: "/#fields-section" },
          { label: field.title },
        ]}
      />

      <section className="py-24 px-6 bg-primary relative overflow-hidden" id="field-description">
        {/* Subtle decorative background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/40 to-primary pointer-events-none"
        />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-gold rounded block" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">نبذة عن {field.title}</h2>
            <span className="w-12 h-[2px] bg-gold rounded block" />
          </div>
          <p className="text-white/80 text-xl leading-relaxed mt-8 font-medium">
            {field.description}
          </p>
        </div>
      </section>

      {mappedProjects.length > 0 && (
        <ProjectsGrid
          projects={mappedProjects}
          title={`معرض صور ${field.title}`}
          subtitle={`تصفح أحدث وأفضل المشاريع التي نفذناها في مجال ${field.title}`}
        />
      )}
    </>
  );
}

