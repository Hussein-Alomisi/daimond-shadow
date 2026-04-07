import type { Metadata } from "next";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { ServicesSection } from "@/src/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "استكشف خدمات جوهرة الظل للمقاولات العامة: مظلات، سواتر، برجولات، قرميد، ترميمات، عوازل أسطح، وساندوتش بانل بأعلى معايير الجودة.",
};

export default function ServicesPage() {
  return (
    <>
      <HeroBanner
        title="خدماتنا"
        subtitle="مجموعة متكاملة من الحلول الإنشائية بأعلى معايير الجودة"
        backgroundImage="/images/hero/about-bg.jpg"
        backgroundImageAlt="خدمات جوهرة الظل للمقاولات العامة"
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "خدماتنا" },
        ]}
      />
      <ServicesSection />
    </>
  );
}
