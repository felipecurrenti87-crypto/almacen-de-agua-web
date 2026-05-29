"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ─── StaggerContainer ───
   Parent that orchestrates staggered child animations.
   Replaces the pattern: <AnimatedSection delay={i * 100}> in grids. */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay / 1000,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem ───
   Child element that fades + slides + deblurs.
   Must be a direct child of StaggerContainer. */

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
