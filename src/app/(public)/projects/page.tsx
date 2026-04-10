import type { Metadata } from "next";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { ProjectsGrid } from "@/src/components/sections/ProjectsGrid";
import { MOCK_PROJECTS } from "@/src/lib/mockProjects";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description:
    "استعرض أحدث مشاريع جوهرة الظل للمقاولات العامة: مظلات، سواتر، برجولات، وإنشاءات معدنية في المنطقة الشرقية.",
};

export default function ProjectsPage() {
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
        projects={MOCK_PROJECTS}
        title="جميع مشاريعنا"
        subtitle="نفخر بتقديم حلول هندسية متطورة تلبي طموحات عملائنا"
      />
    </>
  );
}
