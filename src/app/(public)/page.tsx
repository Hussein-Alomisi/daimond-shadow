import { Hero } from "@/src/components/sections/Hero";
import { AboutSection } from "@/src/components/sections/AboutSection";
import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { FieldsSection } from "@/src/components/sections/FieldsSection";
import { ProjectsGrid } from "@/src/components/sections/ProjectsGrid";
import { MOCK_PROJECTS } from "@/src/lib/mockData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الرئيسية | جواهر للمقاولات العامة",
  description: "شركة جواهر للمقاولات العامة - ريادة وتحفيز في عالم البناء والتشييد. نقدم خدمات المقاولات العامة، المظلات، والسواتر بأعلى جودة في المنطقة الشرقية.",
};

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
