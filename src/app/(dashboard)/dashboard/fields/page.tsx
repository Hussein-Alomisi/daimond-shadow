"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { Table } from "@/src/components/dashboard/Table";
import { SafeImage } from "@/src/components/ui/SafeImage";
import type { FieldSummary } from "@/src/models/fields/field";

export default function FieldsDashboardPage() {
  const router = useRouter();
  const [fields, setFields] = useState<FieldSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchFields = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/fields");
      if (!res.ok) throw new Error("فشل تحميل المجالات");
      const data: FieldSummary[] = await res.json();
      setFields(data);
    } catch (err: any) {
      setError(err.message || "فشل الاتصال بالخادم");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  async function handleDelete(field: FieldSummary) {
    const confirmed = window.confirm(`هل أنت متأكد من حذف "${field.title}"؟`);
    if (!confirmed) return;

    try {
      setDeletingId(field.id);
      const res = await fetch(`/api/fields/${field.id}`, { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "فشل حذف المجال");
      }

      setFields((prev) => prev.filter((p) => p.id !== field.id));
      router.refresh();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء الحذف");
    } finally {
      setDeletingId(null);
    }
  }

  const columns = [
    {
      header: "الصورة",
      accessor: "coverImage",
      render: (row: FieldSummary) => (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
          <SafeImage src={row.coverImage} alt={row.title} fill className="object-cover" />
        </div>
      ),
    },
    {
      header: "عنوان المجال",
      accessor: "title",
      render: (row: FieldSummary) => (
        <span className="font-bold">{row.title}</span>
      ),
    },
    {
      header: "الرابط اللطيف (Slug)",
      accessor: "slug",
      render: (row: FieldSummary) => (
        <span className="text-white/60 font-mono text-sm">{row.slug}</span>
      ),
    },
  ];

  function renderActions(row: FieldSummary) {
    const isDeleting = deletingId === row.id;
    return (
      <div className="flex items-center gap-4">
        <Link
          href={`/dashboard/fields/${row.id}`}
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 font-bold bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl"
        >
          <Pencil size={14} />
          <span className="text-xs">تعديل</span>
        </Link>
        <button
          onClick={() => handleDelete(row)}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 font-bold bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl disabled:opacity-50"
        >
          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          <span className="text-xs">حذف</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="إدارة المجالات"
        subtitle="عرض وتعديل كافة المجالات المسجلة في الموقع (مجالاتنا)"
        action={
          <Link
            href="/dashboard/fields/new"
            className="bg-gold hover:brightness-110 text-slate-900 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20"
          >
            <Plus size={20} />
            <span>إضافة مجال جديد</span>
          </Link>
        }
      />

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
          <button
            onClick={fetchFields}
            className="mr-auto text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <Table
          columns={columns}
          data={fields}
          isLoading={isLoading}
          renderActions={renderActions}
        />
      )}
    </div>
  );
}
