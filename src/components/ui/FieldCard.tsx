import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "./MotionDiv";
import type { FieldSummary } from "@/src/models/fields/field";
import type { Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface FieldCardProps {
  field: FieldSummary;
  variants?: Variants;
}

export function FieldCard({ field, variants }: FieldCardProps) {
  return (
    <Link
      href={`/fields/${field.slug}`}
      aria-label={`تصفح أعمال ${field.title}`}
      className="block w-full h-full"
    >
      <MotionDiv
        variants={variants}
        className="group relative h-[250px] md:h-[280px] w-full overflow-hidden rounded-xl bg-secondary cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 hover:border-gold/50"
      >
        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
        >
          <Image
            src={field.coverImage}
            alt={`خدمة ${field.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 ease-out group-hover:from-primary/95 group-hover:via-primary/80"
        />

        {/* Shine Effect */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-overlay"
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
          <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg transition-all duration-500 ease-out group-hover:text-gold group-hover:-translate-y-6">
            {field.title}
          </h3>

          <div
            aria-hidden="true"
            className="w-0 h-[2px] bg-gold mt-2 rounded-full transition-all duration-500 ease-out group-hover:w-12 group-hover:-translate-y-6"
          />

          {/* Action Prompt (Visible on Hover) */}
          <div className="absolute bottom-6 flex items-center gap-2 text-white/90 font-bold text-sm opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
            <span>تصفح الأعمال</span>
            <ArrowLeft size={16} className="text-gold" />
          </div>
        </div>
      </MotionDiv>
    </Link>
  );
}
