"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_LINKS } from "@/src/lib/config/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      if (pathname === "/") {
        const sections = NAVIGATION_LINKS
          .map(link => link.href.split("#")[1])
          .filter(Boolean);

        let currentSection = "";
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the section is in the top 40% of the viewport
            if (rect.top <= 150) {
              currentSection = sectionId;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      return pathname === "/" && activeSection === id;
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b font-cairo ${scrolled
          ? "bg-primary/95 border-gold/20 py-3 shadow-lg shadow-black/50 backdrop-blur-md"
          : "bg-black/40 backdrop-blur-md border-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/#hero-section"
              className="text-xl md:text-2xl font-black font-cairo text-white hover:text-gold transition-colors duration-300 leading-tight"
            >
              جوهرة الظل<span className="text-gold block text-sm font-bold">للمقاولات العامة</span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="التنقل الرئيسي" className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-lg whitespace-nowrap font-bold transition-all duration-300 relative group py-1 ${isActive ? "text-gold" : "text-white/80 hover:text-gold"
                      }`}
                  >
                    {link.label}
                    <motion.span
                      layoutId="nav-underline"
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
                className="bg-gold text-primary px-7 py-3 rounded-lg text-lg font-bold shadow-lg shadow-gold/20 hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300"
              >
                اطلب عرض سعر
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white/90 hover:text-gold transition-colors p-2"
              aria-label="افتخ قائمة التنقل"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-primary border-l border-gold/20 z-[60] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-xl font-black text-white leading-tight">
                  جوهرة الظلل<br /><span className="text-gold text-sm">للمقاولات</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="text-white/70 hover:text-gold p-2 rounded-full bg-white/5 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col p-6 gap-2 overflow-y-auto">
                {NAVIGATION_LINKS.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-bold py-4 px-4 rounded-xl transition-all ${isActive
                        ? "bg-gold/10 text-gold shadow-sm"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center bg-gold text-primary px-6 py-4 rounded-xl font-black shadow-lg shadow-gold/20 hover:bg-gold-light transition-transform active:scale-95"
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

