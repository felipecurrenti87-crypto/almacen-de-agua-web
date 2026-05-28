"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("almacen-dark-mode");
    const isDark = saved === "true" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("almacen-dark-mode", String(next));
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${className}`}
      aria-label={dark ? "Modo claro" : "Modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0, scale: dark ? 0.9 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {dark ? (
          <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
