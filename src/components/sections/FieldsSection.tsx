"use client";

import { motion, Variants } from "framer-motion";
import { FieldCard } from "../ui/FieldCard";
import { MOCK_FIELDS } from "@/src/lib/mockFields";
import { CheckCircle2 } from "lucide-react";

const textVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const textBullets = [
  "تنفيذ مشاريع البناء السكنية والتجارية",
  "أعمال القرميد والتشطيبات الخارجية",
  "ترميم وتأهيل المباني",
  "عوازل الأسطح بأحدث التقنيات",
  "تركيب السواتر والبرجولات",
  "حلول الساندوتش بانل الحديثة"
];

export function FieldsSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-secondary/20 to-background"
      id="fields-section"
    >
      <div className="container mx-auto max-w-7xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Right Side: Text Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col h-full justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-gold rounded block"></span>
              <span className="text-gold font-semibold tracking-wider text-sm md:text-base">
                نطاق أعمالنا
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
              مجالاتنا
            </h2>

            <p className="text-foreground/80 text-lg leading-relaxed mb-10">
              نقدم في <span className="text-gold font-semibold">تشييد القوى للمقاولات</span> مجموعة متكاملة ومترابطة من الحلول في قطاع البناء والتشييد. نعتمد على خبرات هندسية متقدمة لتوفير تنفيذ دقيق عالي الجودة يلبي احتياجات الأسواق السكنية والتجارية على حد سواء، مع التزامنا الدائم بالابتكار والاستدامة.
            </p>

            <div className="flex flex-col gap-5">
              {textBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-gold/80 transition-transform group-hover:scale-110 group-hover:text-gold" />
                  </div>
                  <span className="text-foreground/90 font-medium text-lg leading-snug">
                    {/* Highlight dynamic words visually using regex split or simply rendering */}
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Action button directly engaging user */}
            <div className="mt-12">
              <button className="bg-transparent border-2 border-gold text-foreground px-8 py-3 rounded text-lg font-bold hover:bg-gold hover:text-black transition-all">
                تعرف أكثر على خبراتنا
              </button>
            </div>
          </motion.div>


          {/* Left Side: Images Grid */}
          <div className="relative">
            {/* Optional decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 relative z-10"
            >
              {MOCK_FIELDS.map((field) => (
                <FieldCard key={field.id} field={field} variants={cardReveal} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
