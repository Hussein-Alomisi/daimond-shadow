import type { Metadata } from "next";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { SITE_INFO } from "@/src/lib/config/constants";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { getSocialSettings } from "@/src/modules/social/social.service";
import { ContactForm } from "@/src/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: `تواصل مع ${SITE_INFO.name} للحصول على عرض سعر مجاني. نحن في خدمتكم في المنطقة الشرقية، المملكة العربية السعودية.`,
};

export default async function ContactPage() {
  const socialSettings = await getSocialSettings();

  const contactDetails = [
    {
      icon: MapPin,
      title: "الموقع",
      value: "المملكة العربية السعودية، المنطقة الشرقية",
      href: undefined,
    },
    {
      icon: Phone,
      title: "الهاتف",
      value: socialSettings.phone || "+966 5X XXX XXXX",
      href: `tel:+${socialSettings.phone || "9665XXXXXXXX"}`,
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: socialSettings.email || "info@tashyed-alqwa.com",
      href: `mailto:${socialSettings.email || "info@tashyed-alqwa.com"}`,
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      value: "تواصل معنا عبر واتساب",
      href: `https://wa.me/${socialSettings.whatsapp || "9665XXXXXXXX"}`,
    },
  ];

  return (
    <>
      <HeroBanner
        title="تواصل معنا"
        subtitle="نحن هنا لمساعدتكم — اطلب عرض سعر مجاني الآن"
        backgroundImage="/images/hero/about-bg.jpg"
        backgroundImageAlt="تواصل مع جوهرة الظل للمقاولات العامة"
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل معنا" },
        ]}
      />

      <section className="py-24 px-6 bg-primary relative overflow-hidden" id="contact-section">
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Contact Info ── */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-gold rounded block" />
                <span className="text-gold font-semibold tracking-wider text-sm">
                  معلومات التواصل
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                دعنا نبني معاً
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-10">
                يسعدنا الاستماع إليكم. تواصلوا معنا عبر أي من القنوات التالية وسيرد عليكم
                فريقنا المتخصص في أقرب وقت ممكن.
              </p>

              <ul className="space-y-6">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 group">
                      <span className="shrink-0 mt-0.5 w-11 h-11 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/20 transition-colors group-hover:bg-gold/20">
                        <Icon size={18} className="text-gold" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          {item.title}
                        </p>
                        <p className="text-white/80 font-medium group-hover:text-white transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={item.title}>
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
            </div>

            {/* ── Request Form ── */}
            <ContactForm />

          </div>
        </div>
      </section>
    </>
  );
}
