"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMotionSettings } from "./MotionProvider";

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function RevealBlock({
  children,
  className = "",
  delay = 0,
  yOffset = 22,
}: RevealBlockProps) {
  const { motionMode } = useMotionSettings();

  if (motionMode === "off") {
    return <div className={className}>{children}</div>;
  }

  const isSubtle = motionMode === "subtle";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: isSubtle ? 8 : yOffset,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: isSubtle ? 0.35 : 0.65,
        delay: isSubtle ? Math.min(delay, 0.1) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
