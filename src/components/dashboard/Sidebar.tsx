"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Settings,
  Layers,
  Layout,
  ChevronLeft
} from "lucide-react";

// Helper for conditional classNames
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const menuItems = [
  { label: "الرئيسية", href: "/dashboard", icon: Home },
  { label: "المشاريع", href: "/dashboard/projects", icon: Briefcase },
  { label: "الخدمات", href: "/dashboard/services", icon: Settings },
  { label: "مجالاتنا", href: "/dashboard/fields", icon: Layers },
  { label: "الهيرو", href: "/dashboard/hero", icon: Layout },
  { label: "إعدادات التواصل", href: "/dashboard/social", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-white h-screen fixed top-0 right-0 z-50 flex flex-col transition-all duration-300 border-l border-white/10">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gold">لوحة التحكم</h1>
        <div className="bg-slate-800 p-1 rounded-md md:hidden">
          <ChevronLeft size={20} />
        </div>
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
  );
}
