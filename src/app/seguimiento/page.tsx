"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import { business } from "@/data/business";

interface TrackingStep {
  label: string;
  desc: string;
  emoji: string;
  active: boolean;
  completed: boolean;
}

const demoSteps: TrackingStep[] = [
  { label: "Pedido recibido", desc: "Tu pedido fue registrado con exito", emoji: "📋", active: false, completed: true },
  { label: "En preparacion", desc: "Estamos preparando tu pedido", emoji: "📦", active: false, completed: true },
  { label: "En camino", desc: "Tu repartidor esta en camino", emoji: "🚚", active: true, completed: false },
  { label: "Entregado", desc: "Pedido entregado con exito", emoji: "✅", active: false, completed: false },
];

export default function SeguimientoPage() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState<TrackingStep[] | null>(null);
  const [error, setError] = useState(false);

  const handleTrack = () => {
    if (!orderId.trim()) return;
    // Demo: any input shows the demo tracker
    setError(false);
    setTracking(demoSteps);
  };

  const handleWhatsApp = () => {
    const msg = orderId
      ? `Hola! Quiero consultar el estado de mi pedido #${orderId}`
      : "Hola! Quiero consultar el estado de mi pedido";
    window.open(`${business.whatsappLink}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-negro overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-celeste-neon/8 blur-[120px] animate-orb-pulse" />
        <div className="absolute bottom-[-15%] right-[5%] w-[600px] h-[600px] rounded-full bg-celeste-glow/6 blur-[140px] animate-orb-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] animate-wave-drift" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="waves-tracking" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 Q50 20, 100 40 Q150 60, 200 40" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
              <path d="M0 60 Q50 40, 100 60 Q150 80, 200 60" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves-tracking)" />
        </svg>
      </div>

      <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-celeste-neon/10 text-celeste-glow text-sm font-heading font-semibold px-4 py-2 rounded-full mb-4 border border-celeste-neon/20">
              <span className="text-lg">📦</span>
              Seguimiento en tiempo real
            </span>
          </AnimatedSection>
          <TextRevealWords as="h1" className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            Seguimiento de pedido
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-dark text-base sm:text-lg max-w-xl mx-auto">
              Ingresa tu numero de pedido para ver el estado en tiempo real.
            </p>
          </AnimatedSection>
        </div>

        {/* Search */}
        <AnimatedSection delay={200}>
          <div className="bg-negro-light/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-celeste-neon/10 mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="Ej: 12345"
                className="flex-1 bg-negro-medium border border-celeste-neon/10 rounded-xl px-4 py-3 text-white placeholder:text-gris-dark/50 font-heading text-sm focus:outline-none focus:border-celeste-neon/40 transition-colors"
              />
              <button
                onClick={handleTrack}
                className="liquid-glass-btn px-6 py-3 rounded-xl font-heading font-bold text-white text-sm"
              >
                Buscar
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 text-sm text-gris-dark hover:text-celeste-neon transition-colors font-heading"
              >
                <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                O consulta por WhatsApp
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Tracker */}
        <AnimatePresence>
          {tracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-negro-light/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-celeste-neon/15">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-heading font-bold text-white text-lg">
                    Pedido #{orderId}
                  </h3>
                  <span className="text-xs font-heading font-semibold bg-celeste-neon/15 text-celeste-neon px-3 py-1 rounded-full">
                    En camino
                  </span>
                </div>

                {/* Timeline */}
                <div className="relative">
                  {tracking.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="flex gap-4 mb-6 last:mb-0"
                    >
                      {/* Vertical line + dot */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                          step.completed
                            ? "bg-celeste-neon/20 ring-2 ring-celeste-neon"
                            : step.active
                              ? "bg-celeste-neon/30 ring-2 ring-celeste-neon animate-pulse"
                              : "bg-negro-medium ring-1 ring-celeste-neon/15"
                        }`}>
                          {step.emoji}
                        </div>
                        {i < tracking.length - 1 && (
                          <div className={`w-0.5 flex-1 min-h-[24px] mt-1 ${
                            step.completed ? "bg-celeste-neon/40" : "bg-celeste-neon/10"
                          }`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pt-1.5 pb-4">
                        <p className={`font-heading font-bold text-sm ${
                          step.completed || step.active ? "text-white" : "text-gris-dark"
                        }`}>
                          {step.label}
                        </p>
                        <p className="text-gris-dark text-xs mt-0.5">{step.desc}</p>
                        {step.active && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-3 bg-celeste-neon/5 rounded-xl p-3 border border-celeste-neon/10"
                          >
                            <div className="flex items-center gap-2 text-celeste-neon text-xs font-heading font-semibold">
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                🚚
                              </motion.div>
                              Tu repartidor llegara pronto
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Info notice */}
              <div className="mt-6 bg-celeste-neon/5 rounded-2xl p-4 border border-celeste-neon/10 text-center">
                <p className="text-gris-dark text-xs">
                  Esta es una vista de demostración. Para consultar el estado real de tu pedido, contactanos por{" "}
                  <button onClick={handleWhatsApp} className="text-celeste-neon hover:underline font-semibold">
                    WhatsApp
                  </button>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 text-sm font-heading">No encontramos un pedido con ese numero.</p>
          </div>
        )}
      </div>
    </div>
  );
}
