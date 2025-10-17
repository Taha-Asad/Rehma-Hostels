// components/MotionSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type MotionSectionProps = React.PropsWithChildren<{
  id?: string;
  className?: string;
  // small config overrides if you need them
  y?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}>;

export default function MotionSection({
  id,
  children,
  className,
  y = 40,
  duration = 0.6,
  delay = 0,
  once = true,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
}
