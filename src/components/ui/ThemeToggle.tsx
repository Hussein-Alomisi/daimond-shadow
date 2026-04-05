"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  // Simple theme toggle component setup
  // In a real app we'd integrate next-themes, but assuming standard state for now
  // to match existing logic until a provider is needed.
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[38px] h-[34px] rounded border border-gold" aria-hidden="true" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={() => setDark(!dark)}
      className="border border-gold px-3 py-1 rounded hover:bg-gold hover:text-black transition"
      aria-label="Toggle Theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
