"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealLine, TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function ContactoPage() {
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
      <section className="relative bg-negro py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] left-[15%] w-[400px] h-[400px] rounded-full bg-celeste-neon/6 blur-[120px] animate-orb-pulse" />
          <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] rounded-full bg-celeste-glow/5 blur-[100px] animate-orb-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <TextRevealLine>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
              Contacto
            </h1>
          </TextRevealLine>
          <AnimatedSection delay={150}>
            <p className="text-gris-dark text-lg max-w-lg mx-auto">
              Estamos para ayudarte. Escribinos por WhatsApp, llamanos o
              visitanos en nuestra tienda.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                      title="Dirección"
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
                      title="Teléfono"
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
                    title="Ubicación de Almacén de Agua"
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
                  Completá el formulario y te contactamos por WhatsApp.
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
                      placeholder="¿En qué podemos ayudarte?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-celeste-medium/30 bg-white text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon text-sm transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl bg-negro text-white font-heading font-bold hover:bg-negro-medium transition-all duration-300 hover:shadow-xl hover:shadow-celeste-neon/15"
                  >
                    Enviar mensaje
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
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
      <div className="w-11 h-11 rounded-xl bg-negro text-celeste-neon flex items-center justify-center flex-shrink-0 group-hover:bg-celeste-neon group-hover:text-negro transition-all duration-300">
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
