"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { categorias } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

type FilterSlug = "todos" | "agua" | "dispensers";

const filters: { slug: FilterSlug; label: string }[] = [
  { slug: "todos", label: "Todos" },
  { slug: "agua", label: "Agua y Soda" },
  { slug: "dispensers", label: "Dispensers" },
];

export default function TiendaPage() {
  const [active, setActive] = useState<FilterSlug>("todos");

  const filtered =
    active === "todos"
      ? categorias
      : categorias.filter((c) => c.slug === active);

  // Global product index counter for numbered cards
  let globalIndex = 0;

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 min-h-screen bg-gradient-to-b from-celeste-light/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <TextRevealWords
            as="h1"
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-azul mb-2 sm:mb-3"
          >
            Nuestra tienda
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-suave text-sm sm:text-base max-w-lg mx-auto px-2">
              Explora nuestro catalogo completo de agua purificada, soda y
              dispensers. Elegi entre retiro en tienda o envio a domicilio.
            </p>
          </AnimatedSection>
        </div>

        {/* Centered filter pills — scrollable on mobile */}
        <AnimatedSection delay={200}>
          <div className="flex justify-center mb-6 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="relative flex items-center gap-1 sm:gap-2 bg-white rounded-2xl p-1 sm:p-1.5 shadow-sm border border-celeste-medium/20 overflow-x-auto no-scrollbar">
              {filters.map((f) => (
                <button
                  key={f.slug}
                  onClick={() => setActive(f.slug)}
                  className="relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-heading font-semibold transition-colors duration-300 z-10 whitespace-nowrap flex-shrink-0"
                  style={{
                    color: active === f.slug ? "#FFFFFF" : undefined,
                  }}
                >
                  {/* Animated pill background */}
                  {active === f.slug && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-negro rounded-xl shadow-md"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Products */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.map((cat) => {
              const startIndex = globalIndex;
              globalIndex += cat.productos.length;

              return (
                <div key={cat.slug} className="mb-10 sm:mb-14 last:mb-0">
                  <AnimatedSection>
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-azul mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                      <span className="w-6 sm:w-8 h-0.5 bg-celeste-neon rounded-full" />
                      {cat.nombre}
                      <span className="text-gris-suave text-xs sm:text-sm font-normal">
                        ({cat.productos.length}{" "}
                        {cat.productos.length === 1 ? "producto" : "productos"})
                      </span>
                    </h2>
                  </AnimatedSection>

                  <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {cat.productos.map((product, i) => (
                      <StaggerItem key={product.id}>
                        <ProductCard
                          product={product}
                          index={startIndex + i}
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Discount banner for dispensers */}
        <AnimatedSection delay={300}>
          <div className="mt-10 sm:mt-16 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-negro p-6 sm:p-8 md:p-12 border border-celeste-neon/10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-celeste-neon/8 blur-[80px]" />
            </div>
            <div className="relative text-center">
              <span className="inline-block bg-celeste-neon/10 text-celeste-neon text-sm font-heading font-bold px-4 py-1.5 rounded-full mb-4 border border-celeste-neon/20">
                Dispensers
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
                Consulta por descuentos especiales
              </h3>
              <p className="text-gris-dark text-base max-w-lg mx-auto mb-6">
                Tenemos precios exclusivos en dispensers. Contactanos por WhatsApp
                para recibir tu cotizacion personalizada.
              </p>
              <Link
                href="/contacto"
                className="liquid-glass-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-white text-lg"
              >
                Consultar ahora
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
