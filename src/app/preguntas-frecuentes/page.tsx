"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import WaveCTA from "@/components/WaveCTA";
import { business } from "@/data/business";

const faqs = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Podés pedir directo por WhatsApp o registrarte al Reparto Inteligente. Si te registrás, te avisamos nosotros cuando se te está por terminar el agua y vos confirmás con un mensaje.",
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El reparto a domicilio ya está incluido en el precio de reparto de cada producto. Si retirás en el local, pagás el precio de tienda, que es más bajo.",
  },
  {
    q: "¿A qué zonas llegan?",
    a: "Hacemos reparto a domicilio en Godoy Cruz y alrededores del Gran Mendoza, de lunes a sábados. Si tenés dudas con tu zona, escribinos por WhatsApp y te confirmamos al instante.",
  },
  {
    q: "¿Cómo pago?",
    a: "Pagás contra entrega: efectivo o transferencia, lo que te quede más cómodo. No pedimos ni guardamos datos de tarjeta en el sitio.",
  },
  {
    q: "¿Los dispensers tienen garantía?",
    a: "Sí. Todos los dispensers incluyen instalación y garantía. Si tenés cualquier inconveniente, lo resolvemos. Consultá por financiación y planes de pago.",
  },
  {
    q: "¿Cómo funciona el botellón retornable?",
    a: "Usás el botellón, y cuando se termina lo retiramos vacío en la próxima entrega. Lo sanitizamos y lo volvemos a llenar. Es un sistema circular: el mismo envase, una y otra vez, sin plástico de un solo uso.",
  },
  {
    q: "¿Cada cuánto reparten?",
    a: "Tenemos recorridos regulares por zona. Con el Reparto Inteligente el sistema predice cuándo se te termina el agua según tu consumo y te avisa antes, así nunca te quedás sin.",
  },
  {
    q: "¿Tengo que firmar algún contrato?",
    a: "No. El servicio es sin permanencia ni compromiso: lo usás mientras te sirva y lo pausás o cancelás cuando quieras, sin vueltas.",
  },
];

function FaqItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-[#BBD6E1]/60 rounded-2xl bg-white overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-[#1C3055] text-base sm:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-[#639BB6]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-quicksand text-[#52647A] text-sm sm:text-base leading-relaxed px-5 sm:px-6 pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PreguntasFrecuentesPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-[#EEF5F8] via-white to-[#E8F2F7] pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#BBD6E1]/40 blur-[110px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="brand-eyebrow text-[#639BB6] text-xs">Ayuda</span>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1
              className="font-heading font-bold uppercase gradient-text-glow mt-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
            >
              Preguntas frecuentes
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="font-quicksand text-[#52647A] text-sm sm:text-base max-w-lg mx-auto mt-4">
              Las dudas más comunes sobre el agua, el reparto y los dispensers.
              ¿No encontrás lo que buscás? Escribinos por WhatsApp.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* LISTA */}
      <section className="relative pb-20 sm:pb-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <AnimatedSection key={i} delay={i * 40}>
                <FaqItem q={f.q} a={f.a} isOpen={open === i} onClick={() => setOpen(open === i ? null : i)} />
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      <WaveCTA>
        <AnimatedSection>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
            Tenes otra pregunta?
          </h2>
          <p className="text-[#BBD6E1] text-sm sm:text-base mb-8 max-w-md mx-auto">
            Escribinos por WhatsApp y te respondemos en el momento.
          </p>
          <a
            href={`${business.whatsappLink}?text=${encodeURIComponent("Hola! Tengo una consulta")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1C3055] hover:bg-[#BBD6E1] inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-base transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribinos por WhatsApp
          </a>
        </AnimatedSection>
      </WaveCTA>
    </div>
  );
}
