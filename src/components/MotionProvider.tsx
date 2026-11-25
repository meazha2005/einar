"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";

export type MotionMode = "dynamic" | "subtle" | "off";

interface MotionContextValue {
  motionMode: MotionMode;
  setMotionMode: (mode: MotionMode) => void;
  cycleMotionMode: () => void;
  scrollToSection: (sectionId: string) => void;
  setScrollLocked: (locked: boolean) => void;
  isReduced: boolean;
}

const MotionSettingsContext = createContext<MotionContextValue | null>(null);

export function useMotionSettings() {
  const ctx = useContext(MotionSettingsContext);
  if (!ctx) {
    throw new Error("useMotionSettings must be used inside MotionProvider");
  }
  return ctx;
}

function subscribePrefersReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getPrefersReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getPrefersReducedMotionServerSnapshot() {
  return false;
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemReduced = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    getPrefersReducedMotionServerSnapshot
  );

  const [userMotionOverride, setUserMotionOverride] =
    useState<MotionMode | null>(null);
  const [scrollLocked, setScrollLocked] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const motionMode: MotionMode =
    userMotionOverride ?? (systemReduced ? "off" : "dynamic");

  const setMotionMode = useCallback((mode: MotionMode) => {
    setUserMotionOverride(mode);
  }, []);

  // Expose data-motion attribute to CSS rules (e.g. marquee & scrollbars)
  useEffect(() => {
    document.documentElement.setAttribute("data-motion", motionMode);
  }, [motionMode]);

  // Manage Lenis smooth scroll lifecycle
  useEffect(() => {
    if (motionMode === "off") {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: motionMode === "dynamic" ? 1.15 : 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [motionMode]);

  // Pause Lenis & prevent scroll bleed when modals/drawers open
  useEffect(() => {
    if (scrollLocked) {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [scrollLocked]);

  const cycleMotionMode = useCallback(() => {
    setUserMotionOverride((prev) => {
      const current = prev ?? (systemReduced ? "off" : "dynamic");
      return current === "dynamic"
        ? "subtle"
        : current === "subtle"
          ? "off"
          : "dynamic";
    });
  }, [systemReduced]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const targetId = sectionId.replace(/^#/, "");
      const el =
        targetId === "top" ? document.body : document.getElementById(targetId);
      if (!el) return;

      if (lenisRef.current && motionMode !== "off") {
        lenisRef.current.scrollTo(targetId === "top" ? 0 : el, {
          offset: targetId === "top" ? 0 : -72,
          duration: motionMode === "dynamic" ? 1.1 : 0.65,
        });
      } else {
        const y =
          targetId === "top"
            ? 0
            : el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({
          top: y,
          behavior: motionMode === "off" ? "auto" : "smooth",
        });
      }
    },
    [motionMode]
  );

  const value = useMemo<MotionContextValue>(
    () => ({
      motionMode,
      setMotionMode,
      cycleMotionMode,
      scrollToSection,
      setScrollLocked,
      isReduced: motionMode === "off",
    }),
    [motionMode, setMotionMode, cycleMotionMode, scrollToSection]
  );

  return (
    <MotionSettingsContext.Provider value={value}>
      <MotionConfig reducedMotion={motionMode === "off" ? "always" : "user"}>
        <ScrollProgressLine hidden={motionMode === "off"} />
        {children}
      </MotionConfig>
    </MotionSettingsContext.Provider>
  );
}

function ScrollProgressLine({ hidden }: { hidden: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  if (hidden) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[#0b0c0e]"
      style={{ scaleX }}
    />
  );
}
