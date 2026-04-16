"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, Pencil, Loader2, X, ImagePlus } from "lucide-react";
import { SafeImage } from "@/src/components/ui/SafeImage";
import type { FieldImageDetails } from "@/src/models/fields/field";

interface GalleryManagementProps {
  fieldId: string;
  initialImages: FieldImageDetails[];
}

export function GalleryManagement({ fieldId, initialImages }: GalleryManagementProps) {
  const [images, setImages] = useState<FieldImageDetails[]>(initialImages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<FieldImageDetails | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function openForm(image?: FieldImageDetails) {
    if (image) {
      setEditingImage(image);
      setTitle(image.title || "");
      setDescription(image.description || "");
      setPreviewUrl(image.image);
    } else {
      setEditingImage(null);
      setTitle("");
      setDescription("");
      setPreviewUrl(null);
    }
    setImageFile(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingImage(null);
    setImageFile(null);
    setPreviewUrl(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function clearImageSelection() {
    setImageFile(null);
    setPreviewUrl(editingImage ? editingImage.image : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!editingImage && !imageFile) {
      alert("الصور مطلوبة عند الإضافة");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingImage
        ? `/api/fields/${fieldId}/images/${editingImage.id}`
        : `/api/fields/${fieldId}/images`;

      const method = editingImage ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "فشل حفظ الصورة");
      }

      const data = await res.json();

      if (editingImage) {
        setImages(images.map((img) => img.id === data.id ? data : img));
      } else {
        setImages([...images, data]);
      }

      closeForm();
    } catch (error: any) {
      alert(error.message || "حدث خطأ");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(imageId: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;

    try {
      setDeletingId(imageId);
      const res = await fetch(`/api/fields/${fieldId}/images/${imageId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "فشل حذف الصورة");
      }

      setImages(images.filter((img) => img.id !== imageId));
    } catch (error: any) {
      alert(error.message || "حدث خطأ");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm font-medium text-white/50">إجمالي الصور: {images.length}</p>
        <button
          onClick={() => openForm()}
          className="bg-gold hover:brightness-110 px-5 py-2.5 rounded-xl text-slate-900 font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-gold/20"
        >
          <Plus size={16} />
          إضافة صورة
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-secondary border border-gold/30 p-6 md:p-8 rounded-2xl mb-8 relative shadow-lg">
          <button
            onClick={closeForm}
            className="absolute top-4 left-4 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <h3 className="font-bold text-lg text-white mb-6">
            {editingImage ? "تعديل بيانات الصورة" : "إضافة صورة جديدة"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white mb-2">الصورة {editingImage ? "(اختياري)" : "*"}</label>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Preview block */}
                <div className="relative w-full sm:w-48 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-primary flex-shrink-0 group">
                  {previewUrl ? (
                    <SafeImage src={previewUrl} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-white/30 text-sm">
                      لا توجد صورة
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex-1 w-full flex flex-col gap-3">
                  <p className="text-xs text-white/40">اختر صورة للمعرض. يفضل استخدام دقة عالية، امتداد webp, jpg, png، وأقصى حجم 2MB.</p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-primary hover:brightness-125 text-white border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                    >
                      <ImagePlus size={16} />
                      اختيار صورة
                    </button>
                    {previewUrl && (!editingImage || previewUrl !== editingImage.image) && (
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
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2">العنوان (اختياري)</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 h-12 border border-white/10 rounded-xl bg-primary text-white placeholder-white/30 text-sm transition-all outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2">الوصف (اختياري)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-white/10 rounded-xl bg-primary text-white placeholder-white/30 text-sm transition-all outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
                rows={2}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold text-slate-900 px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-gold/20"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                حفظ الصورة
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative border border-white/10 rounded-2xl overflow-hidden bg-secondary shadow-md hover:shadow-gold/10 hover:border-gold/30 transition-all duration-300">
            <div className="aspect-[4/3] relative">
              <SafeImage src={img.image} alt={img.title || "صورة"} fill className="object-cover" />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => openForm(img)}
                  className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white backdrop-blur-sm transition disabled:opacity-50"
                >
                  {deletingId === img.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
            {(img.title || img.description) && (
              <div className="p-4 border-t border-white/5 bg-secondary group-hover:bg-primary transition-colors">
                {img.title && <h4 className="font-bold text-sm text-white truncate">{img.title}</h4>}
                {img.description && <p className="text-xs text-white/50 truncate mt-1.5">{img.description}</p>}
              </div>
            )}
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full py-16 text-center text-white/40 border-2 border-dashed border-white/10 rounded-2xl bg-secondary/50">
            لا توجد صور في المعرض حالياً
          </div>
        )}
      </div>
    </div>
  );
}
