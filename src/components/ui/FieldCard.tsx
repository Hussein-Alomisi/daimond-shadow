import Image from "next/image";
import { MotionDiv } from "./MotionDiv";
import { WorkField } from "@/src/lib/mockFields";
import type { Variants } from "framer-motion";

interface FieldCardProps {
  field: WorkField;
  variants?: Variants;
}

export function FieldCard({ field, variants }: FieldCardProps) {
  return (
    <MotionDiv
      variants={variants}
      className="group relative h-[250px] md:h-[280px] w-full overflow-hidden rounded-xl bg-secondary cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] border border-transparent hover:border-gold/50"
    >
      {/* Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
      >
        <Image
          src={field.image}
          alt={`خدمة ${field.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent transition-all duration-500 ease-out group-hover:from-primary group-hover:via-primary/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-overlay"
      />

      {/* Title */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white/90 drop-shadow-md transition-all duration-500 ease-out group-hover:text-gold-light group-hover:-translate-y-1">
          {field.title}
        </h3>
        <div
          aria-hidden="true"
          className="w-0 h-[2px] bg-gold mt-3 rounded-full transition-all duration-500 ease-out group-hover:w-8"
        />
      </div>
    </MotionDiv>
  );
}
