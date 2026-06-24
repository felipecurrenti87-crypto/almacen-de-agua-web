"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import ProductImage3D from "./ProductImage3D";
import { ProductRatingBadge } from "./ProductReviews";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Disable expensive tilt/parallax springs on touch devices
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none)").matches;
  }, []);

  // Siempre se muestra el precio de tienda (el más barato). El precio de
  // reparto se aclara como nota; la opción se elige en el carrito.
  const price = product.precio_tienda;
  const repartoPrice = product.precio_reparto;

  // Mouse position relative to card center (for tilt + magnetic)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt ±5° derived from mouse position
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    damping: 20,
    stiffness: 300,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    damping: 20,
    stiffness: 300,
  });

  // Image parallax (opposite to tilt, ±12px)
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 300,
  });
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 300,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return; // Skip on touch devices
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Normalized -0.5 to 0.5
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const isDispenser = product.categoria === "dispensers";

  return (
    <motion.div
      ref={cardRef}
      data-cursor="product"
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-celeste-medium/30 hover:border-celeste/50"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="relative aspect-square bg-gradient-to-br from-celeste-light to-white p-3 sm:p-6">
        <div className="absolute top-2 right-4 w-2 h-3 bg-celeste/30 rounded-full animate-drop" />
        <div className="absolute top-8 right-8 w-1.5 h-2.5 bg-celeste/20 rounded-full animate-drop-d1" />

        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{ x: imgX, y: imgY }}
        >
          <ProductImage3D
            src={product.imagen}
            alt={product.nombre}
            categoria={product.categoria}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </motion.div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-heading font-bold text-azul text-base sm:text-lg leading-tight mb-1">
          {product.nombre}
        </h3>
        <p className="text-gris-suave text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
          {product.descripcion}
        </p>
        <ProductRatingBadge productId={product.id} />

        <div className="flex items-end justify-between mb-3 sm:mb-4">
          <div>
            <span className="price text-xl sm:text-2xl font-bold text-celeste-neon">
              {formatPrice(price)}
            </span>
            {repartoPrice > price && (
              <p className="text-[11px] sm:text-xs text-gris-suave mt-0.5">
                Con reparto: {formatPrice(repartoPrice)}
              </p>
            )}
          </div>
        </div>

        {/* Connection badge for dispensers */}
        {isDispenser && product.conexion && (
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1 rounded-full ${
              product.conexion === "red"
                ? "bg-blue-500/10 text-blue-500 border border-blue-500/25"
                : product.conexion === "natural"
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/25"
                  : "bg-cyan-500/10 text-cyan-500 border border-cyan-500/25"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {product.conexion === "red" ? "Conexion a Red" : product.conexion === "natural" ? "Natural" : "Botellón"}
            </span>
          </div>
        )}

        <div className={`${isDispenser ? "flex flex-col sm:flex-row gap-2" : ""}`}>
          {isDispenser && (
            <Link
              href={`/tienda/${product.id}`}
              className="w-full sm:flex-1 h-[48px] flex items-center justify-center gap-1.5 px-3 rounded-2xl font-body font-semibold text-xs sm:text-sm whitespace-nowrap liquid-glass-btn-light text-azul hover:text-white transition-all"
            >
              Ver detalles
            </Link>
          )}
          <button
            onClick={handleAdd}
            className={`relative ${isDispenser ? "w-full sm:flex-1" : "w-full"} h-[48px] rounded-2xl font-body font-semibold text-xs sm:text-sm overflow-hidden`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center gap-1.5 px-2 whitespace-nowrap bg-green-500 text-white rounded-2xl absolute inset-0"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Agregado!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center gap-1.5 px-2 whitespace-nowrap bg-[#1C3055] text-white rounded-2xl absolute inset-0 hover:bg-[#16264a] transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {isDispenser ? (
                    "Agregar"
                  ) : (
                    <>
                      <span className="sm:hidden">Agregar</span>
                      <span className="hidden sm:inline">Agregar al carrito</span>
                    </>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
