"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SafeImage } from "@/src/components/ui/SafeImage";

interface FieldFormData {
  title: string;
  slug: string;
  coverImage: string;
  mainDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  galleryTitle: string;
}

interface FieldFormProps {
  initialData?: FieldFormData & { id: string };
  isEditing?: boolean;
}

export function FieldForm({ initialData, isEditing = false }: FieldFormProps) {
  const router = useRouter();
  
  const [form, setForm] = useState<FieldFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    coverImage: initialData?.coverImage || "",
    mainDescription: initialData?.mainDescription || "",
    aboutTitle: initialData?.aboutTitle || "",
    aboutDescription: initialData?.aboutDescription || "",
    galleryTitle: initialData?.galleryTitle || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FieldFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function generateSlug(title: string) {
    return title
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0621-\u064A\u0660-\u0669-]/g, '')
      .toLowerCase();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && !isEditing) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });

    if (errors[name as keyof FieldFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (errors.coverImage && file) {
      setErrors((prev) => ({ ...prev, coverImage: undefined }));
    }
  }

  function validate() {
    const newErrors: Partial<Record<keyof FieldFormData, string>> = {};
    if (!form.title.trim()) newErrors.title = "هذا الحقل مطلوب";
    if (!form.slug.trim()) newErrors.slug = "هذا الحقل مطلوب";
    if (!form.mainDescription.trim()) newErrors.mainDescription = "هذا الحقل مطلوب";
    if (!form.aboutTitle.trim()) newErrors.aboutTitle = "هذا الحقل مطلوب";
    if (!form.aboutDescription.trim()) newErrors.aboutDescription = "هذا الحقل مطلوب";
    if (!form.galleryTitle.trim()) newErrors.galleryTitle = "هذا الحقل مطلوب";
    
    if (!imageFile && !form.coverImage.trim()) {
      newErrors.coverImage = "الصورة مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setFeedback(null);

      const url = isEditing && initialData ? `/api/fields/${initialData.id}` : "/api/fields";
      const method = isEditing ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("mainDescription", form.mainDescription);
      formData.append("aboutTitle", form.aboutTitle);
      formData.append("aboutDescription", form.aboutDescription);
      formData.append("galleryTitle", form.galleryTitle);
      
      if (imageFile) {
        formData.append("coverImage", imageFile);
      } else if (isEditing && form.coverImage) {
        formData.append("existingCoverImage", form.coverImage);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "حدث خطأ غير متوقع");
      }

      setFeedback({
        type: "success",
        message: isEditing ? "تم حفظ التعديلات بنجاح" : "تم إضافة المجال بنجاح",
      });

      setTimeout(() => router.push("/dashboard/fields"), 1000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "حدث خطأ إثناء الحفظ" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-4xl">
      {feedback && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            عنوان المجال <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.title ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            الرابط اللطيف (Slug) <span className="text-red-500">*</span>
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            dir="ltr"
            className={`w-full px-4 py-2 border rounded-lg text-left ${errors.slug ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            صورة الغلاف <span className="text-red-500">*</span>
          </label>
          {isEditing && form.coverImage && !imageFile && (
            <div className="mb-2 w-16 h-16 relative rounded overflow-hidden">
              <SafeImage src={form.coverImage} alt="Cover" fill className="object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            className="w-full text-sm"
          />
          {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            الوصف الرئيسي <span className="text-red-500">*</span>
          </label>
          <textarea
            name="mainDescription"
            value={form.mainDescription}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg ${errors.mainDescription ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.mainDescription && <p className="text-red-500 text-xs mt-1">{errors.mainDescription}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            عنوان قسم &quot;عن المجال&quot; <span className="text-red-500">*</span>
          </label>
          <input
            name="aboutTitle"
            value={form.aboutTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.aboutTitle ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.aboutTitle && <p className="text-red-500 text-xs mt-1">{errors.aboutTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            عنوان قسم المعرض <span className="text-red-500">*</span>
          </label>
          <input
            name="galleryTitle"
            value={form.galleryTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.galleryTitle ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.galleryTitle && <p className="text-red-500 text-xs mt-1">{errors.galleryTitle}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            وصف قسم &quot;عن المجال&quot; <span className="text-red-500">*</span>
          </label>
          <textarea
            name="aboutDescription"
            value={form.aboutDescription}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg ${errors.aboutDescription ? "border-red-400" : "border-slate-200"}`}
          />
          {errors.aboutDescription && <p className="text-red-500 text-xs mt-1">{errors.aboutDescription}</p>}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold hover:bg-gold-light text-slate-900 px-6 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          حفظ
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/fields")}
          className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
