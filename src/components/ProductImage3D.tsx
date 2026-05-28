"use client";

import { useState, useMemo } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";

const placeholders: Record<string, { emoji: string; bg: string }> = {
  agua: { emoji: "\u{1F4A7}", bg: "from-blue-100 to-cyan-50" },
  dispensers: { emoji: "\u{1F6B0}", bg: "from-sky-100 to-blue-50" },
};

export default function ProductImage3D({
  src,
  alt,
  categoria,
  mouseX,
  mouseY,
}: {
  src: string;
  alt: string;
  categoria: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const [error, setError] = useState(false);
  const placeholder = placeholders[categoria] || placeholders.agua;

  // Check for reduced motion preference
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Check for touch device
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none)").matches;
  }, []);

  const shouldAnimate = !prefersReduced && !isTouch;

  // Shadow layer: slow springs (feels far away)
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 30,
    stiffness: 150,
  });
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), {
    damping: 30,
    stiffness: 150,
  });

  // Glow layer: fast springs (feels close)
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), {
    damping: 15,
    stiffness: 400,
  });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), {
    damping: 15,
    stiffness: 400,
  });

  // Fallback placeholder (no image or error)
  if (error || !src) {
    return (
      <div
        className={`w-full h-full rounded-2xl bg-gradient-to-br ${placeholder.bg} flex flex-col items-center justify-center gap-2`}
      >
        <span className="text-5xl">{placeholder.emoji}</span>
        <span className="text-xs text-gris-suave font-heading">
          Imagen pr&oacute;ximamente
        </span>
      </div>
    );
  }

  // Static render for touch / reduced-motion
  if (!shouldAnimate) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-lg"
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Layer 1: Shadow (back) — same image darkened + blurred */}
      <motion.img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{
          x: shadowX,
          y: shadowY,
          filter: "brightness(0) blur(12px)",
          opacity: 0.15,
          scale: 0.92,
        }}
        onError={() => setError(true)}
        loading="lazy"
        draggable={false}
      />

      {/* Layer 2: Main product (center) — inherits parallax from parent */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-contain drop-shadow-lg z-10"
        onError={() => setError(true)}
        loading="lazy"
        draggable={false}
      />

      {/* Layer 3: Glow highlight (front) — radial gradient, moves fastest */}
      <motion.div
        className="absolute inset-[-25%] z-20 pointer-events-none select-none rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
