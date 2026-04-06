"use client";

import { motion, Variants } from "framer-motion";
import { FieldCard } from "../ui/FieldCard";
import { MOCK_FIELDS } from "@/src/lib/mockFields";
import { SITE_INFO } from "@/src/lib/constants";
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
  "حلول الساندوتش بانل الحديثة",
  "تصميم وتركيب المظلات",
  "تصميم وتركيب هناجر",

];

export function FieldsSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-secondary/20 to-background"
      id="fields-section"
    >
      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Main Grid Wrapper - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">

          {/* 1. TEXT CONTENT - SPANS 2x2 ON THE RIGHT (In RTL) */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 bg-secondary/30 p-8 md:p-10 rounded-2xl border border-black/20 backdrop-blur-md flex flex-col justify-center shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-gold rounded block"></span>
              <span className="text-gold font-bold tracking-wider text-sm md:text-base font-cairo">
                نطاق أعمالنا
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-6 font-cairo">
              مجالاتنا
            </h2>

            <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-8 font-cairo">
              نحن في <span className="text-gold font-bold">{SITE_INFO.name}</span> نحول المساحات إلى لوحات فنية تجمع بين الصلابة والجمال، لنقدم لكم تجربة فريدة في عالم البناء والتصميم.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-foreground/80 font-bold text-sm md:text-base font-cairo">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2. TOP ROW - LEFT FLANK (Images 0 and 1) */}
          <div className="order-2">
            <FieldCard field={MOCK_FIELDS[0]} variants={cardReveal} />
          </div>
          <div className="order-3">
            <FieldCard field={MOCK_FIELDS[1]} variants={cardReveal} />
          </div>

          {/* 3. SECOND ROW - LEFT FLANK (Images 2 and 3) */}
          <div className="order-4">
            <FieldCard field={MOCK_FIELDS[2]} variants={cardReveal} />
          </div>
          <div className="order-5">
            <FieldCard field={MOCK_FIELDS[3]} variants={cardReveal} />
          </div>

          {/* 4. THIRD ROW - FULL WIDTH (Images 4, 5, 6, 7) */}
          <div className="order-6">
            <FieldCard field={MOCK_FIELDS[4]} variants={cardReveal} />
          </div>
          <div className="order-7">
            <FieldCard field={MOCK_FIELDS[5]} variants={cardReveal} />
          </div>
          <div className="order-8">
            <FieldCard field={MOCK_FIELDS[6]} variants={cardReveal} />
          </div>
          <div className="order-9">
            <FieldCard field={MOCK_FIELDS[7]} variants={cardReveal} />
          </div>

        </div>
      </div>
    </section>
  );
}
