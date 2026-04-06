import { 
  Building2, 
  Umbrella, 
  Fence, 
  Hammer, 
  Droplets,
  Wrench
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
    title: "المقاولات العامة والبناء",
    description: "تنفيذ مشاريع المقاولات المتكاملة والهياكل الإنشائية بأعلى معايير الجودة والاتقان.",
    icon: Building2,
  },
  {
    id: "srv-2",
    title: "تصميم وتركيب المظلات",
    description: "تركيب مظلات السيارات والحدائق بأشكال عصرية وخامات مقاومة لأقسى الظروف الجوية.",
    icon: Umbrella,
  },
  {
    id: "srv-3",
    title: "السواتر والبرجولات",
    description: "حلول تظليل وخصوصية متكاملة تشمل السواتر الخشبية والحديدية والبرجولات الفاخرة.",
    icon: Fence,
  },
  {
    id: "srv-4",
    title: "أعمال القرميد والترميم",
    description: "تخصصنا في تركيب القرميد الوطني والايطالي مع تقديم خدمات ترميم شاملة للمباني.",
    icon: Hammer,
  },
  {
    id: "srv-5",
    title: "حلول عوازل الأسطح",
    description: "حماية منزلك من تسربات المياه والحرارة بأحدث تقنيات العزل المائي والحراري المعتمدة.",
    icon: Droplets,
  },
  {
    id: "srv-6",
    title: "الصيانة الدورية",
    description: "عقود صيانة وقائية ودورية للمنشآت والمظلات لضمان استدامتها وسلامتها الدائمة.",
    icon: Wrench,
  },
];
