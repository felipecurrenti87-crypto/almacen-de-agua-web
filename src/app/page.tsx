"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import MeshGradientBackground from "@/components/MeshGradientBackground";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

/* ─────────────────────────────────────────────
   A) HERO — 100vh, centrado, mesh gradient
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
   B) CÓMO FUNCIONA — 3 cards glass
   ───────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    numColor: "#5BCBF5",
    title: "Registrate",
    desc: "Completa tus datos en 30 segundos. Una sola vez.",
  },
  {
    num: "02",
    numColor: "#3D87A8",
    title: "Confirma",
    desc: "Te avisamos por WhatsApp cuando estas llegando al final del bidon.",
  },
  {
    num: "03",
    numColor: "#06A4DD",
    title: "Recibi",
    desc: "Seguis el camion en vivo y recibis tu agua en la puerta.",
  },
];

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════
          A) HERO — full viewport, centered
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050E14]">
        <MeshGradientBackground intensity="normal" interactive />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-24 sm:py-32">
          {/* Pill */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm text-[#B2DDF0] text-xs sm:text-sm font-heading font-semibold px-4 py-2 rounded-full border border-white/[0.08] mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Nuevo en Mendoza
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-extrabold text-white leading-[1.08] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Tu agua,{" "}
            <em className="not-italic text-[#5BCBF5] italic">siempre</em> a
            tiempo.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-quicksand font-medium text-[#B2DDF0] max-w-[600px] mx-auto mb-8 sm:mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
          >
            El primer sistema de reparto predictivo de Mendoza. Predice cuando
            se te termina y te avisa antes. Vos confirmas por WhatsApp, nosotros
            te lo llevamos.
          </motion.p>

          {/* Buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/quiero-ser-cliente"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#06A4DD] text-white font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_8px_32px_rgba(6,164,221,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Quiero ser cliente
            </Link>
            <Link
              href="/tienda"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white/[0.05] hover:border-white/40"
            >
              Conoce el sistema
            </Link>
          </motion.div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          B) CÓMO FUNCIONA — dark, glass cards
          ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 md:py-36 bg-[#050E14] overflow-hidden">
        {/* Very subtle blobs */}
        <MeshGradientBackground intensity="subtle" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-14 sm:mb-20">
            <AnimatedSection>
              <span className="font-heading font-semibold text-[#5BCBF5] text-xs uppercase tracking-[3px]">
                El sistema
              </span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-extrabold text-white mt-4 mb-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              >
                Tres pasos.{" "}
                <em className="not-italic italic text-[#5BCBF5]">Cero</em>{" "}
                complicaciones.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <p className="font-quicksand font-medium text-[#B2DDF0]/70 text-sm sm:text-base max-w-md mx-auto">
                Sin app, sin formularios complejos. Solo WhatsApp.
              </p>
            </AnimatedSection>
          </div>

          {/* 3 Glass cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="relative rounded-2xl p-6 sm:p-7 h-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-[20px] transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]">
                  <span
                    className="font-heading font-extrabold text-sm tracking-[2px] block mb-4"
                    style={{ color: step.numColor }}
                  >
                    {step.num}
                  </span>
                  <h3 className="font-heading font-bold text-white text-xl sm:text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="font-quicksand text-[#B2DDF0]/60 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          C) NUESTRO LOCAL — split layout
          ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 md:py-36 bg-[#050E14] overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <AnimatedSection>
              <div>
                <span className="font-heading font-semibold text-[#5BCBF5] text-xs uppercase tracking-[3px] block mb-4">
                  Visitanos
                </span>
                <h2
                  className="font-heading font-extrabold text-white mb-5"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                >
                  Estamos en{" "}
                  <em className="not-italic italic text-[#5BCBF5]">Mendoza</em>{" "}
                  desde hace años.
                </h2>
                <p className="font-quicksand text-[#B2DDF0]/60 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                  Somos un local fisico real, con mas de 1.000 hogares
                  atendidos. Pasa a conocernos o registrate para que te llevemos
                  el agua a casa.
                </p>
                <a
                  href={business.googleMapsEmbed.replace("/embed?", "/dir/?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#5BCBF5] font-heading font-bold text-sm hover:text-white transition-colors group"
                >
                  Como llegar
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={150}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about-store.jpg"
                  alt="Tienda Almacen de Agua - Godoy Cruz, Mendoza"
                  width={700}
                  height={525}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Navy gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050E14]/70 via-transparent to-transparent" />
                {/* Address badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/[0.06] backdrop-blur-md rounded-xl px-4 py-3 border border-white/[0.08]">
                  <p className="font-heading font-bold text-white text-sm">
                    {business.direccion}
                  </p>
                  <p className="font-quicksand text-[#B2DDF0]/60 text-xs mt-0.5">
                    {business.horarios.semana} | {business.horarios.sabado}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          D) CTA FINAL — mesh gradient intense
          ══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 md:py-40 bg-[#050E14] overflow-hidden">
        <MeshGradientBackground intensity="intense" interactive />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2
              className="font-heading font-extrabold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Listo para no quedarte{" "}
              <em className="not-italic italic text-[#5BCBF5]">nunca mas</em>{" "}
              sin agua?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="font-quicksand font-medium text-[#B2DDF0]/70 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10">
              Registrate gratis al Reparto Inteligente. 30 segundos. Por
              WhatsApp.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <Link
              href="/quiero-ser-cliente"
              className="inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full bg-[#06A4DD] text-white font-heading font-bold text-lg transition-all duration-300 hover:shadow-[0_8px_40px_rgba(6,164,221,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Quiero ser cliente
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="font-quicksand text-[#B2DDF0]/40 text-xs sm:text-sm mt-6">
              Sin costo. Sin app. Sin compromiso.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
