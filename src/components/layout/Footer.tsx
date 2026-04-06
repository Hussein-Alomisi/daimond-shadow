"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ChevronLeft,
  Users,
  Eye,
  Calendar,
  Building2,
} from "lucide-react";
import { SITE_INFO, NAVIGATION_LINKS } from "@/src/lib/constants";
import { MOCK_FIELDS } from "@/src/lib/mockFields";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const footerServices = MOCK_FIELDS.map(f => ({ label: f.title, href: "/#fields-section" }));

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "خدماتنا", href: "/services" },
  { label: "مشاريعنا", href: "/projects" },
  { label: "تواصل معنا", href: "/contact" },
];

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
    value: "+966 5X XXX XXXX",
    href: "tel:+9665XXXXXXXX",
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: "تواصل معنا عبر واتساب",
    href: "https://wa.me/9665XXXXXXXX",
  },
];

const visitorStats = [
  { icon: Eye, label: "اليوم", value: "٢٤٨" },
  { icon: Calendar, label: "الأسبوع", value: "١٬٧٣٢" },
  { icon: Users, label: "الشهر", value: "٦٬٤٩١" },
];

// ─────────────────────────────────────────────
// Animation Variants
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

/** Section heading with gold accent bar */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-white font-bold text-lg tracking-wide">{children}</h3>
      <span className="block mt-2 w-10 h-0.5 bg-gradient-to-l from-[#D4AF37] to-transparent" />
    </div>
  );
}

/** Single service link item */
function FooterServiceItem({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm py-1 group"
      >
        <ChevronLeft
          size={14}
          className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors shrink-0"
        />
        {label}
      </Link>
    </li>
  );
}

// ─────────────────────────────────────────────
// Main Footer
// ─────────────────────────────────────────────
export function Footer() {
  const phoneNumber = "9665XXXXXXXX";
  const whatsappNumber = "9665XXXXXXXX";

  return (
    <>
      {/* ───── Main Footer Body ───── */}
      <footer
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #0f1520 50%, #0A0A0A 100%)",
        }}
      >
        {/* Decorative background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(212,175,55,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl pt-16 pb-10">

          {/* ── 4-Column Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

            {/* ── Column 1: Company Info ── */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Logo */}
              <div className="mb-5 flex items-center gap-2">
                <Building2 className="text-[#D4AF37]" size={28} />
                <div>
                  <p className="text-[#D4AF37] font-extrabold text-base leading-tight">
                    جواهر
                  </p>
                  <p className="text-white/70 text-xs leading-tight">
                    للمقاولات العامة
                  </p>
                </div>
              </div>

              <p className="text-white/55 text-sm leading-relaxed mb-6">
                شركة رائدة في المنطقة الشرقية بالمملكة العربية السعودية،
                متخصصة في تصميم وتنفيذ المظلات والسواتر والإنشاءات المعدنية
                بأعلى معايير الجودة وخبرة تتجاوز ١٥ عامًا.
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
                      className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-white/4 px-2 py-3 backdrop-blur-sm"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(212,175,55,0.15)",
                      }}
                    >
                      <stat.icon size={13} className="text-[#D4AF37]" />
                      <span className="text-white font-bold text-sm leading-none">
                        {stat.value}
                      </span>
                      <span className="text-white/40 text-[10px]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Column 2: Contact Info ── */}
            <motion.div
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
                      <span className="shrink-0 mt-0.5 size-8 rounded-lg flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/20 transition-colors group-hover:bg-[#D4AF37]/20">
                        <Icon size={15} className="text-[#D4AF37]" />
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
                          target={
                            item.href.startsWith("https") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("https")
                              ? "noopener noreferrer"
                              : undefined
                          }
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
            </motion.div>

            {/* ── Column 3: Services ── */}
            <motion.div
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
            </motion.div>

            {/* ── Column 4: Extra Services / Links ── */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <ColumnHeading>روابط سريعة</ColumnHeading>
              <ul className="space-y-1">
                {quickLinks.map((s) => (
                  <FooterServiceItem key={s.label} {...s} />
                ))}
              </ul>

              {/* Navigation links */}
              <div className="mt-6 pt-6 border-t border-white/8">
                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-3">
                  التنقل
                </p>
                <div className="flex flex-wrap gap-2">
                  {NAVIGATION_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors py-1 px-2 rounded border border-white/8 hover:border-[#D4AF37]/30 bg-white/3"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div
            className="mb-6"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
            }}
          />

          {/* ── Bottom Bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
            <p>© 2026 {SITE_INFO.fullName}. جميع الحقوق محفوظة.</p>
            <p>
              تصميم وتطوير بمعايير{" "}
              <span className="text-[#D4AF37]/70">احترافية عالية</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ───── Floating Action Buttons ───── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 260 }}
          className="group relative flex items-center justify-center size-14 rounded-full shadow-xl"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
          }}
        >
          {/* Ping animation */}
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-25" />
          <svg
            viewBox="0 0 24 24"
            className="relative size-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          {/* Tooltip */}
          <span className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            واتساب
          </span>
        </motion.a>

        {/* Phone */}
        <motion.a
          href={`tel:+${phoneNumber}`}
          aria-label="اتصل بنا"
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 260 }}
          className="group relative flex items-center justify-center size-14 rounded-full shadow-xl"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
            boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
          }}
        >
          <Phone size={22} className="relative text-white" />
          {/* Tooltip */}
          <span className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            اتصل بنا
          </span>
        </motion.a>
      </div>
    </>
  );
}
