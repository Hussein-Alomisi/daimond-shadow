import { 
  Building2, 
  Ruler, 
  HardHat, 
  PaintRoller, 
  Wrench, 
  ShieldCheck 
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const MOCK_SERVICES: Service[] = [
  {
    id: "srv-1",
    title: "المقاولات العامة",
    description: "تنفيذ مشاريع المقاولات المتكاملة بجودة عالية بدءاً من التخطيط وحتى تسليم المفتاح.",
    icon: Building2,
  },
  {
    id: "srv-2",
    title: "التصميم المعماري",
    description: "تقديم حلول وتصاميم معمارية مبتكرة تجمع بين الجمال والوظيفة وتناسب احتياجاتك.",
    icon: Ruler,
  },
  {
    id: "srv-3",
    title: "إدارة المشاريع",
    description: "إدارة شاملة للمشاريع الهندسية لضمان التنفيذ في الوقت المحدد وضمن الميزانية.",
    icon: HardHat,
  },
  {
    id: "srv-4",
    title: "التشطيبات وإكساء",
    description: "أعمال تشطيبات داخلية وخارجية بلمسات فاخرة تناسب ذوقك وتبرز جمالية المبنى.",
    icon: PaintRoller,
  },
  {
    id: "srv-5",
    title: "الصيانة الدورية",
    description: "عقود صيانة وقائية ودورية للمباني لضمان استدامتها بكادر فني متخصص.",
    icon: Wrench,
  },
  {
    id: "srv-6",
    title: "الرقابة والجودة",
    description: "تطبيق أعلى معايير الجودة والسلامة المهنية في جميع مراحل البناء والتشييد.",
    icon: ShieldCheck,
  },
];
