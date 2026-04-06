"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SITE_INFO } from "@/src/lib/constants";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20">

      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-secondary"
      >
        <Image
          src="/images/hero/hero-bg.gif"
          alt="صورة تعبيرية لموقع بناء"
          fill
          priority
          className="object-cover opacity-60    object-center"
        />
        {/* Darken the text side so the white hero copy stays readable */}
        <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(270deg,rgba(10,10,10,0.82)_0%,rgba(10,10,10,0.52)_28%,rgba(10,10,10,0.16)_52%,transparent_72%)] z-10" />
        {/* Gradient Overlay left-to-right fade & bottom-fade for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-60 via-primary/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Subheading Badge */}
          <motion.div variants={fadeIn} className="mb-6 flex items-center gap-4">
            {/* <span className="w-12 h-[2px] bg-gold block"></span> */}
            {/* <span className="text-gold font-semibold tracking-wider text-sm md:text-base">
              التميز في عالم البناء
            </span> */}
          </motion.div>

          <motion.div variants={fadeIn}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              نبني المستقبل <br className="hidden md:block" />
              {/* <span className="text-gold">بجودة وإتقان</span> */}
            </h1>
          </motion.div>

          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              {SITE_INFO.description}
            </p>
          </motion.div>

          {/* Action Area */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* <Link
                href="/projects"
                className="bg-gold text-primary px-8 py-3.5 rounded text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-gold-light hover:shadow-[0_0_30px_rgba(243,229,171,0.5)] transition-all flex items-center justify-center min-w-[160px]"
              >
                مشاريعنا
              </Link> */}
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded text-lg font-bold hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center min-w-[160px] backdrop-blur-sm"
              >
                تواصل معنا
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}

