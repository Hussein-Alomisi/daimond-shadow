"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const imageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  }),
};

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(-1); // In RTL, next comes from the left
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    setDirection(1); // In RTL, prev comes from the right
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 z-[110] p-3 text-white/70 hover:text-gold transition-colors duration-300 bg-white/5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl"
            aria-label="إغلاق المعرض"
          >
            <X size={28} />
          </button>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pointer-events-auto p-4 md:p-5 text-white/50 hover:text-gold transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 group shadow-lg"
              aria-label="الصورة السابقة"
            >
              <ChevronRight
                size={36}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto p-4 md:p-5 text-white/50 hover:text-gold transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 group shadow-lg"
              aria-label="الصورة التالية"
            >
              <ChevronLeft
                size={36}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[110] px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white/90 font-bold tracking-[0.2em] shadow-2xl flex gap-2 items-center">
            <span className="text-gold">{currentIndex + 1}</span>
            <span className="opacity-40">/</span>
            <span>{images.length}</span>
          </div>

          {/* Image Container */}
          <div 
            className="relative w-full h-[80vh] max-w-7xl px-4 md:px-20 flex items-center justify-center pointer-events-none select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                  if (swipe) {
                    // In RTL: Swipe LEFT (negative x) -> Prev, Swipe RIGHT (positive x) -> Next
                    // But usually swipe direction is "pushing" the current image.
                    // Let's use standard: offset.x > 100 means we pulled it to the right -> show image to the left.
                    if (offset.x > 0) {
                      handleNext(); // In RTL, Next is to the left, so pulling right reveals it? No.
                      // Let's stick to what feels natural:
                      // Pulling Right -> Previous (index - 1)
                      // Pulling Left -> Next (index + 1)
                    } else {
                      handlePrev();
                    }
                  }
                }}
                className="relative w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`صورة المشروع ${currentIndex + 1}`}
                  fill
                  priority
                  draggable={false}
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
