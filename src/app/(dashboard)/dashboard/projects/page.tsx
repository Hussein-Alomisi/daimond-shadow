import Image from "next/image";
import { Plus } from "lucide-react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { Table } from "@/src/components/dashboard/Table";
import { getProjects } from "@/src/server/projects/project.service";

export default async function ProjectsDashboardPage() {
  const projects = await getProjects();

  const columns = [
    {
      header: "الصورة",
      accessor: "image",
      render: (row: any) => (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
          <Image
            src={row.image}
            alt={row.title}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: "عنوان المشروع",
      accessor: "title",
      render: (row: any) => (
          <span className="font-bold text-slate-900">{row.title}</span>
      )
    },
    {
      header: "القسم / التصنيف",
      accessor: "category",
      render: (row: any) => (
        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
          {row.category || "غير محدد"}
        </span>
      ),
    },
    {
      header: "تاريخ الإضافة",
      accessor: "createdAt",
      render: (row: any) => (
          <span className="text-xs text-slate-400">
              {row.createdAt ? new Date(row.createdAt).toLocaleDateString('ar-SA') : "—"}
          </span>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="إدارة المشاريع"
        subtitle="عرض وتعديل كافة المشاريع المسجلة في الموقع"
        action={
          <button className="bg-gold hover:bg-gold-light text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-gold/20">
            <Plus size={20} />
            <span>إضافة مشروع جديد</span>
          </button>
        }
      />

      <Table columns={columns} data={projects} />
    </div>
  );
}
