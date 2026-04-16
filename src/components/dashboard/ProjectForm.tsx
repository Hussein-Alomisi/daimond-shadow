"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ImagePlus, X } from "lucide-react";
import { SafeImage } from "@/src/components/ui/SafeImage";

interface ProjectFormData {
  title: string;
  category: string;
  image: string; // The URL string of existing image
  description: string;
}

interface ProjectFormProps {
  /** If provided, the form will be in "edit" mode */
  defaultValues?: Partial<ProjectFormData>;
  projectId?: string;
}

const EMPTY_FORM: ProjectFormData = {
  title: "",
  category: "",
  image: "",
  description: "",
};

export function ProjectForm({ defaultValues, projectId }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!projectId;

  const [form, setForm] = useState<ProjectFormData>({
    ...EMPTY_FORM,
    ...defaultValues,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function validate(): boolean {
    const newErrors: Partial<ProjectFormData> = {};
    if (!form.title.trim()) newErrors.title = "عنوان المشروع مطلوب";
    if (!form.category.trim()) newErrors.category = "التصنيف مطلوب";
    if (!imageFile && !form.image.trim()) newErrors.image = "صورة المشروع مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setFeedback(null);

      const url = isEditing ? `/api/projects/${projectId}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      if (form.description) formData.append("description", form.description);
      
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (isEditing && form.image) {
        formData.append("image", form.image);
      }

      const response = await fetch(url, {
        method,
        body: formData, // Do NOT set Content-Type header when using FormData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "حدث خطأ غير متوقع");
      }

      setFeedback({
        type: "success",
        message: isEditing ? "تم تحديث المشروع بنجاح ✓" : "تم إضافة المشروع بنجاح ✓",
      });

      // Navigate back after a short delay so the user sees the success message
      setTimeout(() => router.push("/dashboard/projects"), 1000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "فشل الاتصال بالخادم" });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: undefined }));
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

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-secondary rounded-2xl border border-white/10 shadow-xl p-6 md:p-8 max-w-2xl">

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`mb-8 px-5 py-4 rounded-xl text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            عنوان المشروع <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="مثال: مظلات هرمية فاخرة"
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${
              errors.title ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"
            }`}
          />
          {errors.title && <p className="text-red-400 text-xs mt-2">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            التصنيف <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="مثال: مظلات، سواتر، برجولات"
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${
              errors.category ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"
            }`}
          />
          {errors.category && <p className="text-red-400 text-xs mt-2">{errors.category}</p>}
        </div>

        {/* Image File */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            صورة المشروع <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Current or Preview Image */}
            <div className="relative w-full sm:w-64 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-primary flex-shrink-0 group">
              {previewUrl || form.image ? (
                <SafeImage
                  src={previewUrl || form.image}
                  alt="Project Preview"
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
                اختر صورة للمشروع. يفضل استخدام دقة عالية، امتداد webp, jpg, png، وأقصى حجم 2MB.
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
                name="image"
                ref={fileInputRef}
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          {errors.image && <p className="text-red-400 text-xs mt-2">{errors.image}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            الوصف <span className="text-white/40 font-normal">(اختياري)</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="وصف مختصر للمشروع..."
            className="w-full px-4 py-3 border border-white/10 rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
          />
        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold hover:brightness-110 text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={18} className="animate-spin" />}
          {isEditing ? "حفظ التعديلات" : "إضافة المشروع"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/projects")}
          className="px-8 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 font-bold transition-all"
        >
          إلغاء
        </button>
      </div>

    </form>
  );
}
