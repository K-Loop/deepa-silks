import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered fade-up and reveal component
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  className = "",
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
