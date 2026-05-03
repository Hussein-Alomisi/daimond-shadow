"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, User, ShieldCheck } from "lucide-react";
import { SITE_INFO } from "@/src/lib/config/constants";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "حدث خطأ غير متوقع");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-gold/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md p-6 relative z-10">
        <div className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-4 border border-gold/30 shadow-inner">
              <ShieldCheck className="text-gold w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">{SITE_INFO.name}</h1>
            <p className="text-white/40 text-sm">لوحة تحكم الإدارة</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white mb-2 pr-1">اسم المستخدم</label>
              <div className="relative group">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 group-focus-within:text-gold transition-colors">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 bg-primary/50 border border-white/10 rounded-xl pr-12 pl-4 text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-2 pr-1">كلمة المرور</label>
              <div className="relative group">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 group-focus-within:text-gold transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-primary/50 border border-white/10 rounded-xl pr-12 pl-4 text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gold hover:bg-gold/90 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => router.push("/")}
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              العودة للموقع الرئيسي
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
