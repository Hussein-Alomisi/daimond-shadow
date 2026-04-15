import { Hero } from "@/src/components/sections/Hero";
import { AboutSection } from "@/src/components/sections/AboutSection";
import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { FieldsSection } from "@/src/components/sections/FieldsSection";
import { ProjectsGrid } from "@/src/components/sections/ProjectsGrid";
import { VisionMissionSection } from "@/src/components/sections/VisionMissionSection";
import { WhyChooseUsSection } from "@/src/components/sections/WhyChooseUsSection";
import { getProjects } from "@/src/server/projects/project.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الرئيسية | جوهرة الظل للمقاولات العامة",
  description: "شركة جوهرة الظل للمقاولات العامة - ريادة وتحفيز في عالم البناء والتشييد. نقدم خدمات المقاولات العامة، المظلات، والسواتر بأعلى جودة في المنطقة الشرقية.",
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <FieldsSection />
      <AboutSection />
      <ServicesSection />
      <VisionMissionSection />
      <ProjectsGrid projects={projects} />
      <WhyChooseUsSection />
    </>
  );
}

