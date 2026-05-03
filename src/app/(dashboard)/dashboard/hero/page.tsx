"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/src/components/dashboard/PageHeader";

export default function HeroSettingsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/hero");
      if (!res.ok) throw new Error("فشل في جلب البيانات");
      const data = await res.json();

      setTitle(data.title || "");
      setSubtitle(data.subtitle || "");
      setCurrentImage(data.image || "");
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", message: "حدث خطأ أثناء جلب الإعدادات الحالية." });
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFeedback({ type: "error", message: "الرجاء اختيار ملف صورة صالح" });
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFeedback(null);
    }
  }

  function clearImageSelection() {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (!title.trim()) {
      setFeedback({ type: "error", message: "العنوان الرئيسي مطلوب" });
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/hero", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "خطأ غير متوقع");
      }

      const updated = await res.json();
      setCurrentImage(updated.image);
      clearImageSelection(); // reset image form part after success
      setFeedback({ type: "success", message: "تم حفظ الإعدادات بنجاح ✓" });
      router.refresh();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "فشل الاتصال بالخادم" });
    } finally {
      setIsSaving(false);
    }
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
        title="إعدادات الهيرو"
        subtitle="تعديل الشاشة الرئيسية للموقع بصورتها وعنوانها البارز."
      />

      <form onSubmit={handleSubmit} className="bg-secondary rounded-2xl border border-white/10 shadow-xl p-6 md:p-8 max-w-3xl">
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

        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              العنوان الرئيسي <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: نبني المستقبل بجودة وإتقان"
              className="w-full px-4 h-12 border border-white/10 rounded-xl text-sm bg-primary text-white placeholder-white/30 transition-all outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {/* Subtitle Field */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              النص الوصفي الفرعي
            </label>
            <textarea
              value={subtitle}
              rows={4}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="اكتب وصفاً معبراً عن الشركة..."
              className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm bg-primary text-white placeholder-white/30 transition-all outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 resize-none"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              صورة الخلفية الرئيسية
            </label>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Current or Preview Image */}
              <div className="relative w-full sm:w-64 aspect-video rounded-xl overflow-hidden border border-white/10 bg-primary flex-shrink-0 group">
                <Image
                  src={previewUrl || currentImage || "/images/hero/hero-bg.jpg"}
                  alt="Hero Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs font-bold">معاينة الصورة</span>
                </div>
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full flex flex-col gap-3">
                <p className="text-xs text-white/40">
                  اختر صورة جديدة لاستبدال الصورة الحالية. (يفضل أن تكون الصورة بعرض 1920 بكسل وجودة عالية، يفضل امتداد webp أو jpg)
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
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                />
              </div>
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
