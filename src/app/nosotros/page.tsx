"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/data/business";
import MeshGradientBackground from "@/components/MeshGradientBackground";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealLine, TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import WaveDivider from "@/components/WaveDivider";

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Calidad garantizada",
    desc: "Agua purificada con los mas altos estandares de calidad. Cada botellón pasa por un riguroso proceso de purificacion para que tu familia beba agua segura.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Familia y servicio",
    desc: "Somos un negocio familiar que valora cada cliente. Atencion personalizada, cercania y compromiso con la comunidad mendocina.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Compromiso diario",
    desc: "Nos levantamos cada dia con el objetivo de llevar agua pura a cada hogar de Mendoza. Tu bienestar es nuestra motivacion.",
  },
];

export default function NosotrosPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola! Soy ${form.nombre}.\n\n${form.mensaje}\n\nMi email: ${form.email}`;
    window.open(
      `${business.whatsappLink}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
    setForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      {/* Hero — DARK */}
      <section className="relative bg-[#EEF5F8] py-32 md:py-40 overflow-hidden">
        <MeshGradientBackground intensity="normal" interactive />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
              Nuestra historia
            </span>
          </AnimatedSection>
          <TextRevealLine delay={100}>
            <h1 className="font-heading font-bold uppercase gradient-text-glow text-4xl sm:text-5xl mt-3 mb-6">
              Conoce Almacen de Agua
            </h1>
          </TextRevealLine>
          <AnimatedSection delay={200}>
            <p className="text-[#52647A] text-lg leading-relaxed max-w-2xl mx-auto">
              Somos un emprendimiento familiar mendocino dedicado a llevar agua
              purificada de la mejor calidad a cada hogar y negocio de la
              provincia.
            </p>
          </AnimatedSection>
        </div>

        {/* Onda hacia la seccion blanca */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <WaveDivider color="#FFFFFF" backColor="#DCEAF2" double />
        </div>
      </section>

      {/* Story section — blanco */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Wave pattern background — identical to homepage */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="waves-nosotros-story" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
                <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <path d="M0 20 Q50 0, 100 20 Q150 40, 200 20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-nosotros-story)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-celeste-medium/20 shadow-lg">
                  <Image
                    src="/images/about-store.jpg"
                    alt="Tienda Almacen de Agua - Godoy Cruz, Mendoza"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-3 h-4 bg-celeste-neon/30 rounded-full animate-drop" />
                <div className="absolute -top-2 -left-2 w-2 h-3 bg-celeste-glow/20 rounded-full animate-drop-d1" />
              </div>
            </AnimatedSection>

            <div>
              <TextRevealWords className="font-heading font-bold text-2xl text-azul mb-4">
                Nuestra historia
              </TextRevealWords>
              <AnimatedSection delay={150}>
                <div className="space-y-4 text-gris-suave leading-relaxed">
                  <p>
                    Almacen de Agua nacio como un sueno familiar: acercar agua
                    purificada de calidad a los hogares y comercios de Mendoza a
                    un precio justo y con un servicio cercano.
                  </p>
                  <p>
                    Desde nuestro local en {business.direccion}, atendemos
                    personalmente a cada cliente. Nos enorgullece ser parte de la
                    comunidad de Godoy Cruz y llevar nuestros productos a toda la
                    provincia.
                  </p>
                  <p>
                    Trabajamos con productos Puragua, una marca reconocida por su
                    calidad y confiabilidad, garantizando que cada botellón de agua y
                    cada soda que entregamos cumple con los mas altos estandares.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Onda hacia la seccion celeste */}
        <WaveDivider color="#EEF5F8" className="mt-12 md:mt-16" />
      </section>

      {/* Values — celeste claro */}
      <section className="relative py-20 md:py-28 bg-[#EEF5F8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Lo que nos define
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Nuestros valores
            </TextRevealWords>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl hover:shadow-celeste/10 transition-all duration-500 border border-celeste-medium/20 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#1C3055] text-celeste-neon flex items-center justify-center mx-auto mb-5">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-bold text-azul text-xl mb-3">
                    {v.title}
                  </h3>
                  <p className="text-gris-suave text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Onda hacia la seccion blanca */}
        <WaveDivider color="#FFFFFF" className="mt-12 md:mt-16" />
      </section>

      {/* ── CONTACTO SECTION ── blanco */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Wave pattern background — identical to homepage */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="waves-nosotros-contact" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
                <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <path d="M0 20 Q50 0, 100 20 Q150 40, 200 20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-nosotros-contact)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section heading */}
          <div className="text-center mb-12">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Estamos para ayudarte
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Contactanos
            </TextRevealWords>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <TextRevealWords className="font-heading font-bold text-2xl text-azul mb-6">
                  Datos de contacto
                </TextRevealWords>

                <StaggerContainer className="space-y-5">
                  <StaggerItem>
                    <ContactItem
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                      title="Direccion"
                      value={business.direccion}
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <ContactItem
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      }
                      title="Telefono"
                      value={business.telefono}
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <ContactItem
                      icon={
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      }
                      title="WhatsApp"
                      value={business.whatsapp}
                      href={business.whatsappLink}
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <ContactItem
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" d="M12 6v6l4 2" />
                        </svg>
                      }
                      title="Horarios"
                      value={`${business.horarios.semana} | ${business.horarios.sabado}`}
                    />
                  </StaggerItem>
                </StaggerContainer>
              </div>

              {/* Map */}
              <AnimatedSection delay={200}>
                <div className="rounded-3xl overflow-hidden border border-celeste-medium/20 shadow-sm h-[300px]">
                  <iframe
                    src={business.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicacion de Almacen de Agua"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <AnimatedSection delay={100}>
              <div className="bg-celeste-light/30 rounded-3xl p-8 border border-celeste-medium/20">
                <h2 className="font-heading font-bold text-2xl text-azul mb-2">
                  Envianos un mensaje
                </h2>
                <p className="text-gris-suave text-sm mb-6">
                  Completa el formulario y te contactamos por WhatsApp.
                </p>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 text-sm font-heading font-semibold">
                        Mensaje enviado! Te redirigimos a WhatsApp.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-azul mb-1.5">
                      Nombre <span className="text-celeste-neon">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => updateField("nombre", e.target.value)}
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-celeste-medium/30 bg-white text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold text-azul mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-celeste-medium/30 bg-white text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold text-azul mb-1.5">
                      Mensaje <span className="text-celeste-neon">*</span>
                    </label>
                    <textarea
                      value={form.mensaje}
                      onChange={(e) => updateField("mensaje", e.target.value)}
                      required
                      placeholder="En que podemos ayudarte?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-celeste-medium/30 bg-white text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon text-sm transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl bg-[#1C3055] text-[#ffffff] font-heading font-bold hover:bg-[#16264a] transition-all duration-300 hover:shadow-xl hover:shadow-celeste-neon/15"
                  >
                    Enviar mensaje
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Onda hacia la banda navy */}
        <WaveDivider color="#1C3055" className="mt-12 md:mt-16" />
      </section>

      {/* CTA — banda navy (contraste) */}
      <section className="py-20 md:py-28 bg-[#1C3055] relative overflow-hidden">
        <div className="absolute inset-0 brand-texture opacity-[0.02] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl text-white mb-4">
              Queres probar nuestra agua?
            </TextRevealWords>
            <p className="text-[#BBD6E1] text-lg mb-8">
              Hace tu primer pedido y descubri por que nuestros clientes nos
              eligen cada semana.
            </p>
            <a
              href={`${business.whatsappLink}?text=${encodeURIComponent(business.whatsappMensaje)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-celeste-neon text-negro px-8 py-4 rounded-2xl font-heading font-bold text-lg hover:bg-celeste-glow transition-all duration-300 hover:shadow-xl hover:shadow-celeste-neon/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contactanos por WhatsApp
            </a>
          </AnimatedSection>
        </div>

        {/* Onda de cierre hacia el footer blanco */}
        <WaveDivider color="#FFFFFF" className="mt-12 md:mt-16" />
      </section>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="w-11 h-11 rounded-xl bg-[#1C3055] text-celeste-neon flex items-center justify-center flex-shrink-0 group-hover:bg-celeste-neon group-hover:text-negro transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gris-suave font-heading uppercase tracking-wider">
          {title}
        </p>
        <p className="text-azul font-semibold text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:translate-x-1 transition-transform"
      >
        {content}
      </a>
    );
  }

  return content;
}
