export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  location?: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "مظلات هرمية فاخرة",
    category: "مظلات",
    image: "/images/fields/shades/shade-1.jpg",
    location: "الرياض",
  },
  {
    id: "proj-2",
    title: "سواتر ليزر حديثة",
    category: "سواتر",
    image: "/images/fields/fences/fence-2.jpg",
    location: "جدة",
  },
  {
    id: "proj-3",
    title: "برجولات خشبية مودرن",
    category: "برجولات",
    image: "/images/fields/pergolas/pergolas-1.jpg",
    location: "الدمام",
  },
  {
    id: "proj-4",
    title: "تركيب ساندوتش بانل",
    category: "ساندوتش بانل",
    image: "/images/fields/sandwich-panels/sandwitch-panel-1.jpg",
    location: "القصيم",
  },
  {
    id: "proj-5",
    title: "مظلات شد إنشائي",
    category: "مظلات",
    image: "/images/fields/shades/shade-6.jpg",
    location: "مكة المكرمة",
  },
  {
    id: "proj-6",
    title: "سواتر حديد مشغول",
    category: "سواتر",
    image: "/images/fields/fences/fence-4.jpg",
    location: "الخبر",
  },
  // change names title and image
  {
    id: "proj-7",
    title: "مظلات سيارات",
    category: "مظلات",
    image: "/images/fields/shades/shade-2.jpg",
    location: "الخبر",
  },
  {
    id: "proj-8",
    title: "مظلات حدائق",
    category: "مظلات",
    image: "/images/fields/shades/shade-3.jpg",
    location: "الخبر",
  },
  {
    id: "proj-9",
    title: "مظلات مسابح",
    category: "مظلات",
    image: "/images/fields/shades/shade-4.jpg",
    location: "الخبر",
  },
  {
    id: "proj-10",
    title: "سواتر حديد مشغول",
    category: "سواتر",
    image: "/images/fields/fences/fence-4.jpg",
    location: "الخبر",
  },
  {
    id: "proj-11",
    title: "سواتر خشبية",
    category: "سواتر",
    image: "/images/fields/fences/fence-5.jpg",
    location: "الخبر",
  },
  {
    id: "proj-12",
    title: "سواتر خشبية",
    category: "سواتر",
    image: "/images/fields/fences/fence-6.jpg",
    location: "الخبر",
  },

];
