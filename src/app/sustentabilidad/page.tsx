"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import WaterCaustics from "@/components/WaterCaustics";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

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

/* ── Stats de impacto ── */
const stats = [
  {
    value: "40",
    unit: "botellas",
    label: "menos por cada bidón",
    desc: "Un bidón retornable de 20L reemplaza a unas 40 botellas descartables de 500ml. Cada recarga es plástico que no se fabrica ni se tira.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-5 0v2.5L7.5 9A4 4 0 007 11v8a2 2 0 002 2h6a2 2 0 002-2v-8a4 4 0 00-.5-2L14 5.5V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    value: "100%",
    unit: "de las tapas",
    label: "que recuperamos, recicladas",
    desc: "Juntamos y reciclamos las tapas de los botellones. No terminan en la basura: vuelven a tener una vida útil.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5l2.6 4.5H5l2.5-4.5zM4.2 11.5L2 15.3a2 2 0 001.7 3h4.6m9-13.8l2.6 4.5m1.3 2.5l1.6 2.8a2 2 0 01-1.7 3h-4.4m-6.9 0L9 21.5m6.5-1.5l1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.3 18.5h4.4m4.4 0H21M9 21.5l-1.5-1.5 1.5-1.5" />
      </svg>
    ),
  },
  {
    value: "+1.000",
    unit: "hogares",
    label: "ya eligen el retornable",
    desc: "Cada familia que se suma al sistema de recarga deja de comprar agua en botellas de un solo uso, todas las semanas.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

/* ── Cómo funciona el ciclo retornable ── */
const ciclo = [
  {
    num: "01",
    title: "Se usa",
    desc: "Recibís el bidón lleno y lo usás en casa o en la oficina. El mismo envase, una y otra vez.",
  },
  {
    num: "02",
    title: "Vuelve",
    desc: "Cuando se termina, retiramos el bidón vacío en la próxima entrega. No queda plástico dando vueltas.",
  },
  {
    num: "03",
    title: "Se sanitiza",
    desc: "Lavamos y sanitizamos cada envase con controles de calidad antes de volver a llenarlo.",
  },
  {
    num: "04",
    title: "Se recarga",
    desc: "El bidón vuelve a salir lleno de agua purificada. Cero envases descartables en el camino.",
  },
];

export default function SustentabilidadPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#EEF5F8] via-white to-[#E8F2F7] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-[460px] h-[460px] rounded-full bg-[#BBD6E1]/40 blur-[110px]" />
          <div className="absolute top-1/4 -right-28 w-[420px] h-[420px] rounded-full bg-emerald-300/15 blur-[120px]" />
          <WaterCaustics />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 brand-eyebrow text-xs px-4 py-2 rounded-full border border-emerald-500/20 mb-6">
              <span className="text-sm">♻️</span> Nuestro compromiso
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-bold uppercase gradient-text-glow leading-[1.06]"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 3.8rem)" }}
          >
            Sustentabilidad
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-quicksand text-[#52647A] max-w-[560px] mx-auto mt-5 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            Llevar agua a tu casa no tiene por qué generar montañas de plástico.
            Nuestro sistema retornable reduce los envases de un solo uso y
            reciclamos las tapas de cada botellón.
          </motion.p>
        </div>
      </section>

      {/* ── STATS DE IMPACTO ── */}
      <section className="relative py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-18">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">El impacto</span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-semibold text-[#1C3055] mt-4 tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                Menos plástico, misma agua de calidad
              </h2>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="relative h-full rounded-2xl p-6 sm:p-7 border border-[#BBD6E1]/60 bg-[#EEF5F8] transition-all duration-500 hover:border-emerald-400/50 hover:shadow-[0_12px_40px_-12px_rgba(28,48,85,0.18)] hover:-translate-y-1">
                  <span className="inline-flex w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 items-center justify-center mb-4">
                    {s.icon}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-bold text-[#1C3055] text-3xl sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="font-body font-bold text-[#639BB6] text-sm">
                      {s.unit}
                    </span>
                  </div>
                  <p className="font-heading font-semibold text-[#1C3055] text-sm mt-1 mb-3">
                    {s.label}
                  </p>
                  <p className="font-quicksand text-[#52647A] text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── EL CICLO RETORNABLE ── */}
      <section className="relative py-20 sm:py-28 bg-[#EEF5F8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-18">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">El sistema</span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-semibold text-[#1C3055] mt-4 mb-4 tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                El mismo envase, una y otra vez
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={140}>
              <p className="font-quicksand text-[#52647A] text-sm sm:text-base max-w-xl mx-auto">
                El bidón retornable es el corazón de un sistema circular: no se
                descarta, vuelve, se sanitiza y se recarga.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ciclo.map((c, idx) => (
              <AnimatedSection key={c.num} delay={idx * 90}>
                <div className="relative h-full rounded-2xl p-6 bg-white border border-[#BBD6E1]/60 hover:shadow-[0_12px_40px_-12px_rgba(28,48,85,0.18)] transition-all duration-500">
                  <span className="font-heading font-bold text-sm tracking-[2px] text-emerald-600 block mb-3">
                    {c.num}
                  </span>
                  <h3 className="font-heading font-semibold uppercase text-[#1C3055] text-lg mb-2">
                    {c.title}
                  </h3>
                  <p className="font-quicksand text-[#52647A] text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECICLAMOS LAS TAPAS ── */}
      <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimatedSection>
              <div>
                <span className="brand-eyebrow text-emerald-600 text-xs block mb-4">
                  Reciclaje
                </span>
                <h2
                  className="font-heading font-semibold text-[#1C3055] mb-5 tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}
                >
                  También reciclamos las tapas
                </h2>
                <p className="font-quicksand text-[#52647A] text-sm sm:text-base leading-relaxed mb-4 max-w-lg">
                  Las tapas plásticas de los botellones son uno de los residuos
                  más difíciles de recuperar. Por eso las juntamos por separado y
                  las derivamos a reciclaje en lugar de tirarlas.
                </p>
                <p className="font-quicksand text-[#52647A] text-sm sm:text-base leading-relaxed max-w-lg">
                  Es un gesto chico que, multiplicado por cada hogar y cada
                  recarga, evita que miles de tapas terminen como basura.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-[#EEF5F8] border border-emerald-200/50 p-8 sm:p-10 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-5">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5l2.6 4.5H5l2.5-4.5zM4.2 11.5L2 15.3a2 2 0 001.7 3h4.6m9-13.8l2.6 4.5m1.3 2.5l1.6 2.8a2 2 0 01-1.7 3h-4.4M9 21.5l-1.5-1.5 1.5-1.5" />
                  </svg>
                </div>
                <p className="font-heading font-bold text-[#1C3055] text-2xl sm:text-3xl mb-1">
                  Nada de tapas a la basura
                </p>
                <p className="font-quicksand text-[#52647A] text-sm">
                  Las recuperamos en cada visita de reparto.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative pt-16 pb-24 sm:pt-20 sm:pb-32 bg-[#1C3055] overflow-hidden">
        <div className="absolute inset-0 brand-texture opacity-[0.018] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2
              className="font-heading font-semibold text-white mb-4 tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.6rem)" }}
            >
              Sumate al sistema{" "}
              <em className="not-italic italic text-[#BBD6E1]">retornable</em>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <p className="font-quicksand text-white/75 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10">
              Tomá agua de calidad y generá menos plástico, sin pensar en nada.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Link
              href="/quiero-ser-cliente"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-[#1C3055] font-body font-bold text-lg transition-all duration-300 hover:bg-[#BBD6E1] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]"
            >
              Quiero ser cliente
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
