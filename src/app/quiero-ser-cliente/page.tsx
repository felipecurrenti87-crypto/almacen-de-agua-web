"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";
import MeshGradientBackground from "@/components/MeshGradientBackground";

interface FormData {
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  localidad: string;
  personas: string;
  consumo: string;
  dispenser: string;
  comentario: string;
}

const initialForm: FormData = {
  nombre: "",
  apellido: "",
  telefono: "",
  direccion: "",
  localidad: "",
  personas: "",
  consumo: "",
  dispenser: "no",
  comentario: "",
};

const consumoOptions = [
  { value: "", label: "Seleccionar..." },
  { value: "1-2", label: "1-2 bidones/mes" },
  { value: "3-4", label: "3-4 bidones/mes" },
  { value: "5-6", label: "5-6 bidones/mes" },
  { value: "7-10", label: "7-10 bidones/mes" },
  { value: "10+", label: "Mas de 10 bidones/mes" },
  { value: "red", label: "Me interesa conexion a red" },
];

const dispenserOptions = [
  { value: "no", label: "No necesito dispenser" },
  { value: "si-bidon", label: "Si, dispenser a bidon" },
  { value: "si-red", label: "Si, dispenser a red" },
  { value: "si-natural", label: "Si, dispenser natural" },
  { value: "consultar", label: "Quiero que me asesoren" },
];

export default function QuieroSerClientePage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.nombre.trim() !== "" &&
    form.telefono.trim() !== "" &&
    form.direccion.trim() !== "";

  const buildWhatsAppMsg = () => {
    const lines = [
      `Hola! Quiero registrarme como cliente.`,
      ``,
      `*Datos personales:*`,
      `Nombre: ${form.nombre} ${form.apellido}`,
      `Telefono: ${form.telefono}`,
      `Direccion: ${form.direccion}`,
      form.localidad ? `Localidad: ${form.localidad}` : "",
      form.personas ? `Personas en el hogar/negocio: ${form.personas}` : "",
      ``,
      `*Consumo estimado:*`,
      form.consumo
        ? `${consumoOptions.find((o) => o.value === form.consumo)?.label || form.consumo}`
        : "A definir",
      ``,
      `*Dispenser:*`,
      dispenserOptions.find((o) => o.value === form.dispenser)?.label || form.dispenser,
      form.comentario ? `\n*Comentario:*\n${form.comentario}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  };

  const whatsappUrl = `${business.whatsappLink}?text=${encodeURIComponent(buildWhatsAppMsg())}`;

  return (
    <div className="min-h-screen bg-[#EEF5F8] text-azul relative">
      <MeshGradientBackground intensity="normal" interactive />
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-16 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="inline-block bg-celeste-neon/10 text-celeste-neon text-sm font-heading font-bold px-5 py-2 rounded-full mb-6 border border-celeste-neon/20">
              Nuevo cliente
            </span>
          </AnimatedSection>
          <TextRevealWords
            as="h1"
            center
            className="font-heading font-bold uppercase gradient-text-glow text-3xl sm:text-4xl md:text-5xl mb-4"
          >
            Quiero ser cliente
          </TextRevealWords>
          <AnimatedSection delay={100}>
            <p className="text-[#52647A] text-base sm:text-lg max-w-xl mx-auto">
              Completa tus datos y te contactaremos por WhatsApp para armar tu
              plan personalizado.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form */}
      <section className="relative pb-20 sm:pb-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection delay={200}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-3xl p-6 sm:p-10 border border-[#BBD6E1]/70">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    />
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      placeholder="Tu apellido"
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    />
                  </div>

                  {/* Telefono */}
                  <div>
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      required
                      placeholder="261 XXX XXXX"
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    />
                  </div>

                  {/* Localidad */}
                  <div>
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Localidad
                    </label>
                    <input
                      type="text"
                      name="localidad"
                      value={form.localidad}
                      onChange={handleChange}
                      placeholder="Ej: Godoy Cruz"
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    />
                  </div>

                  {/* Direccion — full width */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Direccion *
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={form.direccion}
                      onChange={handleChange}
                      required
                      placeholder="Calle y numero"
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    />
                  </div>

                  {/* Personas */}
                  <div>
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Personas en el hogar
                    </label>
                    <input
                      type="number"
                      name="personas"
                      value={form.personas}
                      onChange={handleChange}
                      placeholder="Ej: 4"
                      min="1"
                      max="100"
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    />
                  </div>

                  {/* Consumo */}
                  <div>
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Consumo estimado
                    </label>
                    <select
                      name="consumo"
                      value={form.consumo}
                      onChange={handleChange}
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    >
                      {consumoOptions.map((o) => (
                        <option key={o.value} value={o.value} className="bg-[#F4F9FB] text-azul">
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dispenser — full width */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Necesitas dispenser?
                    </label>
                    <select
                      name="dispenser"
                      value={form.dispenser}
                      onChange={handleChange}
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors"
                    >
                      {dispenserOptions.map((o) => (
                        <option key={o.value} value={o.value} className="bg-[#F4F9FB] text-azul">
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Comentario — full width */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#52647A] font-heading font-semibold mb-1.5 uppercase tracking-wider">
                      Comentario adicional
                    </label>
                    <textarea
                      name="comentario"
                      value={form.comentario}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Algo que quieras contarnos..."
                      className="w-full bg-[#F4F9FB]/80 border border-[#BBD6E1]/70 rounded-xl px-4 py-3 text-sm text-azul placeholder:text-[#52647A]/50 focus:outline-none focus:border-celeste-neon/40 focus:ring-1 focus:ring-celeste-neon/20 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-6 sm:mt-8">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full bg-[#1C3055] hover:bg-[#16264a] flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-[#ffffff] text-base sm:text-lg transition-opacity ${
                      !isValid ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    Enviar por WhatsApp
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                  <p className="text-center text-xs text-[#52647A]/60 mt-3">
                    * Campos obligatorios
                  </p>
                </div>
              </form>
            ) : (
              /* Success / confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-lg rounded-3xl p-8 sm:p-12 border border-[#BBD6E1]/70 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-celeste-neon/15 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-celeste-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-azul mb-4">
                  Datos listos!
                </h2>
                <p className="text-[#52647A] text-sm sm:text-base mb-6 max-w-md mx-auto">
                  Haz click en el boton de abajo para enviar tus datos por
                  WhatsApp. Te responderemos a la brevedad.
                </p>

                {/* Preview */}
                <div className="bg-[#F4F9FB]/50 rounded-2xl p-4 sm:p-6 mb-8 text-left border border-celeste-neon/5">
                  <h4 className="font-heading font-bold text-xs text-[#52647A] mb-3 uppercase tracking-wider">
                    Resumen
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <p><span className="text-[#52647A]">Nombre:</span> <span className="text-azul">{form.nombre} {form.apellido}</span></p>
                    <p><span className="text-[#52647A]">Telefono:</span> <span className="text-azul">{form.telefono}</span></p>
                    <p><span className="text-[#52647A]">Direccion:</span> <span className="text-azul">{form.direccion}{form.localidad ? `, ${form.localidad}` : ""}</span></p>
                    {form.consumo && (
                      <p><span className="text-[#52647A]">Consumo:</span> <span className="text-azul">{consumoOptions.find((o) => o.value === form.consumo)?.label}</span></p>
                    )}
                    <p><span className="text-[#52647A]">Dispenser:</span> <span className="text-azul">{dispenserOptions.find((o) => o.value === form.dispenser)?.label}</span></p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#1C3055] hover:bg-[#16264a] flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-[#ffffff] text-base sm:text-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Abrir WhatsApp
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialForm); }}
                    className="flex-1 border-2 border-[#1C3055]/25 hover:bg-[#EEF5F8] flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-azul text-sm sm:text-base"
                  >
                    Modificar datos
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatedSection>

          {/* Extra CTA */}
          <AnimatedSection delay={300}>
            <div className="mt-10 text-center">
              <p className="text-[#52647A] text-sm mb-4">
                Ya sabes que plan queres?
              </p>
              <Link
                href="/planes"
                className="inline-flex items-center gap-2 text-celeste-neon font-heading font-bold text-sm hover:text-celeste-glow transition-colors"
              >
                Ver calculadora de planes
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
