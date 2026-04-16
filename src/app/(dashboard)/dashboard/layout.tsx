import { ReactNode } from "react";
import { Sidebar } from "@/src/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-primary text-white" dir="rtl">
      {/* Sidebar - Fixed on the right for RTL */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="transition-all duration-300 pr-0 md:pr-64">
        {/* Top bar */}
        <header className="h-16 bg-secondary border-b border-white/10 sticky top-0 z-40 flex items-center px-8">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white/80">المسؤول</span>
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
