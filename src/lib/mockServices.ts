import {
  Building2,
  Umbrella,
  Fence,
  Hammer,
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
    title: "المظلات",
    description: "تنفيذ جميع أنواع المظلات بأحدث التصاميم",
    icon: Umbrella,
  },
  {
    id: "srv-2",
    title: "السواتر",
    description: "تركيب السواتر بمختلف الخامات",
    icon: Fence,
  },
  {
    id: "srv-3",
    title: "برجولات وهناجر",
    description: "تركيب البرجولات والهناجر بأحدث التصاميم",
    icon: Building2,
  },
  {
    id: "srv-4",
    title: "أعمال القرميد والديكورات الخارجية",
    description: "تركيب القرميد والديكورات الخارجية بأحدث التصاميم",
    icon: Hammer,
  },
  {
    id: "srv-5",
    title: "المقاولات العامة",
    description: "تنفيذ جميع أعمال المقاولات العامة بأحدث التصاميم",
    icon: Building2,
  },
  {
    id: "srv-6",
    title: "الترميم والصيانة",
    description: "عقود صيانة وقائية ودورية للمنشآت والمظلات لضمان استدامتها وسلامتها الدائمة.",
    icon: Wrench,
  },
  {
    id: "srv-7",
    title: "حلول الساندوتش بانل الحديثة",
    description: "تركيب الساندوتش بانل بأحدث التصاميم",
    icon: Hammer,
  },
];


