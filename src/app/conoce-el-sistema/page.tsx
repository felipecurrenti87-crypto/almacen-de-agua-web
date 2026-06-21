"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import WaveDivider from "@/components/WaveDivider";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import { business } from "@/data/business";

/* ─────────────────────────────────────────────
   Brand colors: navy #1C3055 · azul medio #639BB6 · azul claro #BBD6E1
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/* ─────────────────────────────────────────────
   Data (copy intacto)
   ───────────────────────────────────────────── */
const tradicional = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25V3.375a1.125 1.125 0 011.125-1.125h9.75a1.125 1.125 0 011.125 1.125v7.875m-13.5 3h13.5m0 0l2.25 3h1.125a1.125 1.125 0 001.125-1.125v-3.375a1.125 1.125 0 00-.531-.969l-2.969-1.781" />
      </svg>
    ),
    title: "Recorrido por zona",
    desc: "Nuestro camion recorre tu barrio en su ruta habitual. Si estas en casa, te dejamos el agua.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Registro simple",
    desc: "Te registras una vez con tu direccion y datos de contacto para que sepamos donde entregarte.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Pago en el momento",
    desc: "Pagas cuando recibis el agua. Efectivo o transferencia, como te resulte mas comodo.",
  },
];

const inteligente = [
  {
    num: "01",
    title: "Registrate una vez",
    desc: "Nombre, direccion y cada cuanto consumis agua. 30 segundos. Una sola vez.",
  },
  {
    num: "02",
    title: "Te avisamos antes de que se termine",
    desc: 'El sistema calcula cuando se te acaba el bidon. Cuando se acerca la fecha, te escribimos por WhatsApp: "Hola Juan, calculamos que en 2 dias se te termina el agua. Te llevamos?"',
  },
  {
    num: "03",
    title: "Confirmas y recibis",
    desc: "Respondes \"Si\" por WhatsApp. Te damos una franja horaria confirmada y podes seguir el camion en vivo hasta tu puerta.",
  },
];

const comparacion = [
  { label: "Como pedis", trad: "Nos llamas o nos frenas en la calle", smart: "Te avisamos por WhatsApp" },
  { label: "Sabes cuando llega", trad: "Pasa por tu zona, si estas te dejamos", smart: "Franja horaria confirmada" },
  { label: "Seguimiento", trad: "No disponible", smart: "Tracking en vivo del camion" },
  { label: "Si no estas", trad: "Se pierde la visita hasta la proxima ronda", smart: "Se reprograma en el momento" },
  { label: "Precio", trad: "Precio regular", smart: "Precio preferencial" },
  { label: "Registro", trad: "Una vez, con tus datos basicos", smart: "Una vez, 30 segundos" },
  { label: "Calidad del agua", trad: "La misma", smart: "La misma" },
];

const beneficiosPrecio = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Precio preferencial",
    desc: "Pagas menos por bidon que en el reparto tradicional.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Precio fijo",
    desc: "Siempre el mismo valor. Sin recargos, sin variaciones, sin sorpresas.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Ahorras sin resignar nada",
    desc: "Misma agua, misma calidad, mejor precio.",
  },
];

export default function ConoceElSistemaPage() {
  return (
    <div>
      {/* ══════════════════════════════════════════
          HERO — navy
          ══════════════════════════════════════════ */}
      <section className="relative bg-[#1C3055] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 brand-texture opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm text-white brand-eyebrow text-xs px-4 py-2 rounded-full border border-white/[0.18] mb-6">
              Nuestro sistema
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-bold text-white leading-[1.06]"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}
          >
            Dos formas de recibir tu agua.{" "}
            <em className="not-italic italic text-[#BBD6E1]">Vos elegis.</em>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-quicksand text-white/85 max-w-[550px] mx-auto mt-5 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            Reparto Tradicional o Recarga Inteligente. Ambas con la misma
            calidad. Una es mas practica y mas economica.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <WaveDivider color="#FFFFFF" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REPARTO TRADICIONAL — claro
          ══════════════════════════════════════════ */}
      <section className="relative pt-8 pb-20 sm:pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-16">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">
                Opcion 1
              </span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-bold text-[#1C3055] mt-4 mb-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                Reparto Tradicional
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={140}>
              <p className="font-quicksand text-[#5A6B7D] text-sm sm:text-base max-w-lg mx-auto">
                El sistema de siempre, con la calidad de siempre. Nuestro camion
                recorre tu zona en dias y horarios habituales. Si estas en casa,
                te dejamos el agua.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {tradicional.map((item) => (
              <StaggerItem key={item.title}>
                <div className="relative rounded-2xl p-6 sm:p-7 h-full border border-[#BBD6E1]/60 bg-[#EEF5F8] transition-all duration-500 hover:border-[#639BB6]/50 hover:shadow-[0_12px_40px_-12px_rgba(28,48,85,0.18)] hover:-translate-y-1">
                  <span className="text-[#639BB6] mb-4 block">{item.icon}</span>
                  <h3 className="font-heading font-bold text-[#1C3055] text-lg sm:text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="font-quicksand text-[#5A6B7D] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={300}>
            <p className="font-quicksand text-[#5A6B7D]/80 text-sm text-center max-w-xl mx-auto mt-10 leading-relaxed">
              Como la visita no es coordinada previamente, puede suceder que no
              estes cuando pasamos o que necesites agua un dia que no es de
              reparto. Por eso creamos otra opcion.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECARGA INTELIGENTE — tinte claro
          ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-24 bg-[#EEF5F8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-16">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">
                Opcion 2
              </span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-bold text-[#1C3055] mt-4 mb-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                Recarga{" "}
                <em className="not-italic italic text-[#639BB6]">Inteligente</em>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={140}>
              <p className="font-quicksand text-[#5A6B7D] text-sm sm:text-base max-w-lg mx-auto">
                Mas practica, mas puntual y mas economica.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {inteligente.map((step, idx) => (
              <AnimatedSection key={step.num} delay={idx * 100}>
                <div className="relative rounded-2xl p-6 sm:p-7 h-full border-2 border-[#639BB6]/35 bg-white transition-all duration-500 hover:border-[#639BB6]/70 hover:shadow-[0_14px_44px_-14px_rgba(28,48,85,0.22)] hover:-translate-y-1">
                  <span className="font-heading font-bold text-sm tracking-[2px] text-[#639BB6] block mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-heading font-bold text-[#1C3055] text-lg sm:text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="font-quicksand text-[#5A6B7D] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPARACION — claro
          ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">
                Comparacion
              </span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-bold text-[#1C3055] mt-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                Cual te conviene?
              </h2>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={150}>
            <div className="rounded-2xl border border-[#BBD6E1]/70 overflow-hidden shadow-[0_18px_50px_-24px_rgba(28,48,85,0.3)]">
              {/* Header */}
              <div className="grid grid-cols-3 bg-[#EEF5F8]">
                <div className="p-4 sm:p-5" />
                <div className="p-4 sm:p-5 text-center border-l border-[#BBD6E1]/60">
                  <span className="font-heading font-bold text-[#1C3055] text-sm sm:text-base">
                    Reparto Tradicional
                  </span>
                </div>
                <div className="p-4 sm:p-5 text-center border-l border-[#639BB6]/30 bg-[#639BB6]/10">
                  <span className="font-heading font-bold text-[#1C3055] text-sm sm:text-base">
                    Recarga Inteligente
                  </span>
                </div>
              </div>

              {comparacion.map((row, idx) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 ${idx % 2 === 0 ? "bg-white" : "bg-[#EEF5F8]/50"} border-t border-[#BBD6E1]/50`}
                >
                  <div className="p-4 sm:p-5 flex items-center">
                    <span className="font-heading font-semibold text-[#1C3055] text-xs sm:text-sm">
                      {row.label}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex items-center border-l border-[#BBD6E1]/50">
                    <span className="font-quicksand text-[#5A6B7D] text-xs sm:text-sm leading-snug">
                      {row.trad}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex items-center border-l border-[#639BB6]/30 bg-[#639BB6]/[0.06]">
                    <span
                      className={`font-quicksand text-xs sm:text-sm leading-snug ${
                        row.label === "Precio"
                          ? "font-bold text-[#1C3055]"
                          : "text-[#3f5063]"
                      }`}
                    >
                      {row.smart}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          POR QUE ES MAS BARATA — tinte claro
          ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-[#EEF5F8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-16">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">
                Precio
              </span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-bold text-[#1C3055] mt-4 mb-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                Mas economica porque es mas{" "}
                <em className="not-italic italic text-[#639BB6]">eficiente</em>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={140}>
              <p className="font-quicksand text-[#5A6B7D] text-sm sm:text-base max-w-xl mx-auto">
                Al saber de antemano cuantos clientes necesitan agua y donde
                estan, armamos rutas mas cortas, gastamos menos combustible y
                reducimos las visitas sin entrega. Ese ahorro te lo trasladamos
                a vos con un precio preferencial fijo.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {beneficiosPrecio.map((item) => (
              <StaggerItem key={item.title}>
                <div className="relative rounded-2xl p-6 sm:p-7 h-full border border-[#BBD6E1]/60 bg-white transition-all duration-500 hover:border-[#639BB6]/50 hover:shadow-[0_12px_40px_-12px_rgba(28,48,85,0.18)] hover:-translate-y-1">
                  <span className="text-[#639BB6] mb-4 block">{item.icon}</span>
                  <h3 className="font-heading font-bold text-[#1C3055] text-lg sm:text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="font-quicksand text-[#5A6B7D] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL — navy
          ══════════════════════════════════════════ */}
      <section className="relative pt-20 pb-24 sm:pt-24 sm:pb-32 bg-[#1C3055] overflow-hidden">
        <div className="absolute inset-0 brand-texture opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Registrate{" "}
              <em className="not-italic italic text-[#BBD6E1]">gratis</em>.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="font-quicksand text-white/75 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10">
              30 segundos. Sin app. Sin compromiso. Por WhatsApp.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/quiero-ser-cliente"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-[#1C3055] font-heading font-bold text-lg transition-all duration-300 hover:bg-[#BBD6E1] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]"
              >
                Quiero ser cliente
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={`${business.whatsappLink}?text=${encodeURIComponent("Hola! Tengo una consulta sobre el sistema de Recarga Inteligente")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/35 text-white font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/60"
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="font-quicksand text-white/45 text-xs sm:text-sm mt-6">
              Sin costo. Sin app. Sin compromiso.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider color="#FFFFFF" />
        </div>
      </section>
    </div>
  );
}
