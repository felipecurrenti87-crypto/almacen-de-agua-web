"use client";

import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealLine, TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Calidad garantizada",
    desc: "Agua purificada con los más altos estándares de calidad. Cada bidón pasa por un riguroso proceso de purificación para que tu familia beba agua segura.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Familia y servicio",
    desc: "Somos un negocio familiar que valora cada cliente. Atención personalizada, cercanía y compromiso con la comunidad mendocina.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Compromiso diario",
    desc: "Nos levantamos cada día con el objetivo de llevar agua pura a cada hogar de Mendoza. Tu bienestar es nuestra motivación.",
  },
];

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero — DARK */}
      <section className="relative bg-negro py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-celeste-neon/6 blur-[120px] animate-orb-pulse" />
          <div className="absolute bottom-[-15%] left-[5%] w-[500px] h-[500px] rounded-full bg-celeste-glow/4 blur-[140px] animate-orb-pulse" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
              Nuestra historia
            </span>
          </AnimatedSection>
          <TextRevealLine delay={100}>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mt-3 mb-6">
              Conocé{" "}
              <span className="gradient-text-glow">Almacén de Agua</span>
            </h1>
          </TextRevealLine>
          <AnimatedSection delay={200}>
            <p className="text-gris-dark text-lg leading-relaxed max-w-2xl mx-auto">
              Somos un emprendimiento familiar mendocino dedicado a llevar agua
              purificada de la mejor calidad a cada hogar y negocio de la
              provincia.
            </p>
          </AnimatedSection>
        </div>

        {/* Fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                {/* REEMPLAZAR: subir foto en public/images/about-store.webp (800x600) */}
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-negro-light to-negro-medium flex items-center justify-center overflow-hidden border border-celeste-neon/10">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-celeste-neon/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-celeste-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 3 7 10 7 14a5 5 0 0010 0c0-4-5-11-5-11z" />
                      </svg>
                    </div>
                    <span className="font-heading font-bold text-white text-lg">
                      {business.nombre}
                    </span>
                    <p className="text-gris-dark text-sm mt-1">
                      Godoy Cruz, Mendoza
                    </p>
                    <p className="text-celeste-neon/60 text-xs mt-3">Subí about-store.webp a /public/images/</p>
                  </div>
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
                    Almacén de Agua nació como un sueño familiar: acercar agua
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
                    calidad y confiabilidad, garantizando que cada bidón de agua y
                    cada soda que entregamos cumple con los más altos estándares.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-celeste-light/30">
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
                  <div className="w-16 h-16 rounded-2xl bg-negro text-celeste-neon flex items-center justify-center mx-auto mb-5">
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
      </section>

      {/* CTA — DARK */}
      <section className="py-20 md:py-28 bg-negro relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-celeste-neon/5 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl text-white mb-4">
              ¿Querés probar nuestra agua?
            </TextRevealWords>
            <p className="text-gris-dark text-lg mb-8">
              Hacé tu primer pedido y descubrí por qué nuestros clientes nos
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
      </section>
    </div>
  );
}
