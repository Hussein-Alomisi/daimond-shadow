export interface WorkField {
  id: string;
  slug: string;
  title: string;
  image: string;
}

export const MOCK_FIELDS: WorkField[] = [
  {
    id: "fld-1",
    slug: "construction",
    title: "مقاولات عامة",
    image: "/images/fields/field-cover/construction-cover.webp",
  },
  {
    id: "fld-2",
    slug: "roof-tiles",
    title: "قرميد",
    image: "/images/fields/field-cover/roof-tiles-cover.webp",
  },
  {
    id: "fld-3",
    slug: "renovation",
    title: "ترميمات",
    image: "/images/fields/field-cover/renovation-cover.webp",
  },
  {
    id: "fld-4",
    slug: "roof-insulation",
    title: "عوازل أسطح",
    image: "/images/fields/field-cover/roof-insulation-cover.webp",
  },
  {
    id: "fld-5",
    slug: "fences",
    title: "السواتر",
    image: "/images/fields/field-cover/fences-cover.webp",
  },
  {
    id: "fld-6",
    slug: "sandwich-panels",
    title: "ساندوتش بانل",
    image: "/images/fields/field-cover/sandwitch-panel-cover.webp",
  },
  {
    id: "fld-7",
    slug: "pergolas",
    title: "البرجولات",
    image: "/images/fields/field-cover/pergolas-cover.webp",
  },
  {
    id: "fld-8",
    slug: "shades",
    title: "المظلات",
    image: "/images/fields/field-cover/shades-cover.webp",
  },
];
