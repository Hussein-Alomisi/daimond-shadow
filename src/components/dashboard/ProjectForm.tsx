"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProjectFormData {
  title: string;
  category: string;
  image: string;
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
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function validate(): boolean {
    const newErrors: Partial<ProjectFormData> = {};
    if (!form.title.trim()) newErrors.title = "عنوان المشروع مطلوب";
    if (!form.category.trim()) newErrors.category = "التصنيف مطلوب";
    if (!form.image.trim()) newErrors.image = "رابط الصورة مطلوب";
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

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            رابط الصورة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="مثال: /images/projects/my-project.jpg"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 ${
              errors.image ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
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
