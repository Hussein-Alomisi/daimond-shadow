"use client";

import { MotionDiv } from "../ui/MotionDiv";
import Link from "next/link";
import {
  MapPin, Mail, Phone, MessageCircle,
  ChevronLeft, Users, Eye, Calendar, Building2,
} from "lucide-react";
import { SITE_INFO, NAVIGATION_LINKS, QUICK_LINKS } from "@/src/lib/constants";
import { MOCK_FIELDS } from "@/src/lib/mockFields";

import type { Transition } from "framer-motion";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const footerServices = MOCK_FIELDS.map((f) => ({
  label: f.title,
  href: "/#fields-section",
}));

const contactInfo = [
  {
    icon: MapPin,
    label: "الموقع",
    value: "المملكة العربية السعودية، المنطقة الشرقية",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "info@tashyed-alqwa.com",
    href: "mailto:info@tashyed-alqwa.com",
  },
  {
    icon: Phone,
    label: "الهاتف",
    value: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+966 5X XXX XXXX",
    href: `tel:+${process.env.NEXT_PUBLIC_PHONE_NUMBER || "9665XXXXXXXX"}`,
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: "تواصل معنا عبر واتساب",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9665XXXXXXXX"}`,
  },
];

const visitorStats = [
  { icon: Eye, label: "اليوم", value: "٢٤٨" },
  { icon: Calendar, label: "الأسبوع", value: "١٬٧٣٢" },
  { icon: Users, label: "الشهر", value: "٦٬٤٩١" },
];

// ─────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────
const _ease: Transition["ease"] = "easeOut";
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: _ease, delay: i * 0.1 },
  }),
};

// ─────────────────────────────────────────────
// Sub-Components
// ─────────────────────────────────────────────
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-white font-bold text-lg tracking-wide">{children}</h3>
      <span aria-hidden="true" className="block mt-2 w-10 h-0.5 bg-gradient-to-l from-[#D4AF37] to-transparent" />
    </div>
  );
}

function FooterServiceItem({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors duration-300 text-sm py-1 group"
      >
        <ChevronLeft
          size={14}
          aria-hidden="true"
          className="text-gold/50 group-hover:text-gold transition-colors shrink-0"
        />
        {label}
      </Link>
    </li>
  );
}

// ─────────────────────────────────────────────
// Main Footer (Server Component)
// ─────────────────────────────────────────────
export function Footer() {
  return (
    <>
      {/* ── Main Footer Body ── */}
      <footer
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0A0A0A 0%, #0f1520 50%, #0A0A0A 100%)",
        }}
      >
        {/* Decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(212,175,55,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl pt-16 pb-10">

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

            {/* Column 1: Company Info */}
            <MotionDiv
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Building2 className="text-gold" size={28} aria-hidden="true" />
                <div>
                  <p className="text-gold font-extrabold text-base leading-tight">جوهرة الظل</p>
                  <p className="text-white/70 text-xs leading-tight">للمقاولات العامة</p>
                </div>
              </div>

              <p className="text-white/55 text-sm leading-relaxed mb-6">
                شركة رائدة في المنطقة الشرقية بالمملكة العربية السعودية، متخصصة في تصميم
                وتنفيذ المظلات والسواتر والإنشاءات المعدنية بأعلى معايير الجودة وخبرة تتجاوز
                ١٥ عامًا.
              </p>

              {/* Visitor Stats */}
              <div>
                <p className="text-white/40 text-xs mb-3 font-medium uppercase tracking-widest">
                  إحصاءات الزوار
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {visitorStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center gap-1 rounded-lg px-2 py-3 backdrop-blur-sm"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(212,175,55,0.15)",
                      }}
                    >
                      <stat.icon size={13} className="text-gold" aria-hidden="true" />
                      <span className="text-white font-bold text-sm leading-none">{stat.value}</span>
                      <span className="text-white/40 text-[10px]">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>

            {/* Column 2: Contact Info */}
            <MotionDiv
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <ColumnHeading>معلومات التواصل</ColumnHeading>
              <ul className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-3 group">
                      <span className="shrink-0 mt-0.5 size-8 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/20 transition-colors group-hover:bg-gold/20">
                        <Icon size={15} className="text-gold" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-white/35 text-[10px] uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-white/70 text-sm leading-snug group-hover:text-white/90 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("https") ? "_blank" : undefined}
                          rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </MotionDiv>

            {/* Column 3: Services */}
            <MotionDiv
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <ColumnHeading>خدماتنا</ColumnHeading>
              <ul className="space-y-1">
                {footerServices.map((s) => (
                  <FooterServiceItem key={s.label} {...s} />
                ))}
              </ul>
            </MotionDiv>

            {/* Column 4: Quick Links */}
            <MotionDiv
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <ColumnHeading>روابط سريعة</ColumnHeading>
              {/* Page links — sourced from QUICK_LINKS (single source of truth) */}
              <ul className="space-y-1">
                {QUICK_LINKS.map((s) => (
                  <FooterServiceItem key={s.label} {...s} />
                ))}
              </ul>

              {/* Navigation pills */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-3">
                  التنقل
                </p>
                <div className="flex flex-wrap gap-2">
                  {NAVIGATION_LINKS.map((link) => (
                    <Link
                      key={`nav-${link.href}-${link.label}`}
                      href={link.href}
                      className="text-xs text-white/50 hover:text-gold transition-colors py-1 px-2 rounded border border-white/10 hover:border-gold/30"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="mb-6"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
            }}
          />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
            <p>© 2026 {SITE_INFO.fullName}. جميع الحقوق محفوظة.</p>
            <p>
              تصميم وتطوير بمعايير{" "}
              <span className="text-gold/70">احترافية عالية</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

