"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { Table } from "@/src/components/dashboard/Table";
import type { ProjectSummary } from "@/src/models/project";

export default function ProjectsDashboardPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("فشل تحميل المشاريع");
      const data: ProjectSummary[] = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "فشل الاتصال بالخادم");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleDelete(project: ProjectSummary) {
    const confirmed = window.confirm(`هل أنت متأكد من حذف "${project.title}"؟`);
    if (!confirmed) return;

    try {
      setDeletingId(project.id);
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "فشل حذف المشروع");
      }

      // Optimistically remove from local state
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء الحذف");
    } finally {
      setDeletingId(null);
    }
  }

  const columns = [
    {
      header: "الصورة",
      accessor: "image",
      render: (row: ProjectSummary) => (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
          <Image src={row.image} alt={row.title} fill className="object-cover" />
        </div>
      ),
    },
    {
      header: "عنوان المشروع",
      accessor: "title",
      render: (row: ProjectSummary) => (
        <span className="font-bold text-slate-900">{row.title}</span>
      ),
    },
    {
      header: "التصنيف",
      accessor: "category",
      render: (row: ProjectSummary) => (
        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
          {row.category || "غير محدد"}
        </span>
      ),
    },
  ];

  // Custom action renderer passed as extra column via the Table's action slot
  function renderActions(row: ProjectSummary) {
    const isDeleting = deletingId === row.id;
    return (
      <div className="flex items-center gap-3">
        <Link
          href={`/dashboard/projects/${row.id}`}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          <Pencil size={14} />
          تعديل
        </Link>
        <button
          onClick={() => handleDelete(row)}
          disabled={isDeleting}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50"
        >
          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          حذف
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="إدارة المشاريع"
        subtitle="عرض وتعديل كافة المشاريع المسجلة في الموقع"
        action={
          <Link
            href="/dashboard/projects/new"
            className="bg-gold hover:bg-gold-light text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md shadow-gold/20"
          >
            <Plus size={20} />
            <span>إضافة مشروع جديد</span>
          </Link>
        }
      />

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
          <button
            onClick={fetchProjects}
            className="mr-auto text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <Table
          columns={columns}
          data={projects}
          isLoading={isLoading}
          renderActions={renderActions}
        />
      )}
    </div>
  );
}
