import type { Metadata } from "next";
import { HeroBanner } from "@/src/components/ui/HeroBanner";
import { SITE_INFO } from "@/src/lib/constants";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: `تواصل مع ${SITE_INFO.name} للحصول على عرض سعر مجاني. نحن في خدمتكم في المنطقة الشرقية، المملكة العربية السعودية.`,
};

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
    value: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+966 5X XXX XXXX",
    href: `tel:+${process.env.NEXT_PUBLIC_PHONE_NUMBER || "9665XXXXXXXX"}`,
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: "info@tashyed-alqwa.com",
    href: "mailto:info@tashyed-alqwa.com",
  },
  {
    icon: MessageCircle,
    title: "واتساب",
    value: "تواصل معنا عبر واتساب",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9665XXXXXXXX"}`,
  },
];

export default function ContactPage() {
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
            <div
              className="rounded-2xl border border-gold/20 p-8 md:p-10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">اطلب عرض سعر مجاني</h3>
              <p className="text-white/50 text-sm mb-8">
                أرسل لنا تفاصيل مشروعك وسنتواصل معك خلال 24 ساعة.
              </p>

              <form
                action="https://formspree.io/f/xyzgkpqr"
                method="POST"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-white/60 text-sm mb-2">
                      الاسم الكامل <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="محمد أحمد"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white/60 text-sm mb-2">
                      رقم الجوال <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-white/60 text-sm mb-2">
                    نوع الخدمة
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="" className="bg-neutral-900">اختر الخدمة</option>
                    <option value="مظلات" className="bg-neutral-900">مظلات</option>
                    <option value="سواتر" className="bg-neutral-900">سواتر</option>
                    <option value="برجولات" className="bg-neutral-900">برجولات</option>
                    <option value="قرميد" className="bg-neutral-900">قرميد</option>
                    <option value="ترميمات" className="bg-neutral-900">ترميمات</option>
                    <option value="عوازل أسطح" className="bg-neutral-900">عوازل أسطح</option>
                    <option value="ساندوتش بانل" className="bg-neutral-900">ساندوتش بانل</option>
                    <option value="مقاول بناء" className="bg-neutral-900">مقاول بناء</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/60 text-sm mb-2">
                    تفاصيل المشروع
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="اكتب تفاصيل مشروعك هنا..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-primary font-bold py-3.5 rounded-lg shadow-lg shadow-gold/20 hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300"
                >
                  إرسال الطلب
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
