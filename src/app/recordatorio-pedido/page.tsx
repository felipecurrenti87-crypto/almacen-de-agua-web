"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import { business } from "@/data/business";
import MeshGradientBackground from "@/components/MeshGradientBackground";

const STORAGE_KEY = "almacen-agua-reminder";

interface Reminder {
  productLabel: string;
  intervalDays: number;
  startDate: string;
  enabled: boolean;
}

const productOptions = [
  { value: "bidon-20l", label: "Bidon 20L", emoji: "🫙" },
  { value: "bidon-12l", label: "Bidon 12L", emoji: "🫙" },
  { value: "soda", label: "Soda Puragua", emoji: "🥤" },
  { value: "combo", label: "Combo (Bidon + Soda)", emoji: "📦" },
];

const intervalOptions = [
  { days: 7, label: "Cada semana" },
  { days: 14, label: "Cada 2 semanas" },
  { days: 21, label: "Cada 3 semanas" },
  { days: 30, label: "Cada mes" },
];

function getDaysUntilNext(reminder: Reminder): number {
  const start = new Date(reminder.startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const elapsed = diffDays % reminder.intervalDays;
  return reminder.intervalDays - elapsed;
}

function getNextDate(reminder: Reminder): string {
  const daysLeft = getDaysUntilNext(reminder);
  const next = new Date();
  next.setDate(next.getDate() + daysLeft);
  return next.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
}

export default function RecordatorioPedidoPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("bidon-20l");
  const [selectedInterval, setSelectedInterval] = useState(14);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    }
  }, [reminders]);

  const addReminder = () => {
    const product = productOptions.find((p) => p.value === selectedProduct)!;
    const newReminder: Reminder = {
      productLabel: product.label,
      intervalDays: selectedInterval,
      startDate: new Date().toISOString(),
      enabled: true,
    };
    setReminders((prev) => [...prev.filter((r) => r.productLabel !== product.label), newReminder]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const removeReminder = (label: string) => {
    const updated = reminders.filter((r) => r.productLabel !== label);
    setReminders(updated);
    if (updated.length === 0) localStorage.removeItem(STORAGE_KEY);
  };

  const handleQuickOrder = (reminder: Reminder) => {
    const msg = `Hola! Quiero hacer mi pedido recurrente de ${reminder.productLabel}. Gracias!`;
    window.open(`${business.whatsappLink}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-[#050E14] overflow-hidden">
      <MeshGradientBackground intensity="normal" interactive />

      <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-celeste-neon/10 text-celeste-glow text-sm font-heading font-semibold px-4 py-2 rounded-full mb-4 border border-celeste-neon/20">
              <span className="text-lg">📅</span>
              Nunca te quedes sin agua
            </span>
          </AnimatedSection>
          <TextRevealWords as="h1" className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            Recordatorio de pedido
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-dark text-base sm:text-lg max-w-xl mx-auto">
              Configura recordatorios para nunca quedarte sin agua. Te avisamos cuando sea momento de pedir.
            </p>
          </AnimatedSection>
        </div>

        {/* Setup card */}
        <AnimatedSection delay={200}>
          <div className="bg-negro-light/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-celeste-neon/10 mb-8">
            <h3 className="font-heading font-bold text-white text-lg mb-5">Nuevo recordatorio</h3>

            {/* Product */}
            <div className="mb-5">
              <label className="block text-gris-dark text-xs font-heading font-semibold mb-2 uppercase tracking-wider">
                Producto
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {productOptions.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setSelectedProduct(p.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-xs font-heading font-semibold ${
                      selectedProduct === p.value
                        ? "bg-celeste-neon/15 text-celeste-neon border border-celeste-neon/30"
                        : "bg-negro-medium text-gris-dark border border-celeste-neon/5 hover:border-celeste-neon/15"
                    }`}
                  >
                    <span className="text-lg">{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interval */}
            <div className="mb-6">
              <label className="block text-gris-dark text-xs font-heading font-semibold mb-2 uppercase tracking-wider">
                Frecuencia
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {intervalOptions.map((opt) => (
                  <button
                    key={opt.days}
                    onClick={() => setSelectedInterval(opt.days)}
                    className={`p-3 rounded-xl transition-all text-xs font-heading font-semibold ${
                      selectedInterval === opt.days
                        ? "bg-celeste-neon/15 text-celeste-neon border border-celeste-neon/30"
                        : "bg-negro-medium text-gris-dark border border-celeste-neon/5 hover:border-celeste-neon/15"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addReminder}
              className="w-full liquid-glass-btn py-4 rounded-2xl font-heading font-bold text-lg text-white"
            >
              Activar recordatorio
            </button>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 bg-green-500/15 border border-green-500/30 rounded-xl p-3 text-center text-green-400 text-sm font-heading font-semibold"
                >
                  Recordatorio activado con exito!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Active reminders */}
        {reminders.length > 0 && (
          <AnimatedSection delay={300}>
            <h3 className="font-heading font-bold text-white text-lg mb-4">Mis recordatorios activos</h3>
            <div className="space-y-3">
              {reminders.map((r) => {
                const daysLeft = getDaysUntilNext(r);
                const isUrgent = daysLeft <= 2;
                return (
                  <motion.div
                    key={r.productLabel}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-negro-light/80 backdrop-blur-sm rounded-2xl p-5 border ${
                      isUrgent ? "border-yellow-500/30" : "border-celeste-neon/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-heading font-bold text-white text-sm">{r.productLabel}</h4>
                        <p className="text-gris-dark text-xs">
                          Cada {r.intervalDays} dias
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-heading font-bold text-lg ${isUrgent ? "text-yellow-400" : "text-celeste-neon"}`}>
                          {daysLeft === 0 ? "Hoy!" : `${daysLeft} dias`}
                        </p>
                        <p className="text-gris-dark text-xs">para tu proximo pedido</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-negro-medium rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full transition-all ${isUrgent ? "bg-yellow-400" : "bg-celeste-neon"}`}
                        style={{ width: `${((r.intervalDays - daysLeft) / r.intervalDays) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gris-dark text-xs">
                        Proximo: {getNextDate(r)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuickOrder(r)}
                          className="text-xs font-heading font-bold text-celeste-neon bg-celeste-neon/10 px-3 py-1.5 rounded-lg hover:bg-celeste-neon/20 transition-colors"
                        >
                          Pedir ahora
                        </button>
                        <button
                          onClick={() => removeReminder(r.productLabel)}
                          className="text-xs text-gris-dark hover:text-red-400 transition-colors p-1.5"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
