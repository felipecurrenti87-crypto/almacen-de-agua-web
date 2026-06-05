"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import MeshGradientBackground from "@/components/MeshGradientBackground";

interface HydrationResult {
  liters: number;
  glasses: number;
  bidones20l: number;
  bidones12l: number;
  tip: string;
}

const activityLevels = [
  { value: "sedentary", label: "Sedentario", emoji: "🪑", factor: 1 },
  { value: "light", label: "Actividad leve", emoji: "🚶", factor: 1.15 },
  { value: "moderate", label: "Actividad moderada", emoji: "🏃", factor: 1.3 },
  { value: "intense", label: "Actividad intensa", emoji: "💪", factor: 1.5 },
];

const climates = [
  { value: "temperate", label: "Templado", emoji: "🌤️", factor: 1 },
  { value: "hot", label: "Caluroso", emoji: "☀️", factor: 1.2 },
  { value: "very_hot", label: "Muy caluroso", emoji: "🔥", factor: 1.35 },
];

const tips = [
  "Lleva siempre una botella de agua contigo. El habito se construye con constancia.",
  "Toma un vaso de agua al despertar para activar tu metabolismo.",
  "Si te cuesta tomar agua, probá agregarle rodajas de limon o pepino.",
  "Durante el ejercicio, toma pequeños sorbos cada 15-20 minutos.",
  "Tener un dispenser en casa facilita mantener tu hidratacion al dia.",
];

function calculate(weight: number, people: number, activity: string, climate: string): HydrationResult {
  const actFactor = activityLevels.find((a) => a.value === activity)?.factor ?? 1;
  const cliFactor = climates.find((c) => c.value === climate)?.factor ?? 1;
  const litersPerPerson = Math.round((weight * 0.033 * actFactor * cliFactor) * 10) / 10;
  const totalLiters = Math.round(litersPerPerson * people * 10) / 10;
  const monthlyLiters = Math.round(totalLiters * 30);

  return {
    liters: totalLiters,
    glasses: Math.ceil(totalLiters / 0.25),
    bidones20l: Math.ceil(monthlyLiters / 20),
    bidones12l: Math.ceil(monthlyLiters / 12),
    tip: tips[Math.floor(Math.random() * tips.length)],
  };
}

export default function CalculadoraHidratacionPage() {
  const [weight, setWeight] = useState(70);
  const [people, setPeople] = useState(1);
  const [activity, setActivity] = useState("sedentary");
  const [climate, setClimate] = useState("temperate");
  const [result, setResult] = useState<HydrationResult | null>(null);

  const handleCalculate = () => {
    setResult(calculate(weight, people, activity, climate));
  };

  return (
    <div className="relative min-h-screen bg-[#050E14] overflow-hidden">
      <MeshGradientBackground intensity="normal" interactive />

      <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-celeste-neon/10 text-celeste-glow text-sm font-heading font-semibold px-4 py-2 rounded-full mb-4 border border-celeste-neon/20">
              <span className="text-lg">💧</span>
              Herramienta gratuita
            </span>
          </AnimatedSection>
          <TextRevealWords as="h1" className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            Calculadora de hidratacion
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-gris-dark text-base sm:text-lg max-w-xl mx-auto">
              Descubri cuanta agua necesitas tomar por dia segun tu peso, actividad y clima.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-300 text-xs font-heading px-3 py-1.5 rounded-full border border-yellow-500/20">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Orientativa — consulta con tu medico para recomendaciones personalizadas
            </div>
          </AnimatedSection>
        </div>

        {/* Calculator Card */}
        <AnimatedSection delay={200}>
          <div className="bg-negro-light/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-celeste-neon/10">
            {/* Weight */}
            <div className="mb-6">
              <label className="block text-white font-heading font-semibold text-sm mb-3">
                Peso (kg)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={30}
                  max={150}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="flex-1 h-2 bg-negro-medium rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-celeste-neon [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <span className="text-celeste-neon font-heading font-bold text-xl w-14 text-right">{weight}</span>
              </div>
            </div>

            {/* People */}
            <div className="mb-6">
              <label className="block text-white font-heading font-semibold text-sm mb-3">
                Personas en el hogar
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPeople(n)}
                    className={`w-11 h-11 rounded-xl font-heading font-bold text-sm transition-all ${
                      people === n
                        ? "bg-celeste-neon text-negro scale-110"
                        : "bg-negro-medium text-gris-dark hover:bg-negro-medium/80 border border-celeste-neon/10"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="mb-6">
              <label className="block text-white font-heading font-semibold text-sm mb-3">
                Nivel de actividad
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activityLevels.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setActivity(a.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-xs font-heading font-semibold ${
                      activity === a.value
                        ? "bg-celeste-neon/15 text-celeste-neon border border-celeste-neon/30"
                        : "bg-negro-medium text-gris-dark border border-celeste-neon/5 hover:border-celeste-neon/15"
                    }`}
                  >
                    <span className="text-lg">{a.emoji}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Climate */}
            <div className="mb-8">
              <label className="block text-white font-heading font-semibold text-sm mb-3">
                Clima
              </label>
              <div className="grid grid-cols-3 gap-2">
                {climates.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setClimate(c.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-xs font-heading font-semibold ${
                      climate === c.value
                        ? "bg-celeste-neon/15 text-celeste-neon border border-celeste-neon/30"
                        : "bg-negro-medium text-gris-dark border border-celeste-neon/5 hover:border-celeste-neon/15"
                    }`}
                  >
                    <span className="text-lg">{c.emoji}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full liquid-glass-btn py-4 rounded-2xl font-heading font-bold text-lg text-white"
            >
              Calcular mi hidratacion
            </button>
          </div>
        </AnimatedSection>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="bg-negro-light/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-celeste-neon/15">
                <h3 className="font-heading font-bold text-white text-xl mb-6 text-center">
                  Tu resultado
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <ResultCard label="Litros/dia" value={`${result.liters}L`} emoji="💧" />
                  <ResultCard label="Vasos/dia" value={`${result.glasses}`} emoji="🥤" />
                  <ResultCard label="Bidones 20L/mes" value={`${result.bidones20l}`} emoji="🫙" />
                  <ResultCard label="Bidones 12L/mes" value={`${result.bidones12l}`} emoji="🫙" />
                </div>

                {/* Water bar visualization */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-gris-dark mb-2">
                    <span>0L</span>
                    <span>Meta: {result.liters}L</span>
                  </div>
                  <div className="h-4 bg-negro-medium rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-celeste-neon via-celeste-glow to-celeste-neon"
                    />
                    {Array.from({ length: Math.min(result.glasses, 16) }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white/30"
                        style={{ left: `${((i + 0.5) / Math.min(result.glasses, 16)) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-celeste-neon/5 rounded-2xl p-4 border border-celeste-neon/10">
                  <p className="text-celeste-glow text-sm font-heading font-semibold mb-1">Consejo del dia</p>
                  <p className="text-gris-dark text-sm">{result.tip}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultCard({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="bg-negro-medium/80 rounded-2xl p-4 text-center border border-celeste-neon/8">
      <span className="text-2xl block mb-1">{emoji}</span>
      <p className="text-celeste-neon font-heading font-bold text-xl">{value}</p>
      <p className="text-gris-dark text-xs mt-1">{label}</p>
    </div>
  );
}
