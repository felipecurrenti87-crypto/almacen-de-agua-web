"use client";

import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

type CursorVariant = "default" | "pointer" | "product";

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw cursor position (instant, no spring)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring follows with spring (damping:25 stiffness:700 = snappy but smooth)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 700, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 700, mass: 0.5 });

  // Glow follows with softer spring
  const glowX = useSpring(cursorX, { damping: 20, stiffness: 300, mass: 0.8 });
  const glowY = useSpring(cursorY, { damping: 20, stiffness: 300, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Detect touch device
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsTouchDevice(!hasHover);

    if (!hasHover) return;

    // Detect cursor target type via event delegation
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(
        "[data-cursor], a, button, [role='button'], input[type='submit'], select, label"
      );

      if (!el) {
        setVariant("default");
        return;
      }

      const dataCursor = el.getAttribute("data-cursor");
      if (dataCursor === "product") {
        setVariant("product");
      } else if (
        dataCursor === "pointer" ||
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.getAttribute("role") === "button" ||
        el.tagName === "SELECT" ||
        el.tagName === "LABEL" ||
        (el.tagName === "INPUT" &&
          (el as HTMLInputElement).type === "submit")
      ) {
        setVariant("pointer");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const ringSize =
    variant === "default" ? 40 : variant === "pointer" ? 56 : 64;
  const ringColor =
    variant === "product"
      ? "rgba(56, 189, 248, 0.4)"
      : variant === "pointer"
        ? "rgba(125, 211, 252, 0.25)"
        : "rgba(125, 211, 252, 0.15)";

  return (
    <>
      {/* Layer 1: Dot - instant follow, dark with light outline */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.6)]"
          animate={{
            width: 12,
            height: 12,
            backgroundColor:
              variant === "product" ? "#38BDF8" : "#0A0A0F",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Layer 2: Ring - spring follow, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border-2"
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor: ringColor,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Layer 3: Glow - softer spring, only on hover states */}
      <AnimatePresence>
        {variant !== "default" && isVisible && (
          <motion.div
            className="fixed top-0 left-0 z-[9997] pointer-events-none"
            style={{
              x: glowX,
              y: glowY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-[120px] h-[120px] rounded-full blur-xl"
              style={{
                background:
                  variant === "product"
                    ? "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(125,211,252,0.08) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
