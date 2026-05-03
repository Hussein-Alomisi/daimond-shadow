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

      router.refresh();
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
    <form onSubmit={handleSubmit} noValidate className="bg-secondary rounded-2xl border border-white/10 shadow-xl p-6 md:p-8 max-w-2xl">
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
            اسم الخدمة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="مثال: البناء العظم"
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${
              errors.title ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"
            }`}
          />
          {errors.title && <p className="text-red-400 text-xs mt-2">{errors.title}</p>}
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            الأيقونة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder='مثال: fas fa-hammer أو lucide className'
            className={`w-full px-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 ${
              errors.icon ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"
            }`}
          />
          <p className="text-xs text-white/40 mt-2">
            يرجى إدخال اسم أيقونة دلالية (مثال: "hammer", "building", "wrench")
          </p>
          {errors.icon && <p className="text-red-400 text-xs mt-2">{errors.icon}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            الوصف <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="وصف تفصيلي للخدمة..."
            className={`w-full px-4 py-3 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 resize-none ${
              errors.description ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-gold"
            }`}
          />
          {errors.description && <p className="text-red-400 text-xs mt-2">{errors.description}</p>}
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
          {isEditing ? "حفظ التعديلات" : "إضافة الخدمة"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/services")}
          className="px-8 py-3 border border-gold text-gold rounded-xl hover:bg-gold/10 font-bold transition-all disabled:opacity-60"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
