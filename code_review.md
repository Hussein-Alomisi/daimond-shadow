# مراجعة الكود الشاملة — tashyed-alqwa
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion · RTL/Arabic

---

## نظرة عامة

| الجانب | التقييم |
|---|---|
| هيكل المشروع | ✅ جيد جداً |
| جودة الكود | ✅ جيد (مع تحسينات مقترحة) |
| معمارية المكونات | 🟡 محتاج تحسين |
| Next.js Best Practices | 🟡 محتاج تحسين |
| الأداء | 🟡 بعض المخاطر |
| Accessibility | 🔴 مشاكل تحتاج معالجة |
| SEO | 🟡 ناقص |
| قابلية التوسع | ✅ جيد |
| الأمان | 🟡 ملاحظات بسيطة |

---

## 1. جودة الكود

### 🔴 [C-01] — نص مكرر بين `NAVIGATION_LINKS` و `quickLinks`
**الملف:** `src/lib/constants.ts` + `src/components/layout/Footer.tsx`

`quickLinks` في Footer.tsx هي نسخة متطابقة يدوية من `NAVIGATION_LINKS`.

**الإصلاح:**
```ts
// constants.ts — صدّر quickLinks كـ derived value
export const QUICK_LINKS = NAVIGATION_LINKS.filter(l => !l.href.startsWith("/#"));
```

---

### 🔴 [C-02] — نص مشفر (Hardcoded) لاسم الشركة في Navbar
**الملف:** `Navbar.tsx` — السطر 119

```tsx
// ❌ الاسم مكتوب، ويختلف عن SITE_INFO.name في اللوغو!
<span>جوهرة الظل للمقاولات العامة</span>

// ✅
import { SITE_INFO } from "@/src/lib/constants";
<span>{SITE_INFO.name}</span>
```

---

### 🟡 [C-03] — `SITE_INFO.name` و `SITE_INFO.fullName` متطابقتان
**الملف:** `src/lib/constants.ts`

```ts
name: "جوهرة الظل للمقاولات العامة",
fullName: "جوهرة الظل للمقاولات العامة", // ❌ نفس القيمة طيب شنحذفه
```

---

### 🟡 [C-04] — تعليقات كود معلّق في Hero.tsx
السطور 63–90 في `Hero.tsx` تحتوي JSX معلّق مؤقت. احذفه أو انقله لـ branch منفصل.

---

### 🟡 [C-05] — تعليق مهمة داخل بيانات الإنتاج
**الملف:** `src/lib/mockData.ts` — السطر 52

```ts
// change names title and image  ← ❌ to-do غير منجز
```

---

### 🟢 [C-06] — استخدام `idx` كـ key في قوائم ثابتة
```tsx
// ❌
{features.map((feature, idx) => <div key={idx}>

// ✅ البيانات ثابتة — استخدم النص كـ key
{features.map((feature) => <div key={feature}>
```

---

### 🟢 [C-07] — بيانات مكررة في mockData.ts
`proj-6` و `proj-10` نفس الصورة والعنوان. `proj-11` و `proj-12` نفس العنوان.

---

## 2. معمارية المكونات

### 🔴 [A-01] — إفراط في استخدام `"use client"`

| الملف | السبب الوحيد |
|---|---|
| `AboutSection.tsx` | `motion.div` فقط |
| `ServicesSection.tsx` | `motion.div` فقط |
| `FieldsSection.tsx` | `motion.div` فقط |
| `ServiceCard.tsx` | `motion.div` فقط |
| `FieldCard.tsx` | `motion.div` فقط |
| `Footer.tsx` | floating buttons |

**الإصلاح:** فصل animation wrapper صغير يكون هو الوحيد بـ `"use client"`:

```tsx
// src/components/ui/MotionWrapper.tsx
"use client";
import { motion } from "framer-motion";

export function AnimatedSection({ children, ...props }) {
  return <motion.section {...props}>{children}</motion.section>;
}
```

هذا يقلل JavaScript bundle المُرسَل للمتصفح ويسمح لـ Next.js بعمل Server Rendering للبيانات.

---

### 🟡 [A-02] — `FieldsSection` تُحدد cards بـ hard-coded index
**الملف:** `FieldsSection.tsx`

```tsx
// ❌ هش — يكسر إذا تغير عدد MOCK_FIELDS
<FieldCard field={MOCK_FIELDS[0]} variants={cardReveal} />
// ... حتى [7]

// ✅
{MOCK_FIELDS.map((field) => (
  <div key={field.id}><FieldCard field={field} variants={cardReveal} /></div>
))}
```

---

### 🟡 [A-03] — `textBullets` في FieldsSection مكررة مع MOCK_FIELDS
القائمتان تصفان نفس المجالات. دمجهما أو إضافة `description` لـ `WorkField` interface.

---

### 🟡 [A-04] — `SectionHeader` pattern متكرر في 3 مكونات
`ServicesSection.tsx` و `ProjectsGrid.tsx` يحتويان كود header متطابق:

```tsx
// ✅ الإصلاح — مكوّن مشترك
// src/components/ui/SectionHeader.tsx
export function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="w-12 h-px bg-gold" />
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
        <span className="w-12 h-px bg-gold" />
      </div>
      {subtitle && <p className="text-foreground/70 text-lg max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}
```

---

### 🟢 [A-05] — `ThemeToggle` غير مفعّل ولا يُستخدم
الزر يُبدّل state بدون أي تأثير فعلي على DOM. احذفه أو اربطه بـ `next-themes`.

---

## 3. Next.js Best Practices

### 🟡 [N-01] — الصفحة الرئيسية لا تستفيد من Server Rendering
كل مكوناتها `"use client"`. (مرتبط بـ A-01 — حله يحل هذا تلقائياً)

---

### 🟡 [N-02] — `metadataBase` غير مرنة للبيئات المختلفة
**الملف:** `src/app/layout.tsx`

```ts
// ❌
metadataBase: new URL(SITE_INFO.domain), // يُولد روابط خاطئة محلياً

// ✅
metadataBase: new URL(
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
),
```

---

### 🟡 [N-03] — 4 صفحات فارغة تعطي 404
`about/`, `contact/`, `projects/`, `services/` — فارغة تماماً. أنشئ `page.tsx` لكل منها.

---

### 🟡 [N-04] — لا يوجد middleware لحماية Dashboard
أضف `src/middleware.ts` لحماية `/dashboard` قبل النشر.

---

### 🟢 [N-05] — `next.config.ts` فارغ
```ts
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  compress: true,
};
```

---

### 🟢 [N-06] — `React.ReactNode` بدون import في HeroBanner.tsx
```ts
// ❌
title: string | React.ReactNode;

// ✅
import type { ReactNode } from "react";
title: string | ReactNode;
```

---

## 4. Tailwind CSS

### 🟡 [T-01] — تعارض `style={{}}` مع className في Footer
```tsx
// ❌ style prop يلغي className — bg-white/4 لا تأثير له
className="bg-white/4"
style={{ background: "rgba(255,255,255,0.03)" }}

// ✅
className="bg-[rgba(255,255,255,0.03)]"
```

---

### 🟡 [T-02] — `#D4AF37` hardcoded في Footer أكثر من 10 مرات
```tsx
className="text-[#D4AF37]"  // ❌ استخدمه بدلاً:
className="text-gold"        // ✅ token موجود في @theme
```

---

### 🟡 [T-03] — قيم شفافية غير قياسية موجودة فقط في Footer
`bg-white/3`, `bg-white/4`, `border-white/8` — قيم شفافية صغيرة جداً تكاد تكون غير مرئية وتُشوّش المطورين المستقبليين.

---

### 🟢 [T-04] — `font-cairo` يتكرر غير ضروري
`body` في layout.tsx تطبق `font-cairo` بالفعل. لا حاجة لتكرارها في كل `h2` و `p`.

---

## 5. الأداء

### 🔴 [P-01] — `priority` على صورة ليست LCP
**الملف:** `AboutSection.tsx`

```tsx
<Image src="/images/hero/about-bg.jpg" priority .../>
// ❌ هذه الصورة أسفل Viewport — priority تضر بتحميل Hero
```

استخدم `priority` فقط في `Hero.tsx`.

---

### 🟡 [P-02] — GIF كخلفية Hero — ثقيل جداً
**الملف:** `Hero.tsx`

```tsx
// ✅ أخف بـ 80%+ من GIF
<video autoPlay muted loop playsInline className="object-cover opacity-60 absolute inset-0 w-full h-full">
  <source src="/videos/hero-bg.webm" type="video/webm" />
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
```

---

### 🟡 [P-03] — Footer كله Client بسبب floating buttons صغيرة
**الإصلاح:** فصل FloatingButtons لمكوّن منفصل بـ `"use client"` ليبقى Footer Server Component.

---

### 🟡 [P-04] — صورة AboutSection بدون `sizes`
```tsx
// ❌
<Image src="..." fill />

// ✅
<Image src="..." fill sizes="(max-width: 1024px) 100vw, 50vw" />
```

---

### 🟢 [P-05] — Animation variants مكررة في ملفات متعددة
```ts
// ✅ مكان موحد
// src/lib/animations.ts
export const staggerGrid = { ... };
export const cardReveal = { ... };
```

---

## 6. إمكانية الوصول (Accessibility)

### 🔴 [Ax-01] — زر إغلاق القائمة بدون `aria-label`
**الملف:** `Navbar.tsx:120`

```tsx
// ❌ قارئات الشاشة لن تفهم وظيفته
<button onClick={() => setMobileMenuOpen(false)}><svg>...</svg></button>

// ✅
<button aria-label="إغلاق القائمة" onClick={...}><svg ...></svg></button>
```

---

### 🔴 [Ax-02] — Mobile menu بدون Focus Trap
**الملف:** `Navbar.tsx`

مستخدمو الكيبورد يمكنهم Tab-ing خارج القائمة للمحتوى خلفها:

```tsx
// ✅ حل أساسي
<motion.div
  role="dialog"
  aria-modal="true"
  aria-label="قائمة التنقل"
  ...
>
```

---

### 🔴 [Ax-03] — `HeroBanner` alt الإنجليزي على موقع عربي
**الملف:** `HeroBanner.tsx:34`

```tsx
<Image alt="Banner Background" />  // ❌ موقع عربي RTL
```

اجعل `alt` prop إلزامياً في الـ interface:

```tsx
interface HeroBannerProps {
  backgroundImageAlt: string; // ← مطلوب
  ...
}
```

---

### 🟡 [Ax-04] — عناصر زخرفية بدون `aria-hidden`
divs التدرجات والـ decorative overlays في Footer وHero تحتاج `aria-hidden="true"`.

---

### 🟡 [Ax-05] — تباين نصوص ضعيف في Footer
- `text-white/35` = ~3.2:1 (WCAG يتطلب 4.5:1)
- `text-white/40`, `text-white/55` قريبة من الحد

**الإصلاح:** رفع الحد الأدنى لـ `text-white/60` للنصوص المهمة.

---

### 🟡 [Ax-06] — `<nav>` الـ desktop بدون `aria-label`
```tsx
// ❌
<nav className="hidden lg:flex ...">

// ✅
<nav aria-label="التنقل الرئيسي" className="hidden lg:flex ...">
```

---

### 🟡 [Ax-07] — "رؤية التفاصيل" في ProjectCard هو `<span>`
```tsx
// ❌ غير قابل للوصول بالكيبورد
<span className="inline-block bg-gold ...">رؤية التفاصيل</span>
```

غلّف الكرت بـ `<Link href={...}>` أو استخدم `<button>` مع `type="button"`.

---

## 7. SEO

### 🔴 [S-01] — الصفحات الداخلية بدون metadata
```ts
// أضف في كل page.tsx
export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف على شركة جوهرة الظل للمقاولات العامة وخبرتها في المنطقة الشرقية",
};
```

---

### 🟡 [S-02] — لا يوجد `sitemap.xml` أو `robots.txt`
```ts
// src/app/sitemap.ts
import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.tashyed-alqwa.com", lastModified: new Date() },
    { url: "https://www.tashyed-alqwa.com/about", lastModified: new Date() },
    { url: "https://www.tashyed-alqwa.com/services", lastModified: new Date() },
    { url: "https://www.tashyed-alqwa.com/projects", lastModified: new Date() },
    { url: "https://www.tashyed-alqwa.com/contact", lastModified: new Date() },
  ];
}
```

---

### 🟡 [S-03] — `openGraph.images` ناقصة من metadata
```ts
// layout.tsx
openGraph: {
  ...
  images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE_INFO.name }],
},
twitter: { card: "summary_large_image", images: ["/images/og-image.jpg"] },
```

---

### 🟢 [S-04] — `alt` للصور يمكن تحسينه
```tsx
// مقبول
<Image alt={field.title} />

// ✅ أفضل لـ SEO
<Image alt={`خدمة ${field.title} - جوهرة الظل للمقاولات`} />
```

---

## 8. قابلية التوسع

### 🟡 [Sc-01] — لا يوجد Service Layer للبيانات
```ts
// src/services/projects.service.ts
export async function fetchProjects(): Promise<Project[]> {
  // سيُستبدل بـ API call أو CMS query لاحقاً
  return MOCK_PROJECTS;
}
```

---

### 🟡 [Sc-02] — لا يوجد Error Boundary أو Loading States
```
src/app/(public)/
  loading.tsx   // skeleton screens
  error.tsx     // graceful error UI
```

---

### 🟢 [Sc-03] — لا يوجد Middleware لحماية Dashboard
```ts
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  // فحص الجلسة
}
export const config = { matcher: ["/dashboard/:path*"] };
```

---

## 9. الأمان

### 🟡 [Sec-01] — أرقام الهواتف Placeholder في الكود
**الملف:** `Footer.tsx`

```ts
const phoneNumber = "9665XXXXXXXX";    // ❌ روابط معطّلة تظهر للزوار
const whatsappNumber = "9665XXXXXXXX"; // ❌
```

**الإصلاح:**
```bash
# .env.local
NEXT_PUBLIC_PHONE=+966512345678
NEXT_PUBLIC_WHATSAPP=+966512345678
```

```ts
// Footer.tsx
const phoneNumber = process.env.NEXT_PUBLIC_PHONE ?? "";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? "";
```

---

### 🟢 [Sec-02] — روابط `target="_blank"` مُؤمَّنة ✅
```tsx
target="_blank" rel="noopener noreferrer"  // ✅ ممتاز
```

---

### 🟢 [Sec-03] — يُنصح بإضافة Security Headers
```ts
// next.config.ts
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ],
  }];
}
```

---

## ملخص الأولويات

### 🔴 أولوية عليا (افعل الآن)

| ID | المشكلة | الملف |
|---|---|---|
| C-01 | حذف `quickLinks` المكررة | Footer.tsx |
| C-02 | استبدال الاسم المشفر بـ `SITE_INFO.name` | Navbar.tsx:119 |
| A-01 | تقليل `"use client"` بفصل MotionWrapper | كل sections |
| Ax-01 | `aria-label` لزر إغلاق القائمة | Navbar.tsx:120 |
| Ax-02 | `role="dialog"` + `aria-modal` على Mobile Menu | Navbar.tsx |
| P-01 | إزالة `priority` من AboutSection | AboutSection.tsx |
| S-01 | إنشاء الصفحات الفارغة | 4 صفحات |

### 🟡 أولوية متوسطة (قبل النشر)

| ID | المشكلة | الملف |
|---|---|---|
| N-02 | إصلاح `metadataBase` | layout.tsx |
| P-02 | استبدال GIF بـ video | Hero.tsx |
| P-03 | فصل FloatingButtons عن Footer | Footer.tsx |
| T-01 | إزالة تعارض `style={{}}` مع className | Footer.tsx |
| T-02 | استبدال `#D4AF37` بـ `text-gold` | Footer.tsx |
| Sec-01 | نقل أرقام الهواتف لـ env | Footer.tsx |
| S-02 | إضافة sitemap.ts و robots.ts | src/app/ |
| S-03 | إضافة OG images لـ metadata | layout.tsx |
| Ax-05 | رفع تباين النصوص الضعيفة | Footer.tsx |

### 🟢 تحسينات اختيارية

| ID | المشكلة |
|---|---|
| A-04 | مكوّن `SectionHeader` مشترك |
| P-05 | مكتبة `src/lib/animations.ts` |
| P-04 | إضافة `sizes` لصور AboutSection |
| Sc-01 | إنشاء service layer |
| N-05 | إضافة image optimization لـ next.config.ts |
| A-05 | حذف أو ربط ThemeToggle بـ next-themes |

---

*تم إعداد هذه المراجعة بتاريخ 2026-04-07 — الإصدار 1.0*
