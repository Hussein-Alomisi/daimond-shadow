"use client";

import { useEffect, useState, use } from "react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { FieldForm } from "@/src/components/dashboard/FieldForm";
import { GalleryManagement } from "@/src/components/dashboard/GalleryManagement";
import type { FieldDetails } from "@/src/models/fields/field";
import { Loader2 } from "lucide-react";

export default function EditFieldPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [field, setField] = useState<FieldDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchField() {
      try {
        const res = await fetch(`/api/fields/${id}`);
        if (!res.ok) throw new Error("فشل تحميل بيانات المجال");
        const data = await res.json();
        setField(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchField();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gold w-8 h-8" />
      </div>
    );
  }

  if (error || !field) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
        {error || "المجال غير موجود"}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <PageHeader
          title="تعديل المجال"
          subtitle={`تعديل بيانات المجال: ${field.title}`}
        />
        <FieldForm initialData={field} isEditing />
      </div>

      <div className="border-t border-slate-200 pt-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">إدارة معرض الصور</h2>
        <p className="text-slate-500 mb-6 text-sm">
          أضف أو عدل أو احذف الصور الخاصة بهذا المجال
        </p>
        <GalleryManagement fieldId={field.id} initialImages={field.images} />
      </div>
    </div>
  );
}
