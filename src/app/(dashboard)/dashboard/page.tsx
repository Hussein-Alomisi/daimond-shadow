import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { prisma } from "@/src/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  // Fetch dynamic counts from database
  const [projectsCount, servicesCount, fieldsCount, quotesCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.field.count(),
    prisma.quoteRequest.count(),
  ]);

  const stats = [
    { label: "إجمالي المشاريع", value: projectsCount.toString(), color: "bg-blue-400" },
    { label: "الخدمات المفعّلة", value: servicesCount.toString(), color: "bg-gold" },
    { label: "المجالات", value: fieldsCount.toString(), color: "bg-emerald-400" },
    { label: "طلبات الأسعار", value: quotesCount.toString(), color: "bg-rose-400" },
  ];

  return (
    <div>
      <PageHeader
        title="نظرة عامة"
        subtitle="مرحباً بك في لوحة تحكم جوهرة الظل"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-secondary p-6 rounded-2xl border border-white/10 shadow-xl">
            <p className="text-white/60 text-sm font-bold">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <div className={`h-1.5 w-12 rounded-full ${stat.color} mt-4`}></div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-secondary p-8 rounded-2xl border border-white/10 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">إحصائيات النظام</h3>
        <p className="text-white/60">سيتم إضافة المزيد من الرسوم البيانية هنا قريباً.</p>
      </div>
    </div>
  );
}
