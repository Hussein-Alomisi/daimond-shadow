export interface WorkField {
  id: string;
  slug: string;
  title: string;
  image: string;
}

export const MOCK_FIELDS: WorkField[] = [
  {
    id: "fld-1",
    slug: "building-contractor",
    title: "مقاول بناء",
    image: "/images/fields/f1.webp",
  },
  {
    id: "fld-2",
    slug: "qarmid",
    title: "قرميد",
    image: "/images/fields/f2.webp",
  },
  {
    id: "fld-3",
    slug: "restoration",
    title: "ترميمات",
    image: "/images/fields/f3.webp",
  },
  {
    id: "fld-4",
    slug: "insulation",
    title: "عوازل أسطح",
    image: "/images/fields/f4.webp",
  },
  {
    id: "fld-5",
    slug: "fences",
    title: "سواتر",
    image: "/images/fields/f5.webp",
  },
  {
    id: "fld-6",
    slug: "sandwich-panels",
    title: "ساندوتش بانل",
    image: "/images/fields/f6.webp",
  },
  {
    id: "fld-7",
    slug: "pergolas",
    title: "برجولات",
    image: "/images/fields/f7.webp",
  },
  {
    id: "fld-8",
    slug: "shades",
    title: "مظلات",
    image: "/images/fields/f8.webp",
  },
];
