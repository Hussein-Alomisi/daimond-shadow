import type { Metadata } from "next";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { ProjectsGrid } from "@/src/components/sections/ProjectsGrid";
import { getProjects } from "@/src/server/projects/project.service";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description:
    "استعرض أحدث مشاريع جوهرة الظل للمقاولات العامة: مظلات، سواتر، برجولات، وإنشاءات معدنية في المنطقة الشرقية.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <HeroBanner
        title="مشاريعنا"
        subtitle="نماذج من أعمالنا المنجزة في المنطقة الشرقية وما جاورها"
        backgroundImage="/images/hero/about-bg.jpg"
        backgroundImageAlt="مشاريع جوهرة الظل للمقاولات العامة"
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "مشاريعنا" },
        ]}
      />
      <ProjectsGrid
        projects={projects}
        title="جميع مشاريعنا"
        subtitle="نفخر بتقديم حلول هندسية متطورة تلبي طموحات عملائنا"
      />
    </>
  );
}

