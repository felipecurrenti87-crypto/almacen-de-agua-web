"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shippingZones, findZone, type ShippingZone } from "@/data/shipping";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealLine, TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const allDepartamentos = shippingZones.flatMap((z) =>
  z.departamentos.map((d) => ({ nombre: d, zona: z }))
);

export default function CalculadoraEnvioPage() {
  const [query, setQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
  const [searched, setSearched] = useState(false);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return allDepartamentos.filter((d) =>
      d.nombre.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  const handleSearch = () => {
    const zone = findZone(query);
    setSelectedZone(zone || null);
    setSearched(true);
  };

  const handleSelect = (nombre: string, zona: ShippingZone) => {
    setQuery(nombre);
    setSelectedZone(zona);
    setSearched(true);
  };

  return (
    <div>
      {/* Hero — DARK */}
      <section className="relative bg-negro py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] right-[15%] w-[400px] h-[400px] rounded-full bg-celeste-neon/6 blur-[120px] animate-orb-pulse" />
          <div className="absolute bottom-[-10%] left-[10%] w-[300px] h-[300px] rounded-full bg-celeste-glow/5 blur-[100px] animate-orb-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Wave pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="waves-shipping" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
                <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <path d="M0 20 Q50 0, 100 20 Q150 40, 200 20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-shipping)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
              Envios a toda Mendoza
            </span>
          </AnimatedSection>
          <TextRevealLine delay={100}>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mt-3 mb-6">
              Calculadora de{" "}
              <span className="gradient-text-glow">envio</span>
            </h1>
          </TextRevealLine>
          <AnimatedSection delay={200}>
            <p className="text-gris-dark text-lg max-w-2xl mx-auto">
              Ingresa tu departamento y te mostramos los tiempos de entrega y costos para tu zona.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Search */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-white to-celeste-light/20 overflow-hidden">
        {/* Wave background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="waves-shipping-content" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
                <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <path d="M0 20 Q50 0, 100 20 Q150 40, 200 20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-shipping-content)" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          {/* Search input */}
          <AnimatedSection>
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-celeste-medium/20 mb-10">
              <h2 className="font-heading font-bold text-xl text-azul mb-4">
                Donde te encontras?
              </h2>
              <div className="relative">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-suave/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSearched(false);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Ej: Godoy Cruz, Lujan de Cuyo..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-celeste-medium/30 bg-celeste-light/10 text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon text-sm font-body transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-4 rounded-2xl bg-negro text-white font-heading font-bold text-sm hover:bg-negro-medium transition-colors flex-shrink-0"
                  >
                    Buscar
                  </button>
                </div>

                {/* Suggestions dropdown */}
                <AnimatePresence>
                  {suggestions.length > 0 && !searched && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute z-20 top-full left-0 right-16 mt-2 bg-white rounded-2xl shadow-xl border border-celeste-medium/20 overflow-hidden"
                    >
                      {suggestions.map((s) => (
                        <button
                          key={s.nombre}
                          onClick={() => handleSelect(s.nombre, s.zona)}
                          className="w-full text-left px-5 py-3 hover:bg-celeste-light/30 transition-colors flex items-center justify-between text-sm"
                        >
                          <span className="text-azul font-semibold">{s.nombre}</span>
                          <span className="text-gris-suave text-xs">{s.zona.nombre}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </AnimatedSection>

          {/* Result */}
          <AnimatePresence mode="wait">
            {searched && (
              <motion.div
                key={selectedZone?.nombre || "not-found"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {selectedZone ? (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-celeste-medium/20 mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading font-bold text-azul">
                          Hacemos envios a {query}!
                        </p>
                        <p className="text-gris-suave text-xs">{selectedZone.nombre}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ShippingCard
                        icon={
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 3 7 10 7 14a5 5 0 0010 0c0-4-5-11-5-11z" />
                          </svg>
                        }
                        title="Agua y Soda"
                        costo={selectedZone.costoAgua === 0 ? "Envio incluido en el precio" : `$${selectedZone.costoAgua}`}
                        tiempo={selectedZone.tiempoAgua}
                      />
                      <ShippingCard
                        icon={
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m17.25 0V6.375c0-.621-.504-1.125-1.125-1.125H15.75" />
                          </svg>
                        }
                        title="Dispensers"
                        costo="Envio e instalacion GRATIS"
                        tiempo={selectedZone.tiempoDispenser}
                        highlight
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-celeste-medium/20 mb-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="font-heading font-bold text-azul mb-1">
                      No encontramos esa localidad
                    </p>
                    <p className="text-gris-suave text-sm">
                      Proba escribiendo el nombre del departamento (ej: Godoy Cruz, Maipu, Lujan de Cuyo).
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* All zones overview */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-8">
              <TextRevealWords className="font-heading font-bold text-2xl sm:text-3xl text-azul">
                Nuestras zonas de envio
              </TextRevealWords>
              <p className="text-gris-suave text-sm mt-2">
                Cubrimos toda la provincia de Mendoza
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {shippingZones.map((zone) => (
              <StaggerItem key={zone.nombre}>
                <div className="bg-white rounded-3xl p-6 border border-celeste-medium/20 hover:shadow-xl hover:shadow-celeste/10 transition-all duration-500 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-celeste-neon" />
                    <h3 className="font-heading font-bold text-azul text-lg">{zone.nombre}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {zone.departamentos.map((d) => (
                      <span
                        key={d}
                        className="text-xs bg-celeste-light/50 text-azul px-2.5 py-1 rounded-lg font-heading font-medium"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gris-suave">Agua/Soda:</span>
                      <span className="text-azul font-semibold">{zone.tiempoAgua}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gris-suave">Dispensers:</span>
                      <span className="text-azul font-semibold">{zone.tiempoDispenser}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gris-suave">Costo envio:</span>
                      <span className="text-celeste-neon font-heading font-bold">Gratis</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Info banner */}
          <AnimatedSection delay={200}>
            <div className="mt-10 bg-negro rounded-3xl p-6 sm:p-8 border border-celeste-neon/10 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <InfoBadge
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25" />
                    </svg>
                  }
                  text="Envio gratis en todo"
                />
                <InfoBadge
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.648-3.014a.75.75 0 01-.226-1.197l7.5-7.5a.75.75 0 011.197.226L17.17 11.42a.75.75 0 01-1.197.226l-7.5 7.5a.75.75 0 01-.226-1.197z" />
                    </svg>
                  }
                  text="Instalacion profesional gratis"
                />
                <InfoBadge
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622" />
                    </svg>
                  }
                  text="Garantia incluida"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function ShippingCard({
  icon,
  title,
  costo,
  tiempo,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  costo: string;
  tiempo: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 border ${
      highlight
        ? "bg-celeste-neon/5 border-celeste-neon/20"
        : "bg-celeste-light/20 border-celeste-medium/15"
    }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
        highlight ? "bg-celeste-neon/15 text-celeste-neon" : "bg-celeste/10 text-celeste"
      }`}>
        {icon}
      </div>
      <h4 className="font-heading font-bold text-azul text-sm mb-3">{title}</h4>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gris-suave">Costo:</span>
          <span className={`font-heading font-bold ${highlight ? "text-celeste-neon" : "text-azul"}`}>{costo}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gris-suave">Tiempo:</span>
          <span className="text-azul font-semibold">{tiempo}</span>
        </div>
      </div>
    </div>
  );
}

function InfoBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-celeste-glow">
      <div className="text-celeste-neon">{icon}</div>
      <span className="font-heading font-semibold text-sm">{text}</span>
    </div>
  );
}
