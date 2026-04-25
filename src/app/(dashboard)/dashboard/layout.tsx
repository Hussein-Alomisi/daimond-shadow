"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/src/components/dashboard/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary text-white" dir="rtl">
      {/* Sidebar - Fixed on the right for RTL */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="transition-all duration-300 pr-0 md:pr-64">
        {/* Top bar */}
        <header className="h-16 bg-secondary border-b border-white/10 sticky top-0 z-40 flex items-center px-8 gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          
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
