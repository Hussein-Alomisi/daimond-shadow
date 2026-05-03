"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { Table } from "@/src/components/dashboard/Table";
import type { ServiceSummary } from "@/src/models/services/service";

export default function ServicesDashboardPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("فشل في جلب البيانات");
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("فشل حذف الخدمة");
      }

      setServices((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء الحذف");
    } finally {
      setDeletingId(null);
    }
  }

  const columns = [
    {
      header: "الاسم",
      accessor: "title",
      render: (row: ServiceSummary) => (
        <span className="font-bold">{row.title}</span>
      ),
    },
    {
      header: "الأيقونة",
      accessor: "icon",
      render: (row: ServiceSummary) => (
        <span className="text-sm font-mono bg-white/5 px-2 py-1 rounded-lg border border-white/10 block max-w-fit truncate">
          {row.icon}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="إدارة الخدمات"
          subtitle="عرض، إضافة، تعديل، وحذف الخدمات المقدمة."
        />
        <Link
          href="/dashboard/services/new"
          className="bg-gold hover:brightness-110 text-slate-900 px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-gold/20"
        >
          <Plus size={18} />
          إضافة خدمة
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">خطأ</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        data={services}
        isLoading={isLoading}
        renderActions={(row) => (
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/services/${row.id}`}
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 font-bold bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl"
              title="تعديل"
            >
              <Pencil size={14} />
              <span className="text-xs">تعديل</span>
            </Link>
            <button
              onClick={() => handleDelete(row.id)}
              disabled={deletingId === row.id}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 font-bold bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl disabled:opacity-50"
              title="حذف"
            >
              {deletingId === row.id ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              <span className="text-xs">حذف</span>
            </button>
          </div>
        )}
      />
    </div>
  );
}
