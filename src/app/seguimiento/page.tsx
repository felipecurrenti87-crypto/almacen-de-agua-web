"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import { business } from "@/data/business";
import MeshGradientBackground from "@/components/MeshGradientBackground";

const steps = [
  { emoji: "📱", title: "Escribinos por WhatsApp", desc: "Indicanos tu nombre y que pedido realizaste." },
  { emoji: "🔍", title: "Verificamos tu pedido", desc: "Confirmamos el estado actual con nuestro equipo de reparto." },
  { emoji: "📋", title: "Te informamos el estado", desc: "Te decimos si esta en preparacion, en camino o ya fue entregado." },
];

export default function SeguimientoPage() {
  const handleWhatsApp = () => {
    const msg = "Hola! Quiero consultar el estado de mi pedido";
    window.open(`${business.whatsappLink}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-[#EEF5F8] overflow-hidden">
      <MeshGradientBackground intensity="normal" interactive />

      <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-celeste-neon/10 text-[#639BB6] text-sm font-heading font-semibold px-4 py-2 rounded-full mb-4 border border-celeste-neon/20">
              <span className="text-lg">📦</span>
              Estado de tu pedido
            </span>
          </AnimatedSection>
          <TextRevealWords as="h1" center className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-azul mb-3">
            Seguimiento de pedido
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-[#52647A] text-base sm:text-lg max-w-xl mx-auto">
              Para consultar el estado de tu pedido, contactanos directamente por WhatsApp. Nuestro equipo te informara en el momento.
            </p>
          </AnimatedSection>
        </div>

        {/* WhatsApp CTA */}
        <AnimatedSection delay={200}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-celeste-neon/10 mb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-xl text-azul mb-2">
              Consulta tu pedido al instante
            </h2>
            <p className="text-[#52647A] text-sm mb-6 max-w-md mx-auto">
              Nuestro equipo te responde en minutos durante el horario de atencion: {business.horarios.semana}.
            </p>
            <button
              onClick={handleWhatsApp}
              className="bg-[#1C3055] hover:bg-[#16264a] inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-lg text-[#ffffff] hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </button>
          </div>
        </AnimatedSection>

        {/* How it works */}
        <AnimatedSection delay={300}>
          <h3 className="font-heading font-bold text-lg text-[#639BB6] mb-6 text-center">
            Como funciona
          </h3>
        </AnimatedSection>

        <StaggerContainer className="space-y-4" delay={400}>
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-celeste-neon/10 hover:border-celeste-neon/25 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-celeste-neon/10 flex items-center justify-center flex-shrink-0 text-xl">
                  {step.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-celeste-neon text-xs font-heading font-bold">
                      Paso {i + 1}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-azul text-sm mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-[#52647A] text-xs">{step.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Info */}
        <AnimatedSection delay={600}>
          <div className="mt-8 bg-celeste-neon/5 rounded-2xl p-5 border border-celeste-neon/10">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-celeste-neon flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-[#52647A]">
                <p className="mb-1">
                  <strong className="text-azul">Horario de atencion:</strong> {business.horarios.semana} | {business.horarios.sabado}
                </p>
                <p>
                  Los pedidos realizados fuera de horario se procesan al siguiente dia habil. Los envios se realizan de lunes a sabados.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
