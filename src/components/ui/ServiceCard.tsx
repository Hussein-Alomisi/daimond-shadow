"use client";

import { motion, Variants } from "framer-motion";
import { Service } from "@/src/lib/mockServices";

interface ServiceCardProps {
  service: Service;
  variants?: Variants;
}

export function ServiceCard({ service, variants }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={variants}
      className="group relative bg-secondary border border-gold/10 rounded-xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col items-center md:items-start text-center md:text-start"
    >
      {/* Icon Area */}
      <div className="mb-6 w-16 h-16 rounded-full bg-primary/40 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-gold/30">
        <Icon
          className="w-8 h-8 text-white/50 transition-colors duration-500 group-hover:text-gold"
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-4 leading-snug transition-colors duration-500 group-hover:text-gold-light">
        {service.title}
      </h3>

      <p className="text-white/70 leading-relaxed text-base">
        {service.description}
      </p>

      {/* Hover Line Highlight */}
      <div className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-0 h-[2px] bg-gold rounded transition-all duration-500 ease-out group-hover:w-1/2" />
    </motion.div>
  );
}
