"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts, formatPrice } from "@/data/products";
import { business } from "@/data/business";
import { shippingZones } from "@/data/shipping";

interface Message {
  role: "user" | "bot";
  text: string;
}

const quickReplies = [
  "Que productos tienen?",
  "Cuanto cuesta el botellón de 20L?",
  "Hacen envios?",
  "Quiero hablar con alguien",
];

function generateResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hola|buenas|buen dia|hey|hi)/.test(q)) {
    return `Hola! 👋 Soy el asistente virtual de ${business.nombre}. Te puedo ayudar con informacion sobre productos, precios, envios y mas. ¿En que te puedo ayudar?`;
  }

  // Products list
  if (/producto|catalogo|que venden|que tienen/.test(q)) {
    return "Tenemos agua purificada (botellones de 12L y 20L), soda Puragua 1500cc, y una gran variedad de dispensers: Platinum, Monocasco, Zafiro, con opcion de botellón o conexion a red. ¿Te interesa algun producto en particular?";
  }

  // Specific product prices
  if (/precio|cuesta|cuanto|valor/.test(q)) {
    if (/20/.test(q)) {
      const p = allProducts.find((x) => x.id === "bidon-20l")!;
      return `El botellón de 20L tiene un precio de ${formatPrice(p.precio_tienda)} en tienda y ${formatPrice(p.precio_reparto)} con envio a domicilio. 💧`;
    }
    if (/12/.test(q)) {
      const p = allProducts.find((x) => x.id === "bidon-12l")!;
      return `El botellón de 12L cuesta ${formatPrice(p.precio_tienda)} en tienda y ${formatPrice(p.precio_reparto)} con reparto. Ideal si buscas algo mas liviano. 💧`;
    }
    if (/soda|sifon/.test(q)) {
      const p = allProducts.find((x) => x.id === "soda-sifon")!;
      return `La soda Puragua 1500cc sale ${formatPrice(p.precio_tienda)} en tienda y ${formatPrice(p.precio_reparto)} con envio. Es nuestra soda premium. 🥤`;
    }
    if (/dispenser/.test(q)) {
      return "Los dispensers van desde $9.000 (naturales, sin electricidad) hasta $580.000 (Platinum Digital con fabricadora de hielo). Todos incluyen envio e instalacion gratis. ¿Queres que te ayude a elegir uno?";
    }
    return "Nuestros precios: Botellón 20L desde $5.000, Botellón 12L desde $3.000, Soda desde $1.000. Los dispensers arrancan en $9.000. ¿Sobre que producto queres saber?";
  }

  // Shipping / delivery
  if (/envio|envios|reparto|delivery|llegan|zona/.test(q)) {
    const zones = shippingZones.map((z) => `${z.nombre}: ${z.departamentos.join(", ")} (${z.tiempoAgua})`).join(". ");
    return `Hacemos envios a toda la provincia de Mendoza! El envio de agua y soda es gratis. ${zones}. Los dispensers tambien tienen envio e instalacion gratis. 🚚`;
  }

  // Hours
  if (/horario|hora|abierto|atienden/.test(q)) {
    return `Nuestros horarios son: ${business.horarios.semana} y ${business.horarios.sabado}. Estamos en ${business.direccion}. 🕐`;
  }

  // Location
  if (/donde|ubicacion|direccion|tienda/.test(q)) {
    return `Estamos en ${business.direccion}. Podes venir a retirar tu pedido y aprovechar los precios de tienda que son mas economicos. 📍`;
  }

  // Dispensers
  if (/dispenser|maquina|chopera/.test(q)) {
    return "Tenemos dispensers para todos los gustos: Platinum 3 Temperaturas, Monocasco, Zafiro con LED, y hasta uno con fabricadora de hielo! Vienen en version botellón o conexion a red. Todos con envio e instalacion gratis. ¿Queres comparar modelos?";
  }

  // Human contact
  if (/hablar|humano|persona|alguien|whatsapp|contacto/.test(q)) {
    return `Con gusto! Podes contactarnos por WhatsApp al ${business.whatsapp} para hablar con nuestro equipo. Tambien podes llamar al ${business.telefono}. 📱`;
  }

  // Payment
  if (/pago|pagar|forma|efectivo|tarjeta|transferencia/.test(q)) {
    return "Aceptamos efectivo, transferencia bancaria y pronto MercadoPago. Para dispensers ofrecemos financiacion. Consulta las opciones por WhatsApp. 💳";
  }

  // Thanks
  if (/gracia|thanks|genial|perfecto/.test(q)) {
    return "De nada! 😊 Si necesitas algo mas, no dudes en preguntar. Estamos para ayudarte.";
  }

  // Default
  return "No estoy seguro de como ayudarte con eso, pero podes consultarlo directamente con nuestro equipo por WhatsApp. ¿Hay algo mas en lo que pueda ayudarte? 🤔";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Hola! 👋 Soy el asistente de ${business.nombre}. ¿En que te puedo ayudar?` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Avisar al boton de WhatsApp para que se oculte mientras el chat esta abierto
  // (en mobile quedan superpuestos y el tap se va a WhatsApp por error).
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("chatwidget:toggle", { detail: { open } }),
    );
  }, [open]);

  // En mobile el chat es pantalla completa. Cuando se abre el teclado, iOS no
  // achica el viewport, asi que ajustamos el panel al "visual viewport" para que
  // el input quede siempre justo arriba del teclado (no flotando raro).
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    const el = panelRef.current;
    if (!vv || !el) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const update = () => {
      el.style.height = `${vv.height}px`;
      el.style.top = `${vv.offsetTop}px`;
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      el.style.height = "";
      el.style.top = "";
    };
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
      setTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-celeste-neon to-celeste-dark flex items-center justify-center shadow-lg shadow-celeste-neon/25 hover:scale-110 transition-transform"
            aria-label="Abrir chat"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 flex flex-col overflow-hidden bg-negro border border-celeste-neon/15 shadow-2xl shadow-celeste-neon/10 inset-x-0 top-0 h-[100dvh] rounded-none sm:inset-auto sm:top-auto sm:bottom-5 sm:right-5 sm:left-auto sm:w-[360px] sm:max-w-[calc(100vw-40px)] sm:h-[500px] sm:max-h-[calc(100vh-120px)] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-negro-light border-b border-celeste-neon/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-celeste-neon/15 flex items-center justify-center">
                  <span className="text-sm">💧</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-sm">Asistente IA</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-gris-dark text-xs">Asistente automatico</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-negro-medium flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gris-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-celeste-neon text-negro font-heading font-semibold rounded-br-md"
                      : "bg-negro-light text-gris-dark border border-celeste-neon/10 rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-negro-light rounded-2xl rounded-bl-md px-4 py-3 border border-celeste-neon/10">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-2 h-2 rounded-full bg-celeste-neon/40"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => send(qr)}
                    className="text-xs font-heading font-semibold text-celeste-neon bg-celeste-neon/10 px-3 py-1.5 rounded-full hover:bg-celeste-neon/20 transition-colors border border-celeste-neon/15"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-celeste-neon/10 bg-negro-light">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-negro-medium border border-celeste-neon/10 rounded-xl px-3 py-2.5 text-white placeholder:text-gris-dark/50 text-sm focus:outline-none focus:border-celeste-neon/30 transition-colors"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-celeste-neon flex items-center justify-center disabled:opacity-30 hover:bg-celeste-dark transition-colors"
                >
                  <svg className="w-4 h-4 text-negro" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
