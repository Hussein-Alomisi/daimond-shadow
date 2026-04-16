"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Loader2, X } from "lucide-react";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function openForm(image?: FieldImageDetails) {
    if (image) {
      setEditingImage(image);
      setTitle(image.title || "");
      setDescription(image.description || "");
    } else {
      setEditingImage(null);
      setTitle("");
      setDescription("");
    }
    setImageFile(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingImage(null);
    setImageFile(null);
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
        <p className="text-sm text-slate-500">إجمالي الصور: {images.length}</p>
        <button
          onClick={() => openForm()}
          className="bg-gold hover:bg-gold-light px-4 py-2 rounded-lg text-slate-900 font-bold text-sm flex items-center gap-2 transition"
        >
          <Plus size={16} />
          إضافة صورة
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mb-6 relative">
          <button 
            onClick={closeForm}
            className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>

          <h3 className="font-bold text-lg mb-4">
            {editingImage ? "تعديل بيانات الصورة" : "إضافة صورة جديدة"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">الصورة {editingImage ? "(اختياري)" : "*"}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">العنوان (اختياري)</label>
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">الوصف (اختياري)</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                rows={2}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-800"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              حفظ الصورة
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
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
              <div className="p-3">
                {img.title && <h4 className="font-semibold text-sm truncate">{img.title}</h4>}
                {img.description && <p className="text-xs text-slate-500 truncate mt-1">{img.description}</p>}
              </div>
            )}
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed rounded-xl">
            لا توجد صور في المعرض حالياً
          </div>
        )}
      </div>
    </div>
  );
}
