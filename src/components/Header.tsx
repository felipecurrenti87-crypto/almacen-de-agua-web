"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import PriceToggle from "./PriceToggle";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/planes", label: "Planes" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/quiero-ser-cliente", label: "Ser cliente" },
];

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
  }, [pathname]);

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
              className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${textColor} ${hoverBg} ${
                pathname === link.href
                  ? isOverDark
                    ? "bg-white/10"
                    : "bg-celeste-light text-azul-accent"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls — fixed right */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto md:ml-0">
          <PriceToggle className="hidden sm:flex" />
          <DarkModeToggle className={`hidden sm:flex ${hoverBg} ${iconColor}`} />

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
            className="md:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-xl z-20"
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
                      pathname === link.href
                        ? "bg-negro text-white"
                        : "text-azul hover:bg-celeste-light hover:text-azul-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-4"
              >
                <PriceToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
