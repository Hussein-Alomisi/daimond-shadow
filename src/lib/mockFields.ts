export interface WorkField {
  id: string;
  title: string;
  image: string;
}

export const MOCK_FIELDS: WorkField[] = [
  {
    id: "fld-1",
    title: "مقاول بناء",
    image: "/images/fields/field-1.jpg",
  },
  {
    id: "fld-2",
    title: "قرميد",
    image: "/images/fields/field-2.jpg",
  },
  {
    id: "fld-3",
    title: "ترميمات",
    image: "/images/fields/field-3.jpg",
  },
  {
    id: "fld-4",
    title: "عوازل أسطح",
    image: "/images/fields/field-4.jpg",
  },
  {
    id: "fld-5",
    title: "سواتر",
    image: "/images/fields/field-5.jpg",
  },
  {
    id: "fld-6",
    title: "ساندوتش بانل",
    image: "/images/fields/field-6.jpg",
  },
  {
    id: "fld-7",
    title: "برجولات",
    image: "/images/fields/field-7.jpg",
  },
];
