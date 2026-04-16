"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/src/components/dashboard/PageHeader";

export default function HeroSettingsPage() {
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

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-3xl text-slate-800">
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
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              العنوان الرئيسي <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: نبني المستقبل بجودة وإتقان"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {/* Subtitle Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              النص الوصفي الفرعي
            </label>
            <textarea
              value={subtitle}
              rows={4}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="اكتب وصفاً معبراً عن الشركة..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 resize-none"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              صورة الخلفية الرئيسية
            </label>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Current or Preview Image */}
              <div className="relative w-full sm:w-64 aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0 group">
                <Image
                  src={previewUrl || currentImage || "/images/hero/hero-bg.jpg"}
                  alt="Hero Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs font-medium">معاينة الصورة</span>
                </div>
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full flex flex-col gap-3">
                <p className="text-xs text-slate-500">
                  اختر صورة جديدة لاستبدال الصورة الحالية. (يفضل أن تكون الصورة بعرض 1920 بكسل وجودة عالية، يفضل امتداد webp أو jpg)
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <ImagePlus size={16} />
                    اختيار صورة
                  </button>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={clearImageSelection}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <X size={16} />
                      إلغاء التحديد
                    </button>
                  )}
                </div>
                {imageFile && (
                  <p className="text-xs font-medium text-green-600 truncate max-w-full">
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
