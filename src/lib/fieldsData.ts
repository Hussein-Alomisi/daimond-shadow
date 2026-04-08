export interface FieldData {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
}

export const fieldsData: FieldData[] = [
  {
    id: "1",
    slug: "shades",
    title: "المظلات",
    description: "نقدم في جوهرة الظل أحدث أنواع المظلات التي تجمع بين الجمالية والمتانة، لحماية ممتلكاتك من العوامل الجوية بأفضل المواد والخامات التي تضمن عمراً طويلاً.",
    images: [
      "/images/fields/shades/shade-1.jpg",
      "/images/fields/shades/shade-2.jpg",
      "/images/fields/shades/shade-3.jpg",
      "/images/fields/shades/shade-4.jpg",
      "/images/fields/shades/shade-6.jpg",
    ]
  },
  {
    id: "2",
    slug: "fences",
    title: "السواتر",
    description: "تركيب سواتر بألوان وأنواع مختلفة تناسب ديكور المنازل، وتوفر الخصوصية التامة والحماية، مع الالتزام بأعلى معايير الجودة والتركيب.",
    images: [
      "/images/fields/fences/fence-2.jpg",
      "/images/fields/fences/fence-4.jpg",
      "/images/fields/fences/fence-5.jpg",
      "/images/fields/fences/fence-6.jpg",
    ]
  },
  {
    id: "3",
    slug: "pergolas",
    title: "البرجولات",
    description: "نوفر تشكيلة واسعة من البرجولات العصرية التي تضفي لمسة جمالية فائقة لجلستك الخارجية، مصممة لتحمل كافة الظروف الجوية بأسلوب فريد.",
    images: [
      "/images/fields/pergolas/pergolas-1.jpg",
    ]
  },
  {
    id: "4",
    slug: "sandwich-panels",
    title: "ساندوتش بانل",
    description: "ننفذ جميع أعمال الساندوتش بانل للغرف والمستودعات والمظلات، لضمان عزل حراري ومائي عالي الكفاءة بتصاميم هندسية دقيقة ومدروسة.",
    images: [
      "/images/fields/sandwich-panels/sandwitch-panel-1.jpg",
    ]
  }
];

export function getFieldBySlug(slug: string): FieldData | undefined {
  return fieldsData.find(field => field.slug === slug);
}
