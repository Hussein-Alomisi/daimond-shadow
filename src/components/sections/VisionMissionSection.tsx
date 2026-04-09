import { MotionDiv } from "../ui/MotionDiv";
import { Eye, Target } from "lucide-react";
import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface VisionMissionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delayIndex: number;
}

function VisionMissionCard({ title, icon, children, delayIndex }: VisionMissionCardProps) {
  return (
    <MotionDiv
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: delayIndex * 0.2,
      }}
      className="bg-secondary relative flex flex-col items-start p-8 md:p-12 rounded-[2rem] border border-gold/10 shadow-xl group transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] overflow-hidden"
    >
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-700 group-hover:bg-gold/15"
      />

      <div className="w-16 h-16 rounded-2xl bg-primary border border-gold/20 flex items-center justify-center mb-8 text-gold transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 shadow-lg relative z-10">
        {icon}
      </div>

      <h3 className="text-3xl font-extrabold text-white mb-6 flex flex-col gap-4 relative z-10 tracking-wide">
        {title}
        <span className="w-12 h-[3px] bg-gradient-to-r from-gold to-gold/40 rounded-full block transition-all duration-700 ease-out group-hover:w-20" />
      </h3>

      <p className="text-white/70 text-lg md:text-xl leading-relaxed font-medium relative z-10">
        {children}
      </p>
    </MotionDiv>
  );
}

export function VisionMissionSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-primary" id="vision-mission">
      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/40 to-primary pointer-events-none"
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Vision Card (Right side in RTL) */}
          <VisionMissionCard
            title="رؤيتنا"
            icon={<Eye className="w-8 h-8" strokeWidth={1.5} />}
            delayIndex={0}
          >
            أن نكون <span className="text-gold font-bold">رواداً في مجال المظلات والسواتر والمقاولات</span>، وأن نقدم <span className="text-gold font-bold">حلولاً مبتكرة</span> ترتقي بتجربة عملائنا وتحقق أعلى معايير الجودة.
          </VisionMissionCard>

          {/* Mission Card (Left side in RTL) */}
          <VisionMissionCard
            title="رسالتنا"
            icon={<Target className="w-8 h-8" strokeWidth={1.5} />}
            delayIndex={1}
          >
            تقديم <span className="text-gold font-bold">خدمات احترافية</span> بمعايير عالية، مع الالتزام <span className="text-gold font-bold">بالمصداقية والشفافية</span>، لضمان رضا عملائنا في كل مشروع.
          </VisionMissionCard>

        </div>
      </div>
    </section>
  );
}
