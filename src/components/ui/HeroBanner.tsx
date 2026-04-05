"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroBannerProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
  backgroundImage: string;
  overlayOpacity?: number; // 0 to 100, default 70
}

export function HeroBanner({
  title,
  subtitle,
  breadcrumb,
  backgroundImage,
  overlayOpacity = 75,
}: HeroBannerProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={backgroundImage}
          alt="Banner Background"
          fill
          priority
          className="object-cover"
        />
        {/* Dark Overlay with Blur/Vignette Effect */}
        <div 
          className="absolute inset-0 bg-primary/90" 
          style={{ opacity: overlayOpacity / 100 }}
        />
        {/* Linear Gradient for Cinematic Look */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center text-center mt-12 md:mt-16">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-wide"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl font-medium mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Breadcrumb Menu */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex items-center gap-2 text-sm md:text-base font-semibold"
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;

              return (
                <div key={index} className="flex items-center gap-2">
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-gold transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gold cursor-default">
                      {item.label}
                    </span>
                  )}
                  
                  {!isLast && (
                    <ChevronLeft className="w-4 h-4 text-white/50" />
                  )}
                </div>
              );
            })}
          </motion.nav>
        )}
      </div>
      
      {/* Decorative Golden Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent origin-center opacity-50"
      />
    </section>
  );
}
