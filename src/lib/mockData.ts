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
    title: "برج المملكة المالي",
    category: "تجاري",
    image: "/images/projects/project-1.jpg",
    location: "الرياض",
  },
  {
    id: "proj-2",
    title: "مجمع النخيل السكني",
    category: "سكني",
    image: "/images/projects/project-2.jpg",
    location: "جدة",
  },
  {
    id: "proj-3",
    title: "مستشفى الرعاية المتقدمة",
    category: "صحي",
    image: "/images/projects/project-3.jpg",
    location: "الدمام",
  },
  {
    id: "proj-4",
    title: "مول داون تاون",
    category: "تجاري وتجزئة",
    image: "/images/projects/project-4.jpg",
  },
  {
    id: "proj-5",
    title: "مطار المستقبل الدولي",
    category: "بنية تحتية",
    image: "/images/projects/project-5.jpg",
    location: "نيوم",
  },
  {
    id: "proj-6",
    title: "فلل الريفيرا",
    category: "سكني فاخر",
    image: "/images/projects/project-6.jpg",
    location: "الخبر",
  },
];
