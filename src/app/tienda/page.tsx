"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { categorias } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import MeshGradientBackground from "@/components/MeshGradientBackground";
import { TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

type FilterSlug = "todos" | "agua" | "dispensers";
type SubFilter = "todos" | "bidon" | "red" | "natural";

const filters: { slug: FilterSlug; label: string }[] = [
  { slug: "todos", label: "Todos" },
  { slug: "agua", label: "Agua y Soda" },
  { slug: "dispensers", label: "Dispensers" },
];

const subFilters: { slug: SubFilter; label: string }[] = [
  { slug: "todos", label: "Todos" },
  { slug: "bidon", label: "Bidón" },
  { slug: "red", label: "Red" },
  { slug: "natural", label: "Naturales" },
];

export default function TiendaPage() {
  const [active, setActive] = useState<FilterSlug>("todos");
  const [subActive, setSubActive] = useState<SubFilter>("todos");
  const [search, setSearch] = useState("");

  // Reset sub-filter when main filter changes
  const handleMainFilter = (slug: FilterSlug) => {
    setActive(slug);
    setSubActive("todos");
  };

  const filtered = useMemo(() => {
    let base =
      active === "todos"
        ? categorias
        : categorias.filter((c) => c.slug === active);

    // Apply sub-filter only to dispensers
    if (subActive !== "todos") {
      base = base.map((cat) => {
        if (cat.slug !== "dispensers") return cat;
        return {
          ...cat,
          productos: cat.productos.filter((p) => p.conexion === subActive),
        };
      }).filter((cat) => cat.productos.length > 0);
    }

    // Apply text search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      base = base.map((cat) => ({
        ...cat,
        productos: cat.productos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(q) ||
            p.descripcion.toLowerCase().includes(q)
        ),
      })).filter((cat) => cat.productos.length > 0);
    }

    return base;
  }, [active, subActive, search]);

  // Global product index counter for numbered cards
  let globalIndex = 0;

  return (
    <div className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 min-h-screen bg-gradient-to-b from-celeste-light/30 via-white to-celeste-light/20 overflow-hidden">
      {/* Wave pattern background — identical to homepage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="waves-tienda" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
              <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
              <path d="M0 20 Q50 0, 100 20 Q150 40, 200 20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves-tienda)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
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

          {/* Search bar */}
          <AnimatedSection delay={150}>
            <div className="max-w-md mx-auto mt-4 sm:mt-6">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-suave/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-celeste-medium/30 bg-white/80 backdrop-blur-sm text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon text-sm font-body transition-all shadow-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-celeste-light flex items-center justify-center hover:bg-celeste-medium/30 transition-colors"
                  >
                    <svg className="w-3 h-3 text-gris-suave" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Centered filter pills — scrollable on mobile */}
        <AnimatedSection delay={200}>
          <div className="flex flex-col items-center gap-3 mb-6 sm:mb-10">
            <div className="flex -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="relative flex items-center gap-1 sm:gap-2 bg-white rounded-2xl p-1 sm:p-1.5 shadow-sm border border-celeste-medium/20 overflow-x-auto no-scrollbar">
                {filters.map((f) => (
                  <button
                    key={f.slug}
                    onClick={() => handleMainFilter(f.slug)}
                    className="relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-heading font-semibold transition-colors duration-300 z-10 whitespace-nowrap flex-shrink-0"
                    style={{
                      color: active === f.slug ? "#FFFFFF" : undefined,
                    }}
                  >
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

            {/* Sub-filter for dispensers only */}
            <AnimatePresence>
              {active === "dispensers" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-1 sm:gap-2 bg-celeste-light/40 rounded-xl p-1 border border-celeste-medium/15 overflow-x-auto no-scrollbar">
                    {subFilters.map((sf) => (
                      <button
                        key={sf.slug}
                        onClick={() => setSubActive(sf.slug)}
                        className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                          subActive === sf.slug
                            ? "bg-white text-azul shadow-sm"
                            : "text-gris-suave hover:text-azul"
                        }`}
                      >
                        {sf.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Products */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${subActive}-${search}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-celeste-light flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-celeste" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="font-heading font-bold text-azul text-lg mb-1">No encontramos resultados</p>
                <p className="text-gris-suave text-sm">Proba con otro termino de busqueda o cambia los filtros.</p>
              </div>
            )}
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
          <div className="mt-10 sm:mt-16 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#050E14] p-6 sm:p-8 md:p-12 border border-celeste-neon/10">
            <MeshGradientBackground intensity="subtle" />
            <div className="relative text-center">
              <span className="inline-block bg-celeste-neon/10 text-celeste-neon text-sm font-heading font-bold px-4 py-1.5 rounded-full mb-4 border border-celeste-neon/20">
                Dispensers
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
                Envio e instalacion sin cargo
              </h3>
              <p className="text-gris-dark text-base max-w-lg mx-auto mb-6">
                Todos nuestros dispensers incluyen envio gratuito, instalacion profesional y garantia. Consulta por financiacion y planes de pago.
              </p>
              <Link
                href="/nosotros"
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
