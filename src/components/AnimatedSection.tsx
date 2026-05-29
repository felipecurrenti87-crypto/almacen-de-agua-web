"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // easeOutExpo
    },
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: delay / 1000 }} // delay was in ms, convert to seconds
      className={className}
    >
      {children}
    </motion.div>
  );
}
