"use client";

import { motion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";

// motion-dom ships without type declarations in the installed version of
// framer-motion, so HTMLMotionProps loses its animation props at the TS level.
// This cast restores them without affecting runtime behaviour.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionDiv = motion.div as ComponentType<any>;

export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}
