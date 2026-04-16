"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { Table } from "@/src/components/dashboard/Table";
import { AlertCircle, Clock, User, Phone, Briefcase, MessageSquare } from "lucide-react";

interface QuoteRequest {
  id: number;
  name: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

export default function QuotesDashboardPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/quotes");
      if (!res.ok) throw new Error("فشل في تحميل طلبات الأسعار");
      const data = await res.json();
      setQuotes(data);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  }

  const columns = [
    {
      header: "الاسم",
      accessor: "name",
      render: (row: QuoteRequest) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
            <User size={14} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white leading-tight">{row.name}</span>
            {/* Show "New" badge if created within last 48 hours */}
            {new Date().getTime() - new Date(row.createdAt).getTime() < 48 * 60 * 60 * 1000 && (
              <span className="text-[10px] text-gold font-bold mt-0.5 animate-pulse">طلب جديد</span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "رقم الهاتف",
      accessor: "phone",
      render: (row: QuoteRequest) => (
        <div className="flex items-center gap-2 text-white/70">
          <Phone size={14} className="text-white/20" />
          <span dir="ltr" className="font-mono">{row.phone}</span>
        </div>
      ),
    },
    {
      header: "الخدمة",
      accessor: "service",
      render: (row: QuoteRequest) => (
        <div className="flex items-center gap-2">
          <Briefcase size={14} className="text-gold/40" />
          <span className="bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg text-xs font-bold">
            {row.service}
          </span>
        </div>
      ),
    },
    {
      header: "الرسالة",
      accessor: "message",
      render: (row: QuoteRequest) => (
        <div className="flex items-start gap-2 max-w-xs group">
          <MessageSquare size={14} className="text-white/20 mt-1 shrink-0" />
          <p className="text-white/50 text-sm line-clamp-2 hover:line-clamp-none transition-all cursor-default" title={row.message}>
            {row.message}
          </p>
        </div>
      ),
    },
    {
      header: "التاريخ",
      accessor: "createdAt",
      render: (row: QuoteRequest) => (
        <div className="flex flex-col text-xs text-white/40">
          <div className="flex items-center gap-1.5 font-bold mb-0.5 text-white/60">
            <Clock size={12} />
            {new Date(row.createdAt).toLocaleDateString("ar-SA")}
          </div>
          <span>{new Date(row.createdAt).toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="طلبات الأسعار"
        subtitle="جميع طلبات عروض الأسعار والمشاريع المرسلة من قبل العملاء"
      />

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <div className="text-sm">
            <p className="font-bold">خطأ في التحميل</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={fetchQuotes}
            className="mr-auto bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs transition-all"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : quotes.length === 0 && !isLoading ? (
        <div className="bg-secondary border border-white/10 rounded-2xl p-16 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-20 h-20 bg-primary/50 text-white/10 rounded-full flex items-center justify-center mb-6 border border-white/5">
            <MessageSquare size={40} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">لا توجد طلبات حالياً</h3>
          <p className="text-white/40 max-w-sm">
            لم نقم باستلام أي طلب عروض أسعار حتى الآن. سيتم عرض الطلبات الجديدة هنا فور وصولها.
          </p>
        </div>
      ) : (
        <Table
          columns={columns}
          data={quotes}
          isLoading={isLoading}
          hideActions={true}
        />
      )}
    </div>
  );
}
