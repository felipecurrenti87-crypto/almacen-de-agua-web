"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { categorias, formatPrice } from "@/data/products";
import type { Product } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import MeshGradientBackground from "@/components/MeshGradientBackground";
import ProductImage3D from "@/components/ProductImage3D";
import { useMotionValue } from "framer-motion";

const dispensers = categorias
  .find((c) => c.slug === "dispensers")!
  .productos.filter((p) => p.conexion !== "natural");

export default function ComparadorPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const selectedProducts = useMemo(
    () => dispensers.filter((d) => selected.includes(d.id)),
    [selected]
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const allSpecs = useMemo(() => {
    const specs: { label: string; key: string }[] = [];
    const seen = new Set<string>();
    const specEntries: { label: string; key: string }[] = [
      { label: "Conexion", key: "_conexion" },
      { label: "Voltaje", key: "voltaje" },
      { label: "Potencia calentamiento", key: "potenciaCalentamiento" },
      { label: "Capacidad caliente", key: "capacidadCaliente" },
      { label: "Potencia enfriamiento", key: "potenciaEnfriamiento" },
      { label: "Capacidad fria", key: "capacidadFria" },
      { label: "Dimensiones", key: "dimensiones" },
      { label: "Temperaturas", key: "_temperaturas" },
      { label: "Extras", key: "_extras" },
    ];
    for (const entry of specEntries) {
      for (const p of selectedProducts) {
        if (entry.key === "_conexion" || entry.key === "_temperaturas" || entry.key === "_extras") {
          if (!seen.has(entry.key)) { seen.add(entry.key); specs.push(entry); }
        } else if (p.specs?.[entry.key as keyof typeof p.specs] && !seen.has(entry.key)) {
          seen.add(entry.key);
          specs.push(entry);
        }
      }
    }
    return specs;
  }, [selectedProducts]);

  const getSpecValue = (product: Product, key: string): string => {
    if (key === "_conexion") return product.conexion === "red" ? "Red" : "Botellon";
    if (key === "_temperaturas") return product.specs?.temperaturas?.join(", ") ?? "-";
    if (key === "_extras") return product.specs?.extras?.join(", ") ?? "-";
    const val = product.specs?.[key as keyof NonNullable<typeof product.specs>];
    if (Array.isArray(val)) return val.join(", ");
    return (val as string) ?? "-";
  };

  return (
    <div className="relative min-h-screen bg-[#050E14] overflow-hidden">
      <MeshGradientBackground intensity="normal" interactive />

      <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-celeste-neon/10 text-celeste-glow text-sm font-heading font-semibold px-4 py-2 rounded-full mb-4 border border-celeste-neon/20">
              <span className="text-lg">🏷️</span>
              Compara hasta 3 dispensers
            </span>
          </AnimatedSection>
          <TextRevealWords as="h1" className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            Comparador de dispensers
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-dark text-base sm:text-lg max-w-xl mx-auto">
              Selecciona hasta 3 dispensers y compara sus caracteristicas lado a lado.
            </p>
          </AnimatedSection>
        </div>

        {/* Product selector */}
        <AnimatedSection delay={200}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gris-dark text-sm font-heading">
                {selected.length}/3 seleccionados
              </p>
              {selected.length > 0 && (
                <button
                  onClick={() => setSelected([])}
                  className="text-xs text-gris-dark hover:text-celeste-neon transition-colors font-heading font-semibold"
                >
                  Limpiar seleccion
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {dispensers.map((d) => {
                const isSelected = selected.includes(d.id);
                const isDisabled = !isSelected && selected.length >= 3;
                return (
                  <button
                    key={d.id}
                    onClick={() => !isDisabled && toggle(d.id)}
                    disabled={isDisabled}
                    className={`relative text-left p-3 rounded-2xl transition-all border ${
                      isSelected
                        ? "bg-celeste-neon/10 border-celeste-neon/30"
                        : isDisabled
                          ? "bg-negro-medium/30 border-celeste-neon/5 opacity-40 cursor-not-allowed"
                          : "bg-negro-light/80 border-celeste-neon/8 hover:border-celeste-neon/20"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-celeste-neon flex items-center justify-center">
                        <svg className="w-3 h-3 text-negro" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="aspect-square bg-negro-medium/40 rounded-xl mb-2 p-2 flex items-center justify-center">
                      <ProductImage3D
                        src={d.imagen}
                        alt={d.nombre}
                        categoria={d.categoria}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                    </div>
                    <p className="text-white text-xs font-heading font-semibold line-clamp-2 leading-tight">{d.nombre}</p>
                    <p className="text-celeste-neon text-xs font-bold mt-1">{formatPrice(d.precio_tienda)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Comparison table */}
        <AnimatePresence>
          {selectedProducts.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-negro-light/80 backdrop-blur-sm rounded-3xl border border-celeste-neon/10 overflow-hidden">
                {/* Header row */}
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                  <div className="p-4 border-b border-celeste-neon/10" />
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="p-4 text-center border-b border-l border-celeste-neon/10">
                      <div className="w-20 h-20 mx-auto mb-2 bg-negro-medium/40 rounded-xl p-2 flex items-center justify-center">
                        <ProductImage3D src={p.imagen} alt={p.nombre} categoria={p.categoria} mouseX={mouseX} mouseY={mouseY} />
                      </div>
                      <p className="font-heading font-bold text-white text-sm">{p.nombre}</p>
                      <p className="text-celeste-neon font-bold text-lg mt-1">{formatPrice(p.precio_tienda)}</p>
                    </div>
                  ))}
                </div>

                {/* Spec rows */}
                {allSpecs.map((spec, i) => (
                  <div
                    key={spec.key}
                    className="grid"
                    style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
                  >
                    <div className={`p-3 sm:p-4 text-gris-dark text-xs sm:text-sm font-heading font-semibold ${i % 2 === 0 ? "bg-negro-medium/30" : ""}`}>
                      {spec.label}
                    </div>
                    {selectedProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`p-3 sm:p-4 text-white text-xs sm:text-sm border-l border-celeste-neon/5 ${i % 2 === 0 ? "bg-negro-medium/30" : ""}`}
                      >
                        {getSpecValue(p, spec.key)}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Benefits row */}
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                  <div className="p-4 text-gris-dark text-sm font-heading font-semibold bg-negro-medium/30">
                    Beneficios
                  </div>
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="p-4 border-l border-celeste-neon/5 bg-negro-medium/30">
                      <ul className="space-y-1">
                        {p.beneficios?.map((b, j) => (
                          <li key={j} className="text-gris-dark text-xs flex items-start gap-1.5">
                            <span className="text-celeste-neon mt-0.5 flex-shrink-0">✓</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Action row */}
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                  <div className="p-4" />
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="p-4 border-l border-celeste-neon/5 text-center">
                      <Link
                        href={`/tienda/${p.id}`}
                        className="inline-block text-xs font-heading font-bold text-celeste-neon bg-celeste-neon/10 px-4 py-2 rounded-xl hover:bg-celeste-neon/20 transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedProducts.length < 2 && selected.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gris-dark text-sm">Selecciona al menos 2 dispensers para comparar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
