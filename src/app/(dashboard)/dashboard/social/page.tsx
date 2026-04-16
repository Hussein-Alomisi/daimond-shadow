"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Phone, MessageCircle } from "lucide-react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";

interface SocialSettingsForm {
  phone: string;
  whatsapp: string;
  email: string;
}

export default function SocialSettingsPage() {
  const [form, setForm] = useState<SocialSettingsForm>({
    phone: "",
    whatsapp: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/social");
      if (!res.ok) throw new Error("فشل في جلب البيانات");
      const data = await res.json();
      setForm({
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
      });
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", message: "حدث خطأ أثناء جلب الإعدادات الحالية." });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    // Frontend validation
    if (!form.phone.trim() || !form.whatsapp.trim()) {
      setFeedback({ type: "error", message: "رقم الهاتف والواتساب مطلوبة" });
      return;
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFeedback({ type: "error", message: "صيغة البريد الإلكتروني غير صحيحة" });
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("/api/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "خطأ غير متوقع");
      }

      setFeedback({ type: "success", message: "تم حفظ الإعدادات بنجاح ✓" });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "فشل الاتصال بالخادم" });
    } finally {
      setIsSaving(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="إعدادات التواصل"
        subtitle="قم بتحديث معلومات الاتصال والروابط الاجتماعية الخاصة بالموقع."
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-2xl text-slate-800">
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
          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              رقم الهاتف المباشر <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <Phone size={18} />
              </span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="مثال: 966500000000+"
                className="w-full pr-10 pl-4 py-2.5 border border-slate-200 rounded-lg text-sm transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                dir="ltr"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">يُستخدم للاتصال المباشر من خلال الموقع.</p>
          </div>

          {/* WhatsApp Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              رقم الواتساب <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
                <MessageCircle size={18} />
              </span>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="مثال: 966500000000+"
                className="w-full pr-10 pl-4 py-2.5 border border-slate-200 rounded-lg text-sm transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                dir="ltr"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">يُستخدم لزر "تواصل عبر الواتساب".</p>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="info@example.com"
                className="w-full pr-10 pl-4 py-2.5 border border-slate-200 rounded-lg text-sm transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-start">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-gold hover:bg-gold-light text-slate-900 px-8 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving && <Loader2 size={16} className="animate-spin" />}
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
}
