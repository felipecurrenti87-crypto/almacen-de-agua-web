"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { business } from "@/data/business";
import AnimatedSection from "@/components/AnimatedSection";
import { TextRevealLine, TextRevealWords } from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import ProductImage3D from "@/components/ProductImage3D";
import ProductReviews from "@/components/ProductReviews";
import MeshGradientBackground from "@/components/MeshGradientBackground";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  if (product.categoria === "dispensers") {
    return <DispenserDetail product={product} />;
  }
  return <SimpleProductDetail product={product} related={related} />;
}

function DispenserDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const price = product.precio_tienda;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), {
    damping: 20,
    stiffness: 300,
  });
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    damping: 20,
    stiffness: 300,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = imageRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMsg = `Hola! Me interesa el dispenser: ${product.nombre}. Me pueden dar mas informacion?`;

  const scrollToSpecs = () => {
    document.getElementById("specs-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <section className="relative bg-[#EEF5F8] pt-20 pb-12 sm:pt-28 sm:pb-20 md:pt-36 md:pb-40 overflow-hidden">
        <MeshGradientBackground intensity="normal" interactive />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-[#52647A] mb-8">
              <Link href="/tienda" className="hover:text-celeste-neon transition-colors">
                Tienda
              </Link>
              <span>/</span>
              <Link href="/tienda" className="hover:text-celeste-neon transition-colors">
                Dispensers
              </Link>
              <span>/</span>
              <span className="text-[#639BB6]">{product.nombre}</span>
            </nav>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AnimatedSection>
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-square max-w-[320px] sm:max-w-none mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#EEF5F8] to-[#E3EEF4] p-6 sm:p-10 border border-celeste-neon/10 overflow-hidden"
              >
                <div className="absolute top-6 right-8 w-2 h-3 bg-celeste-glow/25 rounded-full animate-drop" />
                <div className="absolute top-14 right-14 w-1.5 h-2.5 bg-celeste-neon/15 rounded-full animate-drop-d1" />

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

                {product.conexion && (
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-heading font-bold px-3 py-1.5 rounded-full backdrop-blur-sm ${
                      product.conexion === "red"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                        : "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {product.conexion === "red" ? "Conexion a Red" : "Botellon"}
                    </span>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <div>
              <TextRevealLine>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-azul mb-3 sm:mb-4">
                  {product.nombre}
                </h1>
              </TextRevealLine>

              <AnimatedSection delay={100}>
                <p className="text-[#52647A] text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  {product.descripcion}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="flex items-end gap-4 mb-6 sm:mb-8">
                  <span className="price text-3xl sm:text-4xl font-bold text-celeste-neon">
                    {formatPrice(price)}
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl font-heading font-bold text-base sm:text-lg transition-all duration-300 ${
                      added
                        ? "bg-green-500 text-[#ffffff]"
                        : "bg-[#1C3055] hover:bg-[#16264a] text-[#ffffff] hover:-translate-y-0.5"
                    }`}
                  >
                    {added ? (
                      <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Agregado al carrito!
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar al carrito
                      </>
                    )}
                  </button>
                  <a
                    href={`${business.whatsappLink}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-[#1C3055]/25 hover:bg-[#EEF5F8] flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl font-heading font-bold text-base sm:text-lg text-azul hover:-translate-y-0.5 transition-all"
                  >
                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Consultar
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <button
                  onClick={scrollToSpecs}
                  className="flex items-center gap-3 text-[#639BB6] hover:text-celeste-neon transition-colors group"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full border border-celeste-neon/30 flex items-center justify-center group-hover:border-celeste-neon/60 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                  <span className="font-heading font-semibold text-sm">
                    Ver especificaciones y beneficios
                  </span>
                </button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section id="specs-section" className="py-12 sm:py-16 md:py-24 bg-[#EEF5F8] relative overflow-hidden">
        <MeshGradientBackground intensity="subtle" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <AnimatedSection>
              <span className="font-heading font-semibold text-celeste-neon text-sm uppercase tracking-wider">
                Ficha tecnica
              </span>
            </AnimatedSection>
            <TextRevealWords className="font-heading font-bold text-3xl sm:text-4xl text-azul mt-3">
              Todo sobre este dispenser
            </TextRevealWords>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {product.specs && (
              <div>
                <TextRevealWords className="font-heading font-bold text-xl text-[#639BB6] mb-8">
                  Caracteristicas tecnicas
                </TextRevealWords>

                <StaggerContainer className="space-y-3">
                  {product.specs.voltaje && (
                    <StaggerItem>
                      <SpecRow label="Voltaje" value={product.specs.voltaje} />
                    </StaggerItem>
                  )}
                  {product.specs.potenciaCalentamiento && (
                    <StaggerItem>
                      <SpecRow label="Potencia calentamiento" value={product.specs.potenciaCalentamiento} />
                    </StaggerItem>
                  )}
                  {product.specs.capacidadCaliente && (
                    <StaggerItem>
                      <SpecRow label="Capacidad caliente" value={product.specs.capacidadCaliente} />
                    </StaggerItem>
                  )}
                  {product.specs.potenciaEnfriamiento && (
                    <StaggerItem>
                      <SpecRow label="Potencia enfriamiento" value={product.specs.potenciaEnfriamiento} />
                    </StaggerItem>
                  )}
                  {product.specs.capacidadFria && (
                    <StaggerItem>
                      <SpecRow label="Capacidad fria" value={product.specs.capacidadFria} />
                    </StaggerItem>
                  )}
                  {product.specs.dimensiones && (
                    <StaggerItem>
                      <SpecRow label="Dimensiones" value={product.specs.dimensiones} />
                    </StaggerItem>
                  )}
                  {product.specs.temperaturas && product.specs.temperaturas.map((t, i) => (
                    <StaggerItem key={i}>
                      <SpecRow label={`Temperatura ${i + 1}`} value={t} />
                    </StaggerItem>
                  ))}
                  {product.specs.extras && product.specs.extras.map((e, i) => (
                    <StaggerItem key={`extra-${i}`}>
                      <SpecRow label="Extra" value={e} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

            {product.beneficios && (
              <div>
                <TextRevealWords className="font-heading font-bold text-xl text-[#639BB6] mb-8">
                  Beneficios
                </TextRevealWords>

                <StaggerContainer className="space-y-3">
                  {product.beneficios.map((b, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-3 bg-white/80 rounded-2xl p-4 border border-celeste-neon/10 hover:border-celeste-neon/25 transition-colors">
                        <div className="w-8 h-8 rounded-xl bg-celeste-neon/10 text-celeste-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-[#52647A] text-sm font-body font-semibold leading-relaxed pt-1">
                          {b}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#EEF5F8] relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <ProductReviews productId={product.id} />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#EEF5F8] relative overflow-hidden">
        <MeshGradientBackground intensity="intense" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-azul mb-4">
              Te interesa este dispenser?
            </h2>
            <p className="text-[#52647A] text-lg mb-8">
              Contactanos para consultar disponibilidad, descuentos y formas de pago.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${business.whatsappLink}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C3055] hover:bg-[#16264a] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-lg text-[#ffffff] hover:-translate-y-0.5 transition-transform"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <Link
                href="/tienda"
                className="border-2 border-[#1C3055]/25 hover:bg-[#EEF5F8] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-lg text-azul hover:-translate-y-0.5 transition-transform"
              >
                Ver mas dispensers
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function SimpleProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const price = product.precio_tienda;
  const otherPrice = product.precio_reparto;
  const otherLabel = "reparto";

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMsg = `Hola! Me interesa: ${product.nombre} (x${qty}). Me pueden dar mas informacion?`;

  return (
    <div>
      <section className="relative bg-[#EEF5F8] pt-20 pb-12 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <MeshGradientBackground intensity="normal" interactive />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-[#52647A] mb-8">
              <Link href="/tienda" className="hover:text-celeste-neon transition-colors">
                Tienda
              </Link>
              <span>/</span>
              <Link href="/tienda" className="hover:text-celeste-neon transition-colors">
                Agua y Soda
              </Link>
              <span>/</span>
              <span className="text-[#639BB6]">{product.nombre}</span>
            </nav>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="relative aspect-square max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-[#EEF5F8] to-[#E3EEF4] p-8 border border-celeste-neon/10 overflow-hidden">
                <div className="absolute top-6 right-8 w-2 h-3 bg-celeste-glow/25 rounded-full animate-drop" />
                <ProductImage3D
                  src={product.imagen}
                  alt={product.nombre}
                  categoria={product.categoria}
                  mouseX={useMotionValue(0)}
                  mouseY={useMotionValue(0)}
                />
              </div>
            </AnimatedSection>

            <div>
              <TextRevealLine>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-azul mb-3">
                  {product.nombre}
                </h1>
              </TextRevealLine>

              <AnimatedSection delay={100}>
                <p className="text-[#52647A] text-base sm:text-lg leading-relaxed mb-6">
                  {product.descripcion}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="mb-6">
                  <span className="price text-3xl sm:text-4xl font-bold text-celeste-neon">
                    {formatPrice(price)}
                  </span>
                  {price !== otherPrice && (
                    <p className="text-[#52647A] text-sm mt-1">
                      En {otherLabel}: {formatPrice(otherPrice)}
                    </p>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#52647A] text-sm font-heading">Cantidad:</span>
                  <div className="flex items-center gap-0 bg-[#E3EEF4] rounded-xl border border-celeste-neon/15 overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center text-azul hover:bg-celeste-neon/10 transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      −
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center text-azul font-heading font-bold text-sm border-x border-celeste-neon/10">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(Math.min(20, qty + 1))}
                      className="w-10 h-10 flex items-center justify-center text-azul hover:bg-celeste-neon/10 transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[#639BB6] text-sm font-heading font-semibold">
                    Total: {formatPrice(price * qty)}
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-heading font-bold text-lg transition-all duration-300 ${
                      added
                        ? "bg-green-500 text-[#ffffff]"
                        : "bg-[#1C3055] hover:bg-[#16264a] text-[#ffffff] hover:-translate-y-0.5"
                    }`}
                  >
                    {added ? (
                      <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Agregado!
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar {qty > 1 ? `(${qty})` : ""} al carrito
                      </>
                    )}
                  </button>
                  <a
                    href={`${business.whatsappLink}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-[#1C3055]/25 hover:bg-[#EEF5F8] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-heading font-bold text-lg text-azul hover:-translate-y-0.5 transition-all"
                  >
                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Pedir por WhatsApp
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {related.length > 0 && (
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <TextRevealWords className="font-heading font-bold text-2xl sm:text-3xl text-azul mb-8 text-center">
              Tambien te puede interesar
            </TextRevealWords>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {related.map((p) => (
                <StaggerItem key={p.id}>
                  <Link
                    href={`/tienda/${p.id}`}
                    className="group block bg-celeste-light/30 rounded-2xl p-4 border border-celeste-medium/20 hover:border-celeste/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square mb-3 flex items-center justify-center">
                      <ProductImage3D
                        src={p.imagen}
                        alt={p.nombre}
                        categoria={p.categoria}
                        mouseX={useMotionValue(0)}
                        mouseY={useMotionValue(0)}
                      />
                    </div>
                    <h3 className="font-heading font-bold text-azul text-sm mb-1 group-hover:text-celeste-neon transition-colors">
                      {p.nombre}
                    </h3>
                    <span className="price text-celeste-neon font-bold text-lg">
                      {formatPrice(p.precio_tienda)}
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 bg-celeste-light/20">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <ProductReviews productId={product.id} />
        </div>
      </section>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl bg-[#E3EEF4]/80 border border-celeste-neon/8 hover:border-celeste-neon/20 transition-colors gap-2">
      <span className="text-[#52647A] text-xs sm:text-sm font-body flex-shrink-0">{label}</span>
      <span className="text-azul font-body font-bold text-xs sm:text-sm text-right">
        {value}
      </span>
    </div>
  );
}
