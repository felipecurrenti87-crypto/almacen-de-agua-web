"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ─── TextRevealWords ───
   Splits text by words, each word animates y:100%→0 with stagger.
   Use on <h2> section titles. */

const wordContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TextRevealWords({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}) {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={wordContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delayChildren: delay / 1000 }}
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.3em] pb-[0.1em] pt-[0.05em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─── TextRevealLine ───
   Entire line slides up from overflow-hidden container.
   Use on <h1> hero title or short impactful lines. */

const lineVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TextRevealLine({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        transition={{ delay: delay / 1000 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
