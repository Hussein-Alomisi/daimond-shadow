import type { Metadata } from "next";
import { SITE_INFO } from "@/src/lib/constants";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { AboutSection } from "@/src/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعرف على ${SITE_INFO.name} — خبرة تزيد عن 15 عاماً في المنطقة الشرقية في مجال المظلات والسواتر والمقاولات العامة.`,
};

export default function AboutPage() {
  return (
    <>
      <HeroBanner
        title="من نحن"
        subtitle="شركاؤكم في البناء والإبداع منذ أكثر من 15 عاماً"
        backgroundImage="/images/hero/about-bg.jpg"
        backgroundImageAlt="موقع بناء - جوهرة الظل للمقاولات"
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "من نحن" },
        ]}
      />
      <AboutSection />
    </>
  );
}
