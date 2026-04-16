"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
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
    if (errors.image && file) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-2xl">

      {/* Feedback banner */}
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

      <div className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            عنوان المشروع <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="مثال: مظلات هرمية فاخرة"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 ${
              errors.title ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            التصنيف <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="مثال: مظلات، سواتر، برجولات"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 ${
              errors.category ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        {/* Image File */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            صورة المشروع <span className="text-red-500">*</span>
          </label>
          
          {isEditing && form.image && !imageFile && (
            <div className="mb-3 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-4">
              <div className="relative w-16 h-16 rounded overflow-hidden shadow-sm shrink-0">
                <SafeImage src={form.image} alt="المشروع الحالي" fill className="object-cover" />
              </div>
              <div className="text-sm text-slate-600 flex-1">
                <p className="font-semibold text-slate-800 mb-1">الصورة الحالية:</p>
                <p className="text-xs truncate text-slate-500" dir="ltr">{form.image}</p>
              </div>
            </div>
          )}

          <input
            type="file"
            name="image"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            className={`w-full px-4 py-2 border rounded-lg text-sm transition-colors text-slate-900 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-yellow-800 hover:file:bg-gold/20 ${
              errors.image ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
          <p className="text-xs text-slate-500 mt-2">الامتدادات المسموحة: JPEG, PNG, WebP. الحجم الأقصى: 2 ميجابايت.</p>
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            الوصف <span className="text-slate-400 font-normal">(اختياري)</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="وصف مختصر للمشروع..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
          />
        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold hover:bg-gold-light text-slate-900 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isEditing ? "حفظ التعديلات" : "إضافة المشروع"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/projects")}
          className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
        >
          إلغاء
        </button>
      </div>

    </form>
  );
}
