import { MotionDiv } from "../ui/MotionDiv";
import { Award, ShieldCheck, Layers, Wallet, Clock, Palette } from "lucide-react";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const features = [
  {
    icon: Award,
    title: "خبرة طويلة",
    description: "في تنفيذ أعمال المظلات والسواتر",
  },
  {
    icon: ShieldCheck,
    title: "تنفيذ احترافي",
    description: "وفق أعلى معايير الجودة والدقة",
  },
  {
    icon: Layers,
    title: "مواد عالية الجودة",
    description: "مقاومة للحرارة والعوامل الجوية",
  },
  {
    icon: Wallet,
    title: "أسعار مدروسة",
    description: "تنافس السوق دون التأثير على الجودة",
  },
  {
    icon: Clock,
    title: "التزام كامل بالمواعيد",
    description: "تسليم المشاريع في الوقت المحدد",
  },
  {
    icon: Palette,
    title: "تصاميم مخصصة",
    description: "تلبي احتياجات العميل وتعكس ذوقه الخاص",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-secondary">
      {/* Subtle Background Elements */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent"
      />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-gold rounded block" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">لماذا نحن؟</h2>
            <span className="w-12 h-[2px] bg-gold rounded block" />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              نحن لا نقدم مجرد خدمة، بل نمنحك <span className="text-gold font-semibold">تجربة متكاملة</span> تضمن راحتك ورضاك.
            </p>
          </MotionDiv>
        </div>

        {/* Features Grid */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <MotionDiv
                key={idx}
                variants={itemVariants}
                className="bg-primary/50 backdrop-blur-sm border border-gold/10 p-8 rounded-2xl flex items-start gap-5 group transition-all duration-300 hover:bg-primary hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex flex-shrink-0 items-center justify-center text-gold transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold/20">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-gold">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </MotionDiv>
            );
          })}
        </MotionDiv>

      </div>
    </section>
  );
}
