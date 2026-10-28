"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "figure";
};

/** Fades and lifts its children the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: Props) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

/** Wipes an image (or any block) open from the bottom edge as it scrolls into view. */
export function RevealMask({ children, delay = 0, className }: Omit<Props, "y" | "as">) {
  return (
    <motion.div
      // the stylesheet !important beats Motion's inline style, so reduced-motion users see it at once
      className={`motion-reduce:[clip-path:none]! ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
