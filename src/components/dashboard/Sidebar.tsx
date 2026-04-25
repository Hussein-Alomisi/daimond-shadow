"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Settings,
  Layers,
  Layout,
  ChevronLeft,
  MessageSquare // Added
} from "lucide-react";

// Helper for conditional classNames
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const menuItems = [
  { label: "الرئيسية", href: "/dashboard", icon: Home },
  { label: "طلبات الأسعار", href: "/dashboard/quotes", icon: MessageSquare },
  { label: "المشاريع", href: "/dashboard/projects", icon: Briefcase },
  { label: "الخدمات", href: "/dashboard/services", icon: Settings },
  { label: "مجالاتنا", href: "/dashboard/fields", icon: Layers },
  { label: "الهيرو", href: "/dashboard/hero", icon: Layout },
  { label: "إعدادات التواصل", href: "/dashboard/social", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "w-64 bg-primary text-white h-screen fixed top-0 right-0 z-50 flex flex-col transition-all duration-300 border-l border-white/10",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gold">لوحة التحكم</h1>
          <button 
            onClick={onClose}
            className="bg-slate-800 p-1 rounded-md md:hidden hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                isActive
                  ? "bg-gold/10 text-gold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={20} className={cn(
                isActive ? "text-gold" : "text-slate-400 group-hover:text-gold"
              )} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/30 transition-colors"
        >
          العودة للموقع
        </Link>
      </div>
    </aside>
    </>
  );
}
