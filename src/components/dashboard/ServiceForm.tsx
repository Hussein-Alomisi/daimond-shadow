"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ServiceFormData {
  title: string;
  icon: string;
  description: string;
}

interface ServiceFormProps {
  /** If provided, the form will be in "edit" mode */
  defaultValues?: Partial<ServiceFormData>;
  serviceId?: number;
}

const EMPTY_FORM: ServiceFormData = {
  title: "",
  icon: "",
  description: "",
};

export function ServiceForm({ defaultValues, serviceId }: ServiceFormProps) {
  const router = useRouter();
  const isEditing = !!serviceId;

  const [form, setForm] = useState<ServiceFormData>({
    ...EMPTY_FORM,
    ...defaultValues,
  });
  const [errors, setErrors] = useState<Partial<ServiceFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function validate(): boolean {
    const newErrors: Partial<ServiceFormData> = {};
    if (!form.title.trim()) newErrors.title = "اسم الخدمة مطلوب";
    if (!form.icon.trim()) newErrors.icon = "أيقونة الخدمة مطلوبة";
    if (!form.description.trim()) newErrors.description = "وصف الخدمة مطلوب";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setFeedback(null);

      const url = isEditing ? `/api/services/${serviceId}` : "/api/services";
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
        message: isEditing ? "تم تحديث الخدمة بنجاح ✓" : "تم إضافة الخدمة بنجاح ✓",
      });

      setTimeout(() => router.push("/dashboard/services"), 1000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "فشل الاتصال بالخادم" });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ServiceFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-2xl">
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
            اسم الخدمة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="مثال: البناء العظم"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 ${
              errors.title ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            الأيقونة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="مثال: fas fa-hammer أو lucide className"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 ${
              errors.icon ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
          <p className="text-xs text-slate-500 mt-1">
            يرجى إدخال اسم أيقونة دلالية (مثال: "hammer", "building", "wrench")
          </p>
          {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            الوصف <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="وصف تفصيلي للخدمة..."
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors outline-none text-slate-900 focus:ring-2 focus:ring-gold/30 resize-none ${
              errors.description ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-gold"
            }`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
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
          {isEditing ? "حفظ التعديلات" : "إضافة الخدمة"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/services")}
          className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
