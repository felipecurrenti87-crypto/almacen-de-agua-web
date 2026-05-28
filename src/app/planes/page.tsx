"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/products";
import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";

type PlanMode = "hogar" | "comercio";
type ComercioType = "bidon" | "red";

const PRECIO_BIDON = 7500;
const BASE_COMERCIO = 15000;
const PRECIO_RED = 45000;

const beneficiosComunes = [
  { icon: "truck", text: "Envio a domicilio sin cargo" },
  { icon: "wrench", text: "Soporte tecnico incluido" },
  { icon: "shield", text: "Higienizacion semestral gratuita" },
  { icon: "refresh", text: "Reposicion en 24hs ante fallas" },
];

function BenefitIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "truck":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    case "wrench":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "refresh":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PlanesPage() {
  const [mode, setMode] = useState<PlanMode>("hogar");
  const [comercioType, setComercioType] = useState<ComercioType>("bidon");
  const [bidones, setBidones] = useState(4);

  const minBidones = mode === "hogar" ? 2 : 4;
  const maxBidones = mode === "hogar" ? 6 : 30;

  // Adjust bidones when switching modes
  const handleModeChange = (newMode: PlanMode) => {
    setMode(newMode);
    if (newMode === "hogar") {
      setBidones(Math.min(Math.max(bidones, 2), 6));
    } else {
      setBidones(Math.min(Math.max(bidones, 4), 30));
    }
  };

  const precio = useMemo(() => {
    if (mode === "hogar") {
      return PRECIO_BIDON * bidones;
    }
    if (comercioType === "red") {
      return PRECIO_RED;
    }
    return BASE_COMERCIO + PRECIO_BIDON * bidones;
  }, [mode, comercioType, bidones]);

  const isRed = mode === "comercio" && comercioType === "red";

  // WhatsApp message
  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el plan ${mode === "hogar" ? "Hogar" : "Comercio"}${
      mode === "comercio" ? ` (${comercioType === "red" ? "Red" : "Bidon"})` : ""
    }${!isRed ? ` de ${bidones} bidones` : ""}. Precio: ${formatPrice(precio)}/mes. Quiero mas informacion.`
  );

  return (
    <div className="min-h-screen bg-negro text-white">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] rounded-full bg-celeste-neon/6 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-celeste-glow/4 blur-[150px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="inline-block bg-celeste-neon/10 text-celeste-neon text-sm font-heading font-bold px-5 py-2 rounded-full mb-6 border border-celeste-neon/20">
              Planes personalizados
            </span>
          </AnimatedSection>
          <TextRevealWords
            as="h1"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6"
          >
            Tu plan de agua ideal
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-dark text-base sm:text-lg max-w-2xl mx-auto">
              Arma tu plan segun tu consumo. Desliza para elegir la cantidad de
              bidones y obtene tu precio al instante.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Mode toggle */}
          <AnimatedSection delay={200}>
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative flex items-center gap-1 bg-negro-medium rounded-2xl p-1.5 border border-celeste-neon/10">
                {(["hogar", "comercio"] as PlanMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className="relative px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-heading font-bold transition-colors duration-300 z-10"
                    style={{
                      color: mode === m ? "#0A0A0F" : undefined,
                    }}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="plan-mode-pill"
                        className="absolute inset-0 bg-celeste-neon rounded-xl"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">
                      {m === "hogar" ? "Hogar" : "Comercio"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Comercio sub-type */}
          <AnimatePresence>
            {mode === "comercio" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-2 bg-negro-light rounded-xl p-1 border border-celeste-neon/5">
                    {(["bidon", "red"] as ComercioType[]).map((ct) => (
                      <button
                        key={ct}
                        onClick={() => setComercioType(ct)}
                        className={`px-5 py-2 rounded-lg text-sm font-heading font-semibold transition-all duration-300 ${
                          comercioType === ct
                            ? "bg-celeste-neon/15 text-celeste-neon border border-celeste-neon/20"
                            : "text-gris-dark hover:text-white"
                        }`}
                      >
                        {ct === "bidon" ? "Bidon" : "Red (ilimitado)"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main calculator card — liquid glass premium */}
          <AnimatedSection delay={300}>
            <div className="relative rounded-[2rem] p-[1px] overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-celeste-neon/40 via-celeste-glow/10 to-celeste-neon/30" />
              {/* Inner glow orbs */}
              <div className="absolute top-[-30%] left-[20%] w-[300px] h-[300px] rounded-full bg-celeste-neon/8 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[15%] w-[250px] h-[250px] rounded-full bg-celeste-glow/6 blur-[60px] pointer-events-none" />

              <div className="relative rounded-[2rem] bg-gradient-to-br from-negro-light/95 via-negro/98 to-negro-medium/95 backdrop-blur-xl p-6 sm:p-10 md:p-14">
                {/* Reflective top highlight */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-[2rem] pointer-events-none" />

                {/* Price display */}
                <div className="relative text-center mb-10 sm:mb-14">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 rounded-full bg-celeste-neon/5 blur-[60px]" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={precio}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-5xl sm:text-6xl md:text-8xl font-bold font-heading gradient-text-glow tracking-tight">
                        {formatPrice(precio)}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-gris-dark text-sm sm:text-base mt-3 font-heading tracking-wide uppercase">por mes</p>
                </div>

                {/* Slider section */}
                {!isRed && (
                  <div className="relative mb-10 sm:mb-14 bg-negro-light/40 rounded-2xl p-5 sm:p-7 border border-celeste-neon/8">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm text-gris-dark font-heading font-medium tracking-wide">Bidones por mes</span>
                      <motion.span
                        key={bidones}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl sm:text-4xl font-bold font-heading text-celeste-neon"
                      >
                        {bidones}
                      </motion.span>
                    </div>
                    <input
                      type="range"
                      min={minBidones}
                      max={maxBidones}
                      value={bidones}
                      onChange={(e) => setBidones(Number(e.target.value))}
                      className="w-full h-2.5 rounded-full appearance-none cursor-pointer bg-negro-medium
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-celeste-neon [&::-webkit-slider-thumb]:shadow-[0_0_24px_rgba(56,189,248,0.6)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:shadow-[0_0_36px_rgba(56,189,248,0.8)] [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-celeste-neon [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_24px_rgba(56,189,248,0.6)] [&::-moz-range-thumb]:cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #38BDF8 0%, #7DD3FC ${((bidones - minBidones) / (maxBidones - minBidones)) * 100}%, #1C1C2E ${((bidones - minBidones) / (maxBidones - minBidones)) * 100}%, #1C1C2E 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-gris-dark/50 mt-3 font-heading">
                      <span>{minBidones} bidones</span>
                      <span>{maxBidones} bidones</span>
                    </div>
                  </div>
                )}

                {/* Red unlimited badge */}
                {isRed && (
                  <div className="text-center mb-10 sm:mb-14">
                    <div className="relative inline-flex items-center gap-3 rounded-2xl px-8 py-5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-celeste-neon/15 via-celeste-glow/10 to-celeste-neon/15 border border-celeste-neon/25 rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl" />
                      <svg className="relative w-7 h-7 text-celeste-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="relative text-celeste-glow font-heading font-bold text-lg sm:text-xl">
                        Agua ilimitada por red
                      </span>
                    </div>
                  </div>
                )}

                {/* Price breakdown */}
                <div className="relative rounded-2xl p-5 sm:p-7 mb-8 border border-celeste-neon/8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-celeste-neon/[0.03] to-transparent" />
                  <h4 className="relative font-heading font-bold text-xs text-celeste-glow/70 mb-4 uppercase tracking-[0.15em]">
                    Detalle del plan
                  </h4>
                  <div className="relative space-y-3">
                    {mode === "hogar" && (
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-gris-dark">{bidones} bidones x {formatPrice(PRECIO_BIDON)}</span>
                        <span className="text-white font-bold text-base">{formatPrice(precio)}</span>
                      </div>
                    )}
                    {mode === "comercio" && comercioType === "bidon" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gris-dark">Base comercio</span>
                          <span className="text-white font-semibold">{formatPrice(BASE_COMERCIO)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gris-dark">{bidones} bidones x {formatPrice(PRECIO_BIDON)}</span>
                          <span className="text-white font-semibold">{formatPrice(PRECIO_BIDON * bidones)}</span>
                        </div>
                        <div className="border-t border-celeste-neon/10 pt-3 flex justify-between items-center">
                          <span className="text-celeste-glow font-heading font-bold text-sm">Total mensual</span>
                          <span className="text-celeste-neon font-bold text-lg">{formatPrice(precio)}</span>
                        </div>
                      </>
                    )}
                    {isRed && (
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-gris-dark">Plan Red ilimitado</span>
                        <span className="text-celeste-neon font-bold text-base">{formatPrice(PRECIO_RED)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={`${business.whatsappLink}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 liquid-glass-btn flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-heading font-bold text-white text-base sm:text-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contratar por WhatsApp
                  </a>
                  <Link
                    href="/quiero-ser-cliente"
                    className="flex-1 liquid-glass-btn-outline flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-heading font-bold text-celeste-glow text-base sm:text-lg"
                  >
                    Registrarme como cliente
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Benefits grid */}
          <AnimatedSection delay={400}>
            <div className="mt-12 sm:mt-16">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white text-center mb-8">
                Todos los planes incluyen
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {beneficiosComunes.map((b, i) => (
                  <motion.div
                    key={b.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl p-[1px] overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-celeste-neon/20 via-transparent to-celeste-glow/15 group-hover:from-celeste-neon/35 group-hover:to-celeste-glow/25 transition-all duration-500" />
                    <div className="relative rounded-2xl bg-gradient-to-br from-negro-light/90 to-negro/95 backdrop-blur-lg p-4 sm:p-6 text-center h-full">
                      <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/[0.03] to-transparent rounded-t-2xl pointer-events-none" />
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-celeste-neon/10 flex items-center justify-center text-celeste-neon mx-auto mb-3 group-hover:bg-celeste-neon/20 transition-colors">
                          <BenefitIcon icon={b.icon} />
                        </div>
                        <p className="text-xs sm:text-sm text-gris-dark font-heading font-semibold leading-snug">
                          {b.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Plan images */}
          <AnimatedSection delay={500}>
            <div className="mt-12 sm:mt-16">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white text-center mb-8">
                Nuestros planes en detalle
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { src: "/images/planes/plan-1.png", alt: "Plan Hogar 1" },
                  { src: "/images/planes/plan-2.png", alt: "Plan Hogar 2" },
                  { src: "/images/planes/plan-3.png", alt: "Plan Hogar 3" },
                  { src: "/images/planes/plan-comercio-1.png", alt: "Plan Comercio 1" },
                  { src: "/images/planes/plan-comercio-2.png", alt: "Plan Comercio 2" },
                  { src: "/images/planes/plan-comercio-red.png", alt: "Plan Comercio Red" },
                ].map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-celeste-neon/10 hover:border-celeste-neon/25 transition-colors"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
