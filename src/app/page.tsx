"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { business, resenas } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import WaveDivider from "@/components/WaveDivider";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

/* ─────────────────────────────────────────────
   Brand colors
   navy #1C3055 · azul medio #639BB6 · azul claro #BBD6E1
   ───────────────────────────────────────────── */
const NAVY = "#1C3055";
const FOOTER_BG = "#FFFFFF";

/* ─────────────────────────────────────────────
   Animation variants
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
   Steps data (copy intacto)
   ───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Registrate",
    desc: "Completa tus datos en 30 segundos. Una sola vez.",
  },
  {
    num: "02",
    title: "Confirma",
    desc: "Te avisamos por WhatsApp cuando estas llegando al final del botellón.",
  },
  {
    num: "03",
    title: "Recibi",
    desc: "Seguis el camion en vivo y recibis tu agua en la puerta.",
  },
];

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideo2Ref = useRef<HTMLVideoElement>(null);

  // Video original (full calidad) en todos los dispositivos. El src va en el
  // <source> (carga al parsear); aca solo forzamos el play para que el autoplay
  // no quede "tildado" en algunos navegadores mobile.
  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {});
    heroVideo2Ref.current?.play().catch(() => {});
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════
          A) HERO — Video full-bleed (estilo Waiakea)
          ══════════════════════════════════════════ */}
      <section className="relative h-[100vh] min-h-[640px] overflow-hidden bg-[#1C3055]">
        {/* Video de fondo (full calidad). El poster = primer cuadro del video,
            asi el arranque es invisible mientras carga. */}
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/hero-1.mp4" type="video/mp4" />
        </video>

        {/* Panel navy organico sobre el video (como la maqueta): contiene el
            titulo y los CTAs. El video queda visible en los margenes laterales. */}
        <div
          className="absolute inset-x-0 top-[44px] sm:top-[52px] bottom-[8%] pointer-events-none"
          aria-hidden="true"
        >
          <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path
              d="M250,96 C400,34 560,52 720,40 C880,28 1040,48 1190,96
                 C1300,136 1330,240 1326,380 C1322,520 1268,632 1108,696
                 C960,752 880,738 720,748 C560,758 470,744 332,696
                 C172,632 118,520 114,380 C110,240 140,136 250,96 Z"
              fill="#1C3055"
            />
          </svg>
        </div>

        {/* Contenido — dentro del panel navy */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-[120px] sm:pt-[170px] pb-[8vh]">
          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-semibold text-white leading-[1.05] uppercase tracking-[0.01em]"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}
          >
            Tu agua, siempre a tiempo
          </motion.h1>

          {/* Buttons */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 mt-10 sm:mt-14"
          >
            <Link
              href="/tienda"
              className="cta-glass w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-white/10 border border-white/40 text-white font-body font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0"
            >
              Comprar ahora
            </Link>
            <Link
              href="/quiero-ser-cliente"
              className="cta-glass w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-white/10 border border-white/40 text-white font-body font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0"
            >
              Quiero ser cliente
            </Link>
          </motion.div>
        </div>

        {/* Onda doble (estilo Waiakea) hacia la sección blanca */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <WaveDivider color="#FFFFFF" backColor="#DCEAF2" double />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          B) CÓMO FUNCIONA — claro
          ══════════════════════════════════════════ */}
      <section className="relative pt-[160px] sm:pt-[240px] pb-20 sm:pb-28 bg-white">
        {/* Imagen de producto sobre el corte de onda (estilo Waiakea).
            Centrada debajo de los CTAs, cruzando del navy al blanco. */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[260px] sm:-top-[430px] w-[90%] max-w-[760px] z-20">
          <Image
            src="/images/hero-productos-v3.png"
            alt="Productos Almacen de Agua: botellones, soda Puragua y dispensers"
            width={1500}
            height={844}
            priority
            sizes="(max-width: 768px) 90vw, 760px"
            className="w-full h-auto drop-shadow-[0_30px_45px_rgba(28,48,85,0.28)]"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-20">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">
                El sistema
              </span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-semibold text-[#1C3055] mt-4 mb-4 tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.85rem, 4vw, 2.85rem)" }}
              >
                Tres pasos.{" "}
                <em className="not-italic italic text-[#639BB6]">Cero</em>{" "}
                complicaciones.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <p className="font-quicksand text-[#5A6B7D] text-sm sm:text-base max-w-md mx-auto">
                Sin app, sin formularios complejos. Solo WhatsApp.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="relative rounded-2xl p-6 sm:p-7 h-full border border-[#BBD6E1]/60 bg-[#EEF5F8] transition-all duration-500 hover:border-[#639BB6]/50 hover:shadow-[0_12px_40px_-12px_rgba(28,48,85,0.18)] hover:-translate-y-1">
                  <span className="font-heading font-bold text-sm tracking-[2px] block mb-4 text-[#639BB6]">
                    {step.num}
                  </span>
                  <h3 className="font-heading font-semibold uppercase text-[#1C3055] text-xl sm:text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="font-quicksand text-[#5A6B7D] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRUEBA SOCIAL — opiniones reales
          ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <span className="brand-eyebrow text-[#639BB6] text-xs">Opiniones reales</span>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <h2
                className="font-heading font-semibold text-[#1C3055] mt-4 tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.6rem)" }}
              >
                Lo que dicen nuestros clientes
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={140}>
              <div className="inline-flex items-center gap-2 mt-5 bg-[#EEF5F8] border border-[#BBD6E1]/60 rounded-full px-4 py-2">
                <span className="text-yellow-400 text-sm tracking-tight">
                  ★★★★<span className="text-[#BBD6E1]">★</span>
                </span>
                <span className="font-heading font-bold text-[#1C3055] text-sm">
                  {business.rating}
                </span>
                <span className="font-quicksand text-[#52647A] text-xs">
                  · {business.totalResenas} reseñas en Google
                </span>
              </div>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {resenas.map((r, i) => (
              <StaggerItem key={i}>
                <div className="h-full flex flex-col rounded-2xl p-6 bg-[#EEF5F8] border border-[#BBD6E1]/60">
                  <span className="text-yellow-400 text-sm mb-3">
                    {"★".repeat(r.rating)}
                  </span>
                  <p className="font-quicksand text-[#52647A] text-sm leading-relaxed mb-5 flex-1">
                    &ldquo;{r.texto}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#639BB6]/15 text-[#639BB6] flex items-center justify-center font-heading font-bold text-xs flex-shrink-0">
                      {r.autor[0]}
                    </div>
                    <span className="font-heading font-semibold text-[#1C3055] text-sm">
                      {r.autor}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOQUE NAVY (continuo): video · nuestro local · CTA
          ══════════════════════════════════════════ */}

      {/* B.2) SEGUNDO VIDEO — bloque de producto */}
      <section className="relative bg-[#1C3055] h-[58vh] min-h-[360px] overflow-hidden">
        <video
          ref={heroVideo2Ref}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/hero-2.mp4" type="video/mp4" />
        </video>
        {/* Video natural, sin filtro azul. La sección clara TERMINA sobre el
            video con una onda blanca; abajo se funde en navy hacia el bloque. */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1C3055] to-transparent" />

        {/* Onda blanca arriba — la sección clara termina sobre el video */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <WaveDivider color="#FFFFFF" flip />
        </div>

        {/* Onda navy abajo — el video se disuelve en el bloque navy */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <WaveDivider color={NAVY} />
        </div>
      </section>

      {/* C) NUESTRO LOCAL — navy, texto claro */}
      <section className="relative py-16 sm:py-24 md:py-28 bg-[#1C3055] overflow-hidden">
        <div className="absolute inset-0 brand-texture opacity-[0.018] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimatedSection>
              <div>
                <span className="brand-eyebrow text-[#BBD6E1] text-xs block mb-4">
                  Visitanos
                </span>
                <h2
                  className="font-heading font-semibold text-white mb-5 tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)" }}
                >
                  Estamos en{" "}
                  <em className="not-italic italic text-[#BBD6E1]">Mendoza</em>{" "}
                  hace 12 años.
                </h2>
                <p className="font-quicksand text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                  Somos un local fisico real, con mas de 1.000 hogares
                  atendidos. Pasa a conocernos o registrate para que te llevemos
                  el agua a casa.
                </p>
                <a
                  href={business.googleMapsEmbed.replace("/embed?", "/dir/?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#BBD6E1] font-heading font-semibold text-sm hover:text-white transition-colors group"
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

            <AnimatedSection delay={150}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                <Image
                  src="/images/about-store.jpg"
                  alt="Tienda Almacen de Agua - Godoy Cruz, Mendoza"
                  width={700}
                  height={525}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C3055]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 border border-white/60 shadow-lg">
                  <p className="font-heading font-semibold text-[#1C3055] text-sm">
                    {business.direccion}
                  </p>
                  <p className="font-quicksand text-[#5A6B7D] text-xs mt-0.5">
                    {business.horarios.semana} | {business.horarios.sabado}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* D) CTA FINAL — navy (cierre del bloque) */}
      <section className="relative pt-8 pb-24 sm:pb-32 bg-[#1C3055] overflow-hidden">
        {/* Textura geométrica muy sutil (misma opacidad que "Estamos en Mendoza") */}
        <div className="absolute inset-0 brand-texture opacity-[0.018] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2
              className="font-heading font-semibold text-white mb-4 tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.85rem, 4vw, 2.85rem)" }}
            >
              Registrate{" "}
              <em className="not-italic italic text-[#BBD6E1]">gratis</em>{" "}
              al Reparto Inteligente
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="font-quicksand text-white/75 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10">
              30 segundos y listo. Te registrás directo por WhatsApp.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <Link
              href="/quiero-ser-cliente"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-[#1C3055] font-heading font-semibold text-lg transition-all duration-300 hover:bg-[#BBD6E1] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]"
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
            <p className="font-quicksand text-white/45 text-xs sm:text-sm mt-6">
              Sin costo. Sin app. Sin compromiso.
            </p>
          </AnimatedSection>
        </div>

        {/* Onda hacia el footer (claro) */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider color={FOOTER_BG} />
        </div>
      </section>
    </>
  );
}
