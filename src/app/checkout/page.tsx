"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart, type DeliveryMode } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { business } from "@/data/business";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealWords } from "@/components/TextReveal";

export default function CheckoutPage() {
  const {
    items,
    totalPrice,
    deliveryMode,
    setDeliveryMode,
    getItemPrice,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    notas: "",
  });

  const payMethod = "whatsapp";

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const buildWhatsAppMsg = () => {
    const lines = items.map(
      (i) =>
        `- ${i.quantity}x ${i.product.nombre} (${formatPrice(getItemPrice(i.product) * i.quantity)})`
    );

    const mode =
      deliveryMode === "tienda" ? "Retiro en tienda" : "Envío a domicilio";

    return [
      `Hola! Quiero confirmar mi pedido:`,
      ``,
      ...lines,
      ``,
      `Total: ${formatPrice(totalPrice)}`,
      `Modo: ${mode}`,
      deliveryMode === "reparto" ? `Dirección: ${form.direccion}` : "",
      `Nombre: ${form.nombre}`,
      `Teléfono: ${form.telefono}`,
      form.email ? `Email: ${form.email}` : "",
      form.notas ? `Notas: ${form.notas}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (payMethod === "whatsapp") {
      const msg = buildWhatsAppMsg();
      window.open(
        `${business.whatsappLink}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-20 h-20 rounded-full bg-celeste-light flex items-center justify-center mb-6 mx-auto">
            <svg className="w-10 h-10 text-celeste" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl text-azul mb-3">
            Tu carrito está vacío
          </h1>
          <p className="text-gris-suave mb-6">
            Agregá productos antes de ir al checkout.
          </p>
          <Link
            href="/tienda"
            className="bg-negro text-white px-8 py-3 rounded-2xl font-heading font-bold hover:bg-negro-medium transition-colors"
          >
            Ir a la tienda
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-celeste-light/20 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="mb-10">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-gris-suave hover:text-celeste-neon text-sm font-heading transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver a la tienda
          </Link>
          <TextRevealWords as="h1" className="font-heading font-bold text-3xl text-azul">
            Checkout
          </TextRevealWords>
        </AnimatedSection>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Delivery mode */}
              <AnimatedSection>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-celeste-medium/20">
                  <h2 className="font-heading font-bold text-lg text-azul mb-4">
                    Tipo de entrega
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <DeliveryOption
                      mode="tienda"
                      current={deliveryMode}
                      onChange={setDeliveryMode}
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
                        </svg>
                      }
                      title="Retiro en tienda"
                      subtitle="Precios más bajos"
                    />
                    <DeliveryOption
                      mode="reparto"
                      current={deliveryMode}
                      onChange={setDeliveryMode}
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m17.25 0V6.375c0-.621-.504-1.125-1.125-1.125H15.75m2.25 12V8.25m0 0h3.375c.621 0 1.125.504 1.125 1.125v3.659M18 8.25h-2.25m0 0H9.349m3.026 0a2.614 2.614 0 00-4.701 0" />
                        </svg>
                      }
                      title="Envío a domicilio"
                      subtitle="Toda Mendoza"
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Personal info */}
              <AnimatedSection delay={100}>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-celeste-medium/20">
                  <h2 className="font-heading font-bold text-lg text-azul mb-4">
                    Tus datos
                  </h2>
                  <div className="space-y-4">
                    <FormField
                      label="Nombre completo"
                      value={form.nombre}
                      onChange={(v) => updateField("nombre", v)}
                      required
                      placeholder="Tu nombre"
                    />
                    {deliveryMode === "reparto" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormField
                          label="Dirección de envío"
                          value={form.direccion}
                          onChange={(v) => updateField("direccion", v)}
                          required
                          placeholder="Calle, número, barrio, ciudad"
                        />
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Teléfono"
                        value={form.telefono}
                        onChange={(v) => updateField("telefono", v)}
                        required
                        type="tel"
                        placeholder="261 ..."
                      />
                      <FormField
                        label="Email (opcional)"
                        value={form.email}
                        onChange={(v) => updateField("email", v)}
                        type="email"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <FormField
                      label="Notas (opcional)"
                      value={form.notas}
                      onChange={(v) => updateField("notas", v)}
                      placeholder="Ej: Dejar en portería, timbre 2B..."
                      textarea
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Payment */}
              <AnimatedSection delay={200}>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-celeste-medium/20">
                  <h2 className="font-heading font-bold text-lg text-azul mb-4">
                    Forma de pago
                  </h2>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#25D366] bg-[#25D366]/5">
                    <svg className="w-6 h-6 text-[#25D366] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div>
                      <span className="font-heading font-bold text-sm text-azul block">
                        Confirmar por WhatsApp
                      </span>
                      <span className="text-xs text-gris-suave">
                        Te contactamos para coordinar el pago y la entrega
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={150}>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-celeste-medium/20 sticky top-28">
                  <h2 className="font-heading font-bold text-lg text-azul mb-4">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => {
                      const price = getItemPrice(item.product);
                      return (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-gris-suave">
                              {item.quantity}x
                            </span>
                            <span className="text-azul truncate">
                              {item.product.nombre}
                            </span>
                          </div>
                          <span className="price font-semibold text-azul ml-2 flex-shrink-0">
                            {formatPrice(price * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-celeste-light pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-azul">
                        Total
                      </span>
                      <span className="price text-2xl font-bold text-celeste-neon">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-gris-suave mt-1">
                      {deliveryMode === "tienda"
                        ? "Precios de retiro en tienda"
                        : "Precios con envío a domicilio"}
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl font-heading font-bold text-white bg-negro hover:bg-negro-medium transition-all duration-300 hover:shadow-xl hover:shadow-celeste-neon/15"
                  >
                    Confirmar por WhatsApp
                  </motion.button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeliveryOption({
  mode,
  current,
  onChange,
  icon,
  title,
  subtitle,
}: {
  mode: DeliveryMode;
  current: DeliveryMode;
  onChange: (m: DeliveryMode) => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const active = mode === current;
  return (
    <button
      type="button"
      onClick={() => onChange(mode)}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all overflow-hidden ${
        active
          ? "border-celeste-neon bg-celeste-neon/5"
          : "border-celeste-medium/20 hover:border-celeste-medium"
      }`}
    >
      {active && (
        <motion.div
          layoutId="delivery-indicator"
          className="absolute inset-0 bg-celeste-neon/5 rounded-2xl"
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        />
      )}
      <span className={`relative z-10 ${active ? "text-celeste-neon" : "text-gris-suave"}`}>
        {icon}
      </span>
      <span
        className={`relative z-10 font-heading font-bold text-sm ${active ? "text-azul" : "text-gris-suave"}`}
      >
        {title}
      </span>
      <span className="relative z-10 text-xs text-gris-suave">{subtitle}</span>
    </button>
  );
}

function FormField({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full px-4 py-3 rounded-xl border border-celeste-medium/30 bg-celeste-light/20 text-azul placeholder:text-gris-suave/50 focus:outline-none focus:ring-2 focus:ring-celeste-neon/40 focus:border-celeste-neon font-body text-sm transition-all";

  return (
    <div>
      <label className="block text-sm font-heading font-semibold text-azul mb-1.5">
        {label}
        {required && <span className="text-celeste-neon ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className={baseClass + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
