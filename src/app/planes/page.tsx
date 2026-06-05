"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/products";
import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import MeshGradientBackground from "@/components/MeshGradientBackground";

type PlanMode = "hogar" | "comercio";

/* ── Plan data extracted from official plan images ── */
interface Plan {
  nombre: string;
  precio: number;
  precioTienda?: number;
  descripcion: string;
  detalles: string[];
  destacado?: boolean;
  tag?: string;
}

const planesHogar: Plan[] = [
  {
    nombre: "Basico",
    precio: 15000,
    precioTienda: 11000,
    descripcion: "Ideal para personas solas o parejas con consumo moderado.",
    detalles: [
      "2 Bidones Retornables de 20L/mes",
      "Envio programado sin cargo en Gran Mendoza",
      "Ahorra un 27% retirando en tienda ($5.500 c/u)",
      "Ideal con dispenser propio o bomba USB",
    ],
  },
  {
    nombre: "Clasico",
    precio: 30000,
    precioTienda: 22000,
    descripcion: "El plan preferido de las familias mendocinas. Agua pura ideal para cocinar e hidratacion diaria.",
    destacado: true,
    tag: "Popular",
    detalles: [
      "4 Bidones Retornables de 20L/mes",
      "Reparto semanal directo a tu puerta",
      "Ahorra un 27% retirando en tienda ($5.500 c/u)",
      "Compatible con dispensers de pie",
    ],
  },
  {
    nombre: "Familiar",
    precio: 45000,
    precioTienda: 33000,
    descripcion: "Para familias numerosas o deportistas que priorizan hidratacion constante.",
    detalles: [
      "6 Bidones Retornables de 20L/mes",
      "Entrega semanal con prioridad de reparto",
      "Ahorra un 27% retirando en tienda ($5.500 c/u)",
      "Excelente para dispenser de pie clasico",
    ],
  },
];

const planesComercio: Plan[] = [
  {
    nombre: "Oficina Clasico",
    precio: 45000,
    descripcion: "Ideal para estudios profesionales, oficinas chicas o consultorios medicos.",
    detalles: [
      "Dispenser Frio/Calor Bacope en comodato",
      "4 Bidones de 20L/mes incluidos",
      "Higienizacion y mantenimiento tecnico incluido",
      "Reparto corporativo semanal sin cargo",
      "Factura corporativa A o B",
    ],
  },
  {
    nombre: "Oficina Alto Consumo",
    precio: 240000,
    descripcion: "Para empresas medianas con equipos y consumo escalable.",
    destacado: true,
    tag: "Empresas",
    detalles: [
      "Dispenser Frio/Calor Bacope en comodato",
      "30 Bidones de 20L/mes incluidos",
      "Entrega semanal prioritaria en Mendoza",
      "Higienizacion semestral bonificada 100%",
      "Factura A o B con precios congelados",
    ],
  },
  {
    nombre: "Red Ilimitada",
    precio: 45000,
    tag: "Ilimitado",
    descripcion: "Dispenser conectado a tu red de agua con filtros purificadores premium.",
    detalles: [
      "Dispenser Red Frio/Calor en comodato",
      "Agua fria y caliente ILIMITADA",
      "Instalacion profesional bonificada",
      "Cambio anual de filtros sin cargo",
      "Factura corporativa A o B",
    ],
  },
];

const beneficiosComunes = [
  { icon: "truck", text: "Envio e instalacion sin cargo" },
  { icon: "wrench", text: "Soporte tecnico e higienizacion semestral" },
  { icon: "shield", text: "Recambio de equipo en 24hs habiles" },
  { icon: "refresh", text: "Hidratacion constante garantizada" },
];

function BenefitIcon({ icon }: { icon: string }) {
  const cls = "w-5 h-5";
  switch (icon) {
    case "truck":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>);
    case "wrench":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
    case "shield":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>);
    case "refresh":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>);
    default: return null;
  }
}

/* ── Liquid Glass Plan Card ── */
function PlanCard({ plan, index, mode }: { plan: Plan; index: number; mode: PlanMode }) {
  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el plan ${mode === "hogar" ? "Hogar" : "Comercio"} "${plan.nombre}" de ${formatPrice(plan.precio)}/mes. Quiero mas informacion.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative group"
    >
      {/* Outer gradient border wrapper */}
      <div className={`relative rounded-[1.5rem] p-[1px] overflow-hidden ${
        plan.destacado ? "shadow-[0_0_40px_rgba(56,189,248,0.15)]" : ""
      }`}>
        {/* Gradient border */}
        <div className={`absolute inset-0 rounded-[1.5rem] transition-all duration-500 ${
          plan.destacado
            ? "bg-gradient-to-br from-celeste-neon/60 via-celeste-glow/20 to-celeste-neon/50 group-hover:from-celeste-neon/80 group-hover:to-celeste-neon/70"
            : "bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-white/[0.08] group-hover:from-celeste-neon/30 group-hover:to-celeste-glow/20"
        }`} />

        {/* Card body */}
        <div className="relative rounded-[1.5rem] bg-gradient-to-br from-negro-light/[0.97] via-negro/[0.99] to-negro-medium/[0.97] backdrop-blur-2xl p-6 sm:p-8 h-full flex flex-col">
          {/* Top reflective highlight */}
          <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-[1.5rem] pointer-events-none" />

          {/* Glow orb behind price */}
          {plan.destacado && (
            <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[200px] h-[120px] rounded-full bg-celeste-neon/8 blur-[60px] pointer-events-none animate-orb-pulse" />
          )}

          {/* Tag */}
          {plan.tag && (
            <div className="relative mb-4">
              <span className={`inline-block text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                plan.destacado
                  ? "bg-celeste-neon/20 text-celeste-neon border border-celeste-neon/30"
                  : "bg-white/[0.06] text-celeste-glow border border-white/10"
              }`}>
                {plan.tag}
              </span>
            </div>
          )}

          {/* Plan name */}
          <h3 className="relative font-heading font-bold text-white text-lg sm:text-xl mb-2">
            {plan.nombre}
          </h3>

          {/* Price */}
          <div className="relative mb-4">
            <span className={`text-4xl sm:text-5xl font-bold font-heading tracking-tight ${
              plan.destacado ? "gradient-text-glow" : "text-white"
            }`}>
              {formatPrice(plan.precio)}
            </span>
            <span className="text-gris-dark text-sm ml-1">/mes</span>
            {plan.precioTienda && (
              <p className="text-xs text-celeste-glow/70 mt-1 font-heading">
                En tienda: {formatPrice(plan.precioTienda)}/mes
              </p>
            )}
          </div>

          {/* Description */}
          <p className="relative text-gris-dark text-sm leading-relaxed mb-6">
            {plan.descripcion}
          </p>

          {/* Divider */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-celeste-neon/15 to-transparent mb-6" />

          {/* Details */}
          <ul className="relative space-y-3 mb-8 flex-1">
            {plan.detalles.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <svg className="w-4 h-4 mt-0.5 text-celeste-neon flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gris-dark/90">{d}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={`${business.whatsappLink}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-300 ${
              plan.destacado
                ? "liquid-glass-btn text-white"
                : "border border-white/10 text-white hover:border-celeste-neon/40 hover:bg-celeste-neon/5"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar este Plan
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Wave Background SVG ── */
function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.035]">
      <svg className="absolute bottom-0 left-0 w-[200%] h-[300px] wave-animate" viewBox="0 0 2880 320" fill="none" preserveAspectRatio="none">
        <path d="M0 224l48-10.7C96 203 192 181 288 186.7 384 192 480 224 576 229.3 672 235 768 213 864 186.7 960 160 1056 128 1152 128s192 32 288 58.7c96 26.3 192 48.3 288 42.6 96-5.3 192-37.3 288-48 96-10.3 192 0.3 288 16 96 16.3 192 37.3 240 48l48 10.7V320H0z" fill="currentColor" className="text-celeste-neon" />
      </svg>
      <svg className="absolute bottom-[40px] left-0 w-[200%] h-[250px] wave-animate-slow" viewBox="0 0 2880 320" fill="none" preserveAspectRatio="none">
        <path d="M0 256l48-16c48-16 144-48 240-48s192 32 288 37.3c96 5.7 192-16.3 288-21.3 96-5 192 5 288 26.7 96 21.3 192 53.3 288 48 96-5.7 192-48.3 288-58.7 96-10.3 192 10.7 288 21.3 96 10.7 192 10.7 240 10.7h48V320H0z" fill="currentColor" className="text-celeste-glow" />
      </svg>
      <svg className="absolute top-0 left-0 w-[200%] h-[250px] wave-animate" style={{ animationDuration: "22s" }} viewBox="0 0 2880 320" fill="none" preserveAspectRatio="none">
        <path d="M0 64l48 5.3C96 75 192 85 288 112s192 69 288 74.7c96 5.3 192-16.7 288-16.7s192 21 288 42.7c96 21.3 192 42.3 288 37.3 96-5.3 192-37.3 288-48 96-10.3 192 0.3 288 5.3 96 5.7 192 5.7 240 5.7h48V0H0z" fill="currentColor" className="text-celeste-neon" />
      </svg>
    </div>
  );
}

export default function PlanesPage() {
  const [mode, setMode] = useState<PlanMode>("hogar");
  const planes = mode === "hogar" ? planesHogar : planesComercio;

  return (
    <div className="min-h-screen bg-[#050E14] text-white relative">
      <MeshGradientBackground intensity="normal" interactive />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="inline-block bg-celeste-neon/10 text-celeste-neon text-sm font-heading font-bold px-5 py-2 rounded-full mb-6 border border-celeste-neon/20">
              Cotizador en tiempo real
            </span>
          </AnimatedSection>
          <TextRevealWords
            as="h1"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6"
          >
            Elegi el plan ideal para vos
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-dark text-base sm:text-lg max-w-2xl mx-auto">
              Selecciona tus preferencias y te recomendamos la opcion de consumo mas conveniente para tu hogar o empresa.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mode toggle */}
      <section className="relative pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection delay={200}>
            <div className="flex justify-center mb-10 sm:mb-14">
              <div className="relative flex items-center gap-1 rounded-2xl p-1.5 overflow-hidden">
                {/* Glass background for toggle */}
                <div className="absolute inset-0 bg-negro-medium/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl" />
                {(["hogar", "comercio"] as PlanMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="relative px-6 sm:px-10 py-3.5 rounded-xl text-sm sm:text-base font-heading font-bold transition-colors duration-300 z-10"
                    style={{ color: mode === m ? "#0A0A0F" : "#e2e8f0" }}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="plan-mode-pill"
                        className="absolute inset-0 bg-celeste-neon rounded-xl shadow-[0_0_24px_rgba(56,189,248,0.3)]"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {m === "hogar" ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                          Hogar
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          Comercio
                        </>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Plan Cards Grid */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
            >
              {planes.map((plan, i) => (
                <PlanCard key={plan.nombre} plan={plan} index={i} mode={mode} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white text-center mb-3">
              Todos los planes incluyen
            </h3>
            <p className="text-gris-dark text-sm text-center mb-10 max-w-lg mx-auto">
              Sin importar el plan que elijas, siempre contamos con vos.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {beneficiosComunes.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative rounded-2xl p-[1px] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-celeste-neon/15 via-transparent to-celeste-glow/10 group-hover:from-celeste-neon/30 group-hover:to-celeste-glow/20 transition-all duration-500" />
                <div className="relative rounded-2xl bg-gradient-to-br from-negro-light/95 to-negro/98 backdrop-blur-xl p-4 sm:p-6 text-center h-full">
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
      </section>

      {/* CTA bottom */}
      <section className="relative pb-20 sm:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="relative rounded-[2rem] p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-celeste-neon/40 via-celeste-glow/15 to-celeste-neon/40 rounded-[2rem]" />
              <div className="relative rounded-[2rem] bg-gradient-to-br from-negro-light/95 to-negro/98 backdrop-blur-xl p-8 sm:p-12 text-center">
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.03] to-transparent rounded-t-[2rem] pointer-events-none" />
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[200px] h-[100px] rounded-full bg-celeste-neon/6 blur-[50px] pointer-events-none" />
                <h3 className="relative font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
                  No sabes que plan elegir?
                </h3>
                <p className="relative text-gris-dark text-sm sm:text-base mb-8 max-w-md mx-auto">
                  Registrate y te asesoramos personalmente para armar el plan perfecto para tu hogar o negocio.
                </p>
                <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/quiero-ser-cliente"
                    className="liquid-glass-btn flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-white text-base"
                  >
                    Quiero ser cliente
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <a
                    href={business.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-btn-outline flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-celeste-glow text-base"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
