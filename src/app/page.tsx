"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";
import { categorias, formatPrice } from "@/data/products";
import { business, resenas } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import { TextRevealLine, TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const featured = categorias.flatMap((c) => c.productos).slice(0, 4);

const whyUs = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Entrega rapida",
    desc: "Recibi tu pedido en el dia, de lunes a sabados en toda la provincia.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Negocio familiar",
    desc: "Mas de anos brindando agua de calidad con atencion personalizada.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Precios accesibles",
    desc: "Los mejores precios de la zona. Retira en tienda y ahorra todavia mas.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Envio a toda Mendoza",
    desc: "Llegamos a todas las zonas de la provincia. Sin minimo de compra.",
  },
];

const steps = [
  { num: "01", title: "Elegi tu producto", desc: "Explora nuestro catalogo de bidones, soda y dispensers." },
  { num: "02", title: "Hace tu pedido", desc: "Agrega al carrito o contactanos por WhatsApp." },
  { num: "03", title: "Te lo llevamos", desc: "Recibi tu pedido en la puerta de tu casa." },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: text moves up + fades as you scroll past hero
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Right side image parallax (moves slower = depth)
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Water ripple effect - mouse tracking on hero
  const rippleX = useMotionValue(50);
  const rippleY = useMotionValue(50);
  const smoothRippleX = useSpring(rippleX, { damping: 30, stiffness: 150 });
  const smoothRippleY = useSpring(rippleY, { damping: 30, stiffness: 150 });
  const rippleLeft = useTransform(smoothRippleX, (v) => `${v}%`);
  const rippleTop = useTransform(smoothRippleY, (v) => `${v}%`);

  // Hero image mouse-tracking interactivity
  const heroImgX = useMotionValue(0);
  const heroImgY = useMotionValue(0);
  const heroSmoothX = useSpring(useTransform(heroImgX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 });
  const heroSmoothY = useSpring(useTransform(heroImgY, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 });
  const heroRotateY = useSpring(useTransform(heroImgX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 200 });
  const heroRotateX = useSpring(useTransform(heroImgY, [-0.5, 0.5], [6, -6]), { damping: 20, stiffness: 200 });
  const heroGlowX = useSpring(useTransform(heroImgX, [-0.5, 0.5], [-25, 25]), { damping: 30, stiffness: 150 });
  const heroGlowY = useSpring(useTransform(heroImgY, [-0.5, 0.5], [-25, 25]), { damping: 30, stiffness: 150 });

  const handleHeroMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      rippleX.set(((e.clientX - rect.left) / rect.width) * 100);
      rippleY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rippleX, rippleY]
  );

  return (
    <>
      {/* ── HERO ── DARK */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-negro"
        onMouseMove={handleHeroMouse}
      >
        {/* Orbes celeste difuminados */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-celeste-neon/8 blur-[120px] animate-orb-pulse" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-celeste-glow/6 blur-[140px] animate-orb-pulse" style={{ animationDelay: "3s" }} />
          <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-celeste/5 blur-[100px] animate-orb-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Wavy lines pattern (replaces grid) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="waves" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M0 40 Q50 20, 100 40 Q150 60, 200 40"
                  fill="none"
                  stroke="rgba(125,211,252,0.5)"
                  strokeWidth="1"
                />
                <path
                  d="M0 60 Q50 40, 100 60 Q150 80, 200 60"
                  fill="none"
                  stroke="rgba(56,189,248,0.3)"
                  strokeWidth="1"
                />
                <path
                  d="M0 20 Q50 0, 100 20 Q150 40, 200 20"
                  fill="none"
                  stroke="rgba(125,211,252,0.25)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* Water ripple effect following cursor */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
          style={{
            left: rippleLeft,
            top: rippleTop,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 60%)",
          }}
        />

        {/* Droplets floating - bigger and more visible */}
        <div className="absolute top-28 right-[18%] w-3 h-5 bg-celeste-glow/40 rounded-full animate-drop" />
        <div className="absolute top-44 right-[33%] w-2.5 h-4 bg-celeste-neon/30 rounded-full animate-drop-d1" />
        <div className="absolute top-20 left-[38%] w-3 h-5 bg-celeste-glow/25 rounded-full animate-drop-d2" />
        <div className="absolute top-[60%] right-[25%] w-2 h-3.5 bg-celeste-neon/25 rounded-full animate-drop" style={{ animationDelay: "1.3s" }} />
        <div className="absolute top-[45%] left-[15%] w-2.5 h-4 bg-celeste-glow/20 rounded-full animate-drop-d2" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[70%] left-[60%] w-2 h-3 bg-celeste-neon/20 rounded-full animate-drop-d1" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full z-[2]">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:py-40">
            {/* Mobile hero image — shown above text on small screens */}
            <AnimatedSection delay={200} className="lg:hidden w-full order-first">
              <div className="relative w-[65%] max-w-[280px] mx-auto aspect-[4/5]">
                <img
                  src="/images/hero-principal.png"
                  alt="Almacén de Agua - Agua purificada para tu familia"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  draggable={false}
                />
              </div>
            </AnimatedSection>

            {/* Left: Text content */}
            <motion.div
              className="text-center lg:text-left"
              style={{ y: heroTextY, opacity: heroTextOpacity }}
            >
              <TextRevealLine delay={0}>
                <span className="inline-flex items-center gap-2 bg-celeste-neon/10 backdrop-blur-sm text-celeste-glow text-xs sm:text-sm font-heading font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-celeste-neon/20">
                  <span className="w-2 h-2 rounded-full bg-celeste-neon animate-pulse" />
                  Envio a toda la provincia de Mendoza
                </span>
              </TextRevealLine>

              <TextRevealLine delay={150}>
                <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 sm:mb-6">
                  Agua pura{" "}
                  <span className="gradient-text-glow">para tu familia</span>
                </h1>
              </TextRevealLine>

              <TextRevealLine delay={300}>
                <p className="text-gris-dark text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                  Bidones de agua purificada, soda y dispensers con la mejor
                  calidad. Entrega a domicilio o retira en nuestra tienda.
                </p>
              </TextRevealLine>

              <AnimatedSection delay={450}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    href="/tienda"
                    className="liquid-glass-btn inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-heading font-bold text-base sm:text-lg text-white hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Pedi ahora
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <a
                    href={`${business.whatsappLink}?text=${encodeURIComponent(business.whatsappMensaje)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-btn-outline inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-heading font-bold text-base sm:text-lg text-white hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-10 justify-center lg:justify-start">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">&#9733;&#9733;&#9733;&#9733;</span>
                    <span className="text-yellow-400/50 text-sm">&#9734;</span>
                    <span className="text-gris-dark text-xs sm:text-sm ml-1">
                      {business.rating}/5
                    </span>
                  </div>
                  <div className="w-px h-4 bg-celeste-neon/30" />
                  <span className="text-gris-dark text-xs sm:text-sm">
                    +{business.totalResenas} resenas en Google
                  </span>
                </div>
              </AnimatedSection>
            </motion.div>

            {/* Right: Interactive hero image (desktop only) */}
            <AnimatedSection delay={400} className="hidden lg:block">
              <motion.div
                className="relative"
                style={{ y: heroImageY }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  heroImgX.set(x);
                  heroImgY.set(y);
                }}
                onMouseLeave={() => {
                  heroImgX.set(0);
                  heroImgY.set(0);
                }}
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  {/* Subtle glow behind image */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: "radial-gradient(circle at 50% 40%, rgba(56,189,248,0.12) 0%, transparent 60%)",
                      x: heroGlowX,
                      y: heroGlowY,
                    }}
                  />

                  {/* Main hero image with tilt */}
                  <motion.img
                    src="/images/hero-principal.png"
                    alt="Almacén de Agua - Agua purificada para tu familia"
                    className="relative w-full h-full object-contain drop-shadow-2xl z-[1]"
                    style={{
                      x: heroSmoothX,
                      y: heroSmoothY,
                      rotateY: heroRotateY,
                      rotateX: heroRotateX,
                    }}
                    draggable={false}
                  />

                  {/* Gradient fade on the left edge for blending */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-negro to-transparent z-[2]" />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-celeste-neon/10 backdrop-blur-md border border-celeste-neon/20 rounded-2xl px-5 py-3 z-[3]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-celeste-glow font-heading font-bold text-lg">+{business.totalResenas}</p>
                  <p className="text-gris-dark text-xs">resenas</p>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom gradient fade to white — LONGER and SUBTLER */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </section>

      {/* ── POR QUE ELEGIRNOS ── LIGHT */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Nuestras ventajas
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Por que elegirnos?
            </TextRevealWords>
          </div>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group bg-celeste-light/40 hover:bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 transition-all duration-500 hover:shadow-xl hover:shadow-celeste/10 border border-transparent hover:border-celeste-medium/30 h-full">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-celeste/10 text-celeste flex items-center justify-center mb-3 sm:mb-5 transition-all duration-500 group-hover:bg-celeste group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-azul text-sm sm:text-lg mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gris-suave text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── LIGHT */}
      <section className="relative py-14 sm:py-20 md:py-28 bg-celeste-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Nuestros productos
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Productos destacados
            </TextRevealWords>
          </div>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featured.map((product, i) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-12">
            <Link
              href="/tienda"
              className="liquid-glass-btn-light inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-azul hover:text-white transition-all duration-300"
            >
              Ver todo el catalogo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── LIGHT */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Proceso simple
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Como funciona?
            </TextRevealWords>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-celeste-medium/0 via-celeste-neon/40 to-celeste-medium/0" />

            <StaggerContainer className="contents" stagger={0.15}>
              {steps.map((step) => (
                <StaggerItem key={step.num}>
                  <div className="text-center relative">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-negro text-celeste-neon font-heading font-bold text-lg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-celeste-neon/15 border border-celeste-neon/20">
                      {step.num}
                    </div>
                    <h3 className="font-heading font-bold text-azul text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gris-suave text-sm max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── RETIRA EN TIENDA ── DARK */}
      <section className="py-14 sm:py-20 md:py-28 bg-negro relative overflow-hidden">
        {/* Orbes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] rounded-full bg-celeste-neon/6 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-celeste-glow/4 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 bg-celeste-neon/10 text-celeste-glow text-sm font-heading font-semibold px-4 py-2 rounded-full mb-6 border border-celeste-neon/15">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ahorra retirando en tienda
              </span>
            </AnimatedSection>

            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-white mb-6">
              Retira en tienda y paga menos
            </TextRevealWords>

            <AnimatedSection delay={200}>
              <p className="text-gris-dark text-lg mb-10 max-w-lg mx-auto">
                Visitanos en {business.direccion} y aprovecha nuestros precios
                especiales de tienda. Sin costo de envio, sin esperas.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
              <StaggerItem>
                <PriceComparison label="Bidon 20L" tienda={5000} reparto={6200} />
              </StaggerItem>
              <StaggerItem>
                <PriceComparison label="Bidon 12L" tienda={3000} reparto={4200} />
              </StaggerItem>
              <StaggerItem>
                <PriceComparison label="Soda 1.5L" tienda={1000} reparto={1900} />
              </StaggerItem>
            </StaggerContainer>

            <AnimatedSection delay={400}>
              <Link
                href="/tienda"
                className="liquid-glass-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-lg text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-celeste-neon/25"
              >
                Ver todos los precios
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── LIGHT */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Resenas reales
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Lo que dicen nuestros clientes
            </TextRevealWords>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resenas.map((resena, i) => (
              <StaggerItem key={i}>
                <div className="bg-celeste-light/30 rounded-3xl p-7 border border-celeste-medium/20 hover:border-celeste/30 transition-all duration-300 hover:shadow-lg hover:shadow-celeste/10 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: resena.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-sm">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <p className="text-azul text-sm leading-relaxed mb-4 italic">
                    &ldquo;{resena.texto}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-celeste/20 flex items-center justify-center text-celeste font-heading font-bold text-sm">
                      {resena.autor[0]}
                    </div>
                    <span className="font-heading font-semibold text-azul text-sm">
                      {resena.autor}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gris-suave text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Resenas verificadas de Google Maps
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

function PriceComparison({
  label,
  tienda,
  reparto,
}: {
  label: string;
  tienda: number;
  reparto: number;
}) {
  const savings = reparto - tienda;
  return (
    <div className="bg-negro-light/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-celeste-neon/10 hover:border-celeste-neon/25 transition-colors duration-300">
      <p className="text-gris-dark text-xs font-heading mb-1">{label}</p>
      <p className="price text-white font-bold text-lg">{formatPrice(tienda)}</p>
      <p className="text-celeste-neon text-xs mt-1">
        Ahorras {formatPrice(savings)}
      </p>
    </div>
  );
}
