import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (shouldReduceMotion) {
    return <main>{children}</main>;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}
