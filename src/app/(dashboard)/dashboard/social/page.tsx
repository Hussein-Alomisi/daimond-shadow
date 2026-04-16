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

      <form onSubmit={handleSubmit} className="bg-secondary rounded-2xl border border-white/10 shadow-xl p-6 md:p-8 max-w-2xl text-white">
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
          {/* Phone Field */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              رقم الهاتف المباشر <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40">
                <Phone size={18} />
              </span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="مثال: 966500000000+"
                className="w-full pr-12 pl-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 border-white/10 focus:border-gold"
                dir="ltr"
              />
            </div>
            <p className="text-xs text-white/40 mt-2">يُستخدم للاتصال المباشر من خلال الموقع.</p>
          </div>

          {/* WhatsApp Field */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              رقم الواتساب <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-500">
                <MessageCircle size={18} />
              </span>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="مثال: 966500000000+"
                className="w-full pr-12 pl-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 border-white/10 focus:border-gold"
                dir="ltr"
              />
            </div>
            <p className="text-xs text-white/40 mt-2">يُستخدم لزر "تواصل عبر الواتساب".</p>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="info@example.com"
                className="w-full pr-12 pl-4 h-12 border rounded-xl bg-primary text-white placeholder-white/30 transition-all outline-none focus:ring-2 focus:ring-gold/30 border-white/10 focus:border-gold"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex justify-start">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-gold hover:brightness-110 text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving && <Loader2 size={18} className="animate-spin" />}
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
}
