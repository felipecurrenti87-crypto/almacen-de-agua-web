"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";

const toolLinks = [
  { href: "/seguimiento", label: "Seguimiento de pedido", emoji: "📦" },
  { href: "/sustentabilidad", label: "Sustentabilidad", emoji: "♻️" },
];

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/planes", label: "Planes" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/quiero-ser-cliente", label: "Quiero ser cliente", cta: true },
];

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  // Dark-aware: hero is ~100vh on home page
  const isHome = pathname === "/";
  const isOverDark = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Close tools dropdown with Escape
  useEffect(() => {
    if (!toolsOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToolsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toolsOpen]);

  const textColor = isOverDark ? "text-white" : "text-azul";
  const hoverBg = isOverDark
    ? "hover:bg-white/10"
    : "hover:bg-celeste-light";
  const iconColor = isOverDark ? "text-white" : "text-azul";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-celeste/5 py-2"
          : isOverDark
            ? "bg-transparent py-4"
            : "bg-white/50 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        {/* Logo — left */}
        <Link
          href="/"
          className="flex items-center gap-3 group flex-shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Logo
            variant={isOverDark ? "light" : "dark"}
            className="h-10 sm:h-14 group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.cta
                  ? `px-5 py-2 rounded-full text-sm font-body font-bold transition-all duration-300 ${
                      isOverDark
                        ? "bg-celeste-neon text-negro hover:bg-celeste-glow"
                        : "bg-[#1C3055] text-white hover:bg-[#16264a]"
                    }`
                  : `px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${textColor} ${hoverBg} ${
                      pathname === link.href
                        ? isOverDark
                          ? "bg-white/10"
                          : "bg-celeste-light text-azul-accent"
                        : ""
                    }`
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls — fixed right */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto md:ml-0">
          {/* Tools dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${hoverBg}`}
              aria-label="Herramientas"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              <svg
                className={`w-5 h-5 transition-colors duration-300 ${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setToolsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-12 z-30 w-56 bg-[#1C3055] rounded-2xl border border-celeste-neon/15 shadow-xl shadow-celeste-neon/10 overflow-hidden py-2"
                  >
                    <p className="px-4 py-2 text-celeste-glow text-xs font-heading font-bold uppercase tracking-wider">
                      Herramientas
                    </p>
                    {toolLinks.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gris-dark hover:text-white hover:bg-celeste-neon/10 transition-colors font-heading"
                      >
                        <span className="text-base">{t.emoji}</span>
                        {t.label}
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleCart}
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${hoverBg}`}
            aria-label="Ver carrito"
          >
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${iconColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-celeste-neon text-negro text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${hoverBg}`}
            aria-label="Menu"
          >
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${iconColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu with AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-[72px] bg-white z-20"
          >
            <nav className="flex flex-col items-center justify-center gap-2 pt-12 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block w-full text-center px-6 py-4 rounded-2xl text-lg font-heading font-bold transition-all ${
                      link.cta
                        ? "bg-celeste-neon text-negro hover:bg-celeste-glow"
                        : pathname === link.href
                          ? "bg-[#1C3055] text-white"
                          : "text-azul hover:bg-celeste-light hover:text-azul-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
