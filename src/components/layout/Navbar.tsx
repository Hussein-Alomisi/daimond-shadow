"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_LINKS, SITE_INFO } from "@/src/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b font-cairo ${scrolled
          ? "bg-primary border-gold/20 py-4 shadow-lg shadow-black/50"
          : "bg-black/40 backdrop-blur-md border-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold font-cairo text-white hover:text-gold transition-colors duration-300 leading-tight"
            >
              جوهرة الظل للمقاولات<br />العامة
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="التنقل الرئيسي" className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm whitespace-nowrap font-medium transition-all duration-300 relative group py-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${isActive ? "text-gold" : "text-white/90 hover:text-gold"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className="bg-gold text-primary px-6 py-2.5 rounded text-sm font-bold shadow-lg shadow-gold/20 hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300"
              >
                اطلب عرض سعر
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white/90 hover:text-gold transition-colors p-2"
              aria-label="Open Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-primary border-l border-gold/20 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-xl font-bold text-gold leading-tight">
                  جوهرة الظل للمقاولات<br />العامة
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col p-6 gap-6 overflow-y-auto">
                {NAVIGATION_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${isActive ? "text-gold" : "text-white/90 hover:text-gold"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 pt-6 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center bg-gold text-primary px-6 py-3 rounded font-bold shadow-lg shadow-gold/20 hover:bg-gold-light transition-colors"
                  >
                    اطلب عرض سعر
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
