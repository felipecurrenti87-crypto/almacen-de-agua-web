"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { business } from "@/data/business";
import Link from "next/link";

export default function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    deliveryMode,
    setDeliveryMode,
    getItemPrice,
  } = useCart();

  // Close cart with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  const whatsappOrder = () => {
    const lines = items.map(
      (i) =>
        `• ${i.quantity}x ${i.product.nombre} (${formatPrice(getItemPrice(i.product) * i.quantity)})`
    );
    const msg = `Hola! Quiero hacer un pedido:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(totalPrice)}\nModo: ${deliveryMode === "tienda" ? "Retiro en tienda" : "Envío a domicilio"}`;
    return `${business.whatsappLink}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-negro/50 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-celeste-light">
              <h2 className="font-heading font-bold text-xl text-azul">
                Tu carrito
              </h2>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-celeste-light transition-colors"
                aria-label="Cerrar carrito"
              >
                <svg
                  className="w-5 h-5 text-gris-suave"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-celeste-light flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-celeste"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
                <p className="text-gris-suave font-heading text-lg">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-gris-suave/70 mt-1">
                  Explorá nuestra tienda y agregá productos
                </p>
                <Link
                  href="/tienda"
                  onClick={closeCart}
                  className="mt-6 bg-[#1C3055] text-white px-6 py-3 rounded-2xl font-heading font-bold text-sm hover:bg-[#16264a] transition-colors"
                >
                  Ir a la tienda
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const price = getItemPrice(item.product);
                      return (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: -30,
                            transition: { duration: 0.2 },
                          }}
                          transition={{
                            layout: { type: "spring", damping: 25, stiffness: 300 },
                            opacity: { duration: 0.25 },
                            x: { duration: 0.25 },
                          }}
                          className="flex gap-4 bg-celeste-light/40 rounded-2xl p-4"
                        >
                          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">
                              {item.product.categoria === "agua"
                                ? "💧"
                                : "🚰"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading font-bold text-sm text-azul truncate">
                              {item.product.nombre}
                            </h3>
                            <p className="price text-celeste-neon font-bold text-sm mt-0.5">
                              {formatPrice(price)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-7 h-7 rounded-full bg-white border border-celeste-medium flex items-center justify-center text-azul hover:bg-celeste-light transition-colors"
                                aria-label={`Reducir cantidad de ${item.product.nombre}`}
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="font-heading font-bold text-sm w-6 text-center"
                              >
                                {item.quantity}
                              </motion.span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-7 h-7 rounded-full bg-white border border-celeste-medium flex items-center justify-center text-azul hover:bg-celeste-light transition-colors"
                                aria-label={`Aumentar cantidad de ${item.product.nombre}`}
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="ml-auto text-gris-suave hover:text-red-500 transition-colors"
                                aria-label="Eliminar"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <motion.div
                  layout
                  className="border-t border-celeste-light p-5 space-y-3"
                >
                  {/* Selector de entrega — define qué precio se aplica */}
                  <div>
                    <p className="text-xs font-heading font-bold text-azul mb-2">
                      ¿Como lo querés?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDeliveryMode("tienda")}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold border transition-all ${
                          deliveryMode === "tienda"
                            ? "bg-[#1C3055] text-white border-[#1C3055]"
                            : "bg-white text-azul border-celeste-medium/60 hover:border-[#639BB6]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                        </svg>
                        Retiro en tienda
                      </button>
                      <button
                        onClick={() => setDeliveryMode("reparto")}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold border transition-all ${
                          deliveryMode === "reparto"
                            ? "bg-[#1C3055] text-white border-[#1C3055]"
                            : "bg-white text-azul border-celeste-medium/60 hover:border-[#639BB6]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                        Envío a domicilio
                      </button>
                    </div>
                    <p className="text-[11px] text-gris-suave mt-2 text-center">
                      {deliveryMode === "tienda"
                        ? "Retirás en el local. Precio más bajo."
                        : "Te lo llevamos a tu puerta. Incluye el costo de reparto."}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gris-suave font-heading">Total</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="price text-2xl font-bold text-azul"
                    >
                      {formatPrice(totalPrice)}
                    </motion.span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={whatsappOrder()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-2xl font-heading font-bold text-sm hover:brightness-110 transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex items-center justify-center gap-2 bg-[#1C3055] text-white py-3 rounded-2xl font-heading font-bold text-sm hover:bg-[#16264a] transition-colors"
                    >
                      Pagar
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
