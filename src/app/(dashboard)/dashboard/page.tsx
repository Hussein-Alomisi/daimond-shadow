import { PageHeader } from "@/src/components/dashboard/PageHeader";

export default function DashboardOverview() {
  return (
    <div>
      <PageHeader 
        title="نظرة عامة" 
        subtitle="مرحباً بك في لوحة تحكم جوهرة الظل" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: "إجمالي المشاريع", value: "12", color: "bg-blue-500" },
            { label: "الخدمات المفعّلة", value: "6", color: "bg-gold" },
            { label: "المجالات", value: "8", color: "bg-emerald-500" },
            { label: "الرسائل الجديدة", value: "3", color: "bg-rose-500" },
        ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                <div className={`h-1 w-12 rounded-full ${stat.color} mt-4`}></div>
            </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-2">إحصائيات النظام</h3>
            <p className="text-slate-500">سيتم إضافة المزيد من الرسوم البيانية هنا قريباً.</p>
      </div>
    </div>
  );
}
