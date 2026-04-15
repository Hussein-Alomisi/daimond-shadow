import { ReactNode } from "react";
import { Sidebar } from "@/src/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Sidebar - Fixed on the right for RTL */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="transition-all duration-300 pr-0 md:pr-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center px-8">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">المسؤول</span>
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold text-xs uppercase">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
