"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
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
    q: "¿Cómo funciona el bidón retornable?",
    a: "Usás el bidón, y cuando se termina lo retiramos vacío en la próxima entrega. Lo sanitizamos y lo volvemos a llenar. Es un sistema circular: el mismo envase, una y otra vez, sin plástico de un solo uso.",
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

          <AnimatedSection delay={120}>
            <div className="mt-10 text-center">
              <a
                href={`${business.whatsappLink}?text=${encodeURIComponent("Hola! Tengo una consulta")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1C3055] text-white font-body font-bold text-base hover:bg-[#16264a] transition-colors"
              >
                Tengo otra pregunta
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
