import { Hero } from "@/src/components/sections/Hero";
import { AboutSection } from "@/src/components/sections/AboutSection";
import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { FieldsSection } from "@/src/components/sections/FieldsSection";
import { ProjectsGrid } from "@/src/components/sections/ProjectsGrid";
import { MOCK_PROJECTS } from "@/src/lib/mockData";

export default function Home() {
  return (
    <>
      <Hero />
      <FieldsSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsGrid projects={MOCK_PROJECTS} />
    </>
  );
}
