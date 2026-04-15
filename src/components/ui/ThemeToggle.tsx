"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="border border-gold px-3 py-1 rounded hover:bg-gold hover:text-black transition"
      aria-label="Toggle Theme"
    >
      {dark ? "Dark" : "Light"}
    </button>
  );
}
