"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    // Basic Validation
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setFeedback({ type: "error", message: "يرجى ملء جميع الحقول المطلوبة (*)" });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "فشل إرسال الطلب");
      }

      setFeedback({ type: "success", message: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً." });
      setForm({ name: "", phone: "", service: "", message: "" });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "حدث خطأ أثناء إرسال البيانات، يرجى المحاولة لاحقاً." });
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="rounded-2xl border border-gold/20 p-8 md:p-10 bg-white/5 relative overflow-hidden backdrop-blur-sm shadow-2xl transition-all hover:border-gold/30">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">اطلب عرض سعر مجاني</h3>
        <p className="text-white/50 text-sm mb-8">
          أرسل لنا تفاصيل مشروعك وسنتواصل معك خلال 24 ساعة.
        </p>

        {feedback && (
          <div
            className={`mb-8 p-4 rounded-xl text-sm font-medium border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
              feedback.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {feedback.type === "success" ? <CheckCircle size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
            <p>{feedback.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white/60 text-sm font-bold mb-2">
                الاسم الكامل <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="محمد أحمد"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-white/60 text-sm font-bold mb-2">
                رقم الجوال <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="05XXXXXXXX"
                dir="ltr"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-white/60 text-sm font-bold mb-2">
              الخدمة المطلوبة <span className="text-gold" aria-hidden="true">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-neutral-900">اختر الخدمة...</option>
              <option value="مظلات" className="bg-neutral-900">مظلات وسواتر</option>
              <option value="برجولات" className="bg-neutral-900">برجولات خشبية وحديدية</option>
              <option value="قرميد" className="bg-neutral-900">تركيب قرميد</option>
              <option value="شبوك" className="bg-neutral-900">تركيب شبوك</option>
              <option value="سواتر" className="bg-neutral-900">سواتر ليزر وقماش</option>
              <option value="ترميمات" className="bg-neutral-900">أعمال الترميم والمقاولات</option>
              <option value="عوازل" className="bg-neutral-900">عوازل أسطح وهنقر</option>
              <option value="أخرى" className="bg-neutral-900">خدمات أخرى</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-white/60 text-sm font-bold mb-2">
              تفاصيل الطلب (اختياري)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="اكتب تفاصيل مشروعك هنا..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-primary font-bold py-4 rounded-xl shadow-xl shadow-gold/10 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                إرسال الطلب
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:group-hover:-translate-x-1">🚀</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
