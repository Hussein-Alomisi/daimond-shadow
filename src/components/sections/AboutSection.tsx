import { MotionDiv } from "../ui/MotionDiv";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import type { Variants } from "framer-motion";

const textVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};

const features = [
  "دقة عالية في تركيب المظلات والسواتر",
  "خبرة طويلة في الترميم والمقاولات",
  "تشطيبات راقية وأصلية للقرميد",
  "الالتزام الكامل بالجودة والمواعيد",
];

export function AboutSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden bg-primary"
      id="about-section"
    >
      {/* Decorative background element */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Content */}
          <MotionDiv
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-gold rounded block" />
              <span className="text-gold font-semibold tracking-wider text-sm md:text-base">
                تعرف علينا
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              من نحن
            </h2>

            {/* <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-6">
              نحن هنا لمشاركتكم رؤيتكم في بناء وتجميل منازلكم
            </h3> */}

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              إذا كنت تبحث عن افضل مظلات وسواتر في المنطقة الشرقية، فأنت في المكان الصحيح (في جوهرة الظل) نعمل بشغف لنكون الخيار الأول لكل من يبحث عن الجودة والتميز في تنفيذ وتجميل المساحات. بخبرة تتجاوز 15 عاماً في المنطقة الشرقية.
              نقدم مجموعة متكاملة من الخدمات تشمل المظلات، السواتر، القرميد، وأعمال المقاولات العامة والترميمات، حيث نحرص على استخدام أفضل المواد وأحدث الأساليب لنضمن لكم نتائج تدوم طويلاً وتلبي تطلعاتكم.
              نؤمن أن كل مشروع هو فرصة لإبداع جديد، لذلك نركز على أدق التفاصيل لنصنع مساحات تجمع بين الجمال، العملية، والمتانة، بما يعكس ذوقكم ويضيف قيمة حقيقية لممتلكاتكم.
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                  <span className="text-white/80 font-medium text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </MotionDiv>

          {/* Image Content */}
          <MotionDiv
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[500px] lg:h-[650px] rounded-2xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-secondary"
          >
            <Image
              src="/images/hero/about-bg.jpg"
              alt="مهندسون في موقع البناء"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Golden Frame Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-4 border border-gold/40 rounded-xl rounded-tr-[4rem] rounded-bl-[4rem] pointer-events-none transition-all duration-700 group-hover:border-gold/80"
            />

            {/* Cinematic Gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20 pointer-events-none"
            />

            {/* Years Badge */}
            <div className="absolute bottom-8 right-8 bg-primary/90 backdrop-blur-md border border-gold/30 p-6 rounded-tl-[2rem] rounded-br-[2rem] shadow-2xl">
              <div className="text-gold font-bold text-4xl mb-1">+15</div>
              <div className="text-white/90 text-sm font-medium">عاماً من الخبرة</div>
            </div>
          </MotionDiv>

        </div>
      </div>
    </section>
  );
}

