"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus, X } from "lucide-react";
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      if (errors.coverImage) {
        setErrors((prev) => ({ ...prev, coverImage: undefined }));
      }
    }
  }

  function clearImageSelection() {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

      router.refresh();
      setTimeout(() => router.push("/dashboard/fields"), 1000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "حدث خطأ إثناء الحفظ" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-secondary rounded-2xl border border-white/10 shadow-xl p-6 md:p-8 max-w-4xl">
      {feedback && (
        <div
          className={`mb-8 px-5 py-4 rounded-xl text-sm font-medium border ${feedback.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-white mb-2">
            عنوان المجال <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${errors.title ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"}`}
          />
          {errors.title && <p className="text-red-400 text-xs mt-2">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2">
            الرابط اللطيف (Slug) <span className="text-red-500">*</span>
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            dir="ltr"
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 text-left ${errors.slug ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"}`}
          />
          {errors.slug && <p className="text-red-400 text-xs mt-2">{errors.slug}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-white mb-2">
            صورة الغلاف <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Current or Preview Image */}
            <div className="relative w-full sm:w-64 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-primary flex-shrink-0 group">
              {previewUrl || form.coverImage ? (
                <SafeImage
                  src={previewUrl || form.coverImage}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white/30 text-sm">
                  لا توجد صورة
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-white text-xs font-bold">معاينة الصورة</span>
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1 w-full flex flex-col gap-3">
              <p className="text-xs text-white/40">
                اختر صورة غلاف. يفضل استخدام دقة عالية (مستطيلة 4:3), امتداد webp, jpg, png، وأقصى حجم 2MB.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary hover:brightness-125 text-white border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <ImagePlus size={16} />
                  اختيار صورة
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={clearImageSelection}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1"
                  >
                    <X size={16} />
                    إلغاء التحديد
                  </button>
                )}
              </div>
              {imageFile && (
                <p className="text-xs font-bold text-green-400 truncate max-w-full">
                  الملف المحدد: {imageFile.name}
                </p>
              )}

              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          {errors.coverImage && <p className="text-red-400 text-xs mt-2">{errors.coverImage}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-white mb-2">
            الوصف الرئيسي <span className="text-red-500">*</span>
          </label>
          <textarea
            name="mainDescription"
            value={form.mainDescription}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${errors.mainDescription ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"}`}
          />
          {errors.mainDescription && <p className="text-red-400 text-xs mt-2">{errors.mainDescription}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2">
            عنوان قسم &quot;عن المجال&quot; <span className="text-red-500">*</span>
          </label>
          <input
            name="aboutTitle"
            value={form.aboutTitle}
            onChange={handleChange}
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${errors.aboutTitle ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"}`}
          />
          {errors.aboutTitle && <p className="text-red-400 text-xs mt-2">{errors.aboutTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2">
            عنوان قسم المعرض <span className="text-red-500">*</span>
          </label>
          <input
            name="galleryTitle"
            value={form.galleryTitle}
            onChange={handleChange}
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${errors.galleryTitle ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"}`}
          />
          {errors.galleryTitle && <p className="text-red-400 text-xs mt-2">{errors.galleryTitle}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-white mb-2">
            وصف قسم &quot;عن المجال&quot; <span className="text-red-500">*</span>
          </label>
          <textarea
            name="aboutDescription"
            value={form.aboutDescription}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${errors.aboutDescription ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"}`}
          />
          {errors.aboutDescription && <p className="text-red-400 text-xs mt-2">{errors.aboutDescription}</p>}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold hover:brightness-110 text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={18} className="animate-spin" />}
          حفظ
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/fields")}
          className="px-8 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 font-bold transition-all disabled:opacity-60"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
