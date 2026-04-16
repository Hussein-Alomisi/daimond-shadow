import { MotionDiv } from "../ui/MotionDiv";
import { ServiceCard } from "../ui/ServiceCard";
import { getServices } from "@/src/modules/services/service.service";
import type { Variants } from "framer-motion";

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export async function ServicesSection() {
  const services = await getServices();

  return (
    <section
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-background to-secondary/30"
      id="services-section"
    >
      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="w-12 h-px bg-gold" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">خدماتنا</h2>
            <span aria-hidden="true" className="w-12 h-px bg-gold" />
          </div>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            نقدم مجموعة متكاملة من خدمات البناء والتشييد بأعلى معايير الجودة والإتقان لضمان
            تحقيق رؤيتك وفق أفضل الممارسات الهندسية.
          </p>
        </MotionDiv>

        {/* CSS Grid */}
        <MotionDiv
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variants={cardReveal} />
          ))}
        </MotionDiv>

      </div>
    </section>
  );
}
