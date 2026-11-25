"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ShieldCheck, Layers, Truck } from "lucide-react";
import { useMotionSettings } from "./MotionProvider";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
  label: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "obsidian",
    src: "/images/hero-warrior-tee.jpg",
    alt: "Model wearing EINAR Obsidian Black 320 GSM heavyweight boxy t-shirt",
    objectPosition: "object-[62%_12%] sm:object-[center_10%]",
    label: "01 // Obsidian",
  },
  {
    id: "charcoal",
    src: "/images/lookbook-warrior-stance.jpg",
    alt: "Model wearing EINAR Washed Charcoal 320 GSM heavyweight t-shirt",
    objectPosition: "object-[60%_15%] sm:object-[center_14%]",
    label: "02 // Charcoal",
  },
  {
    id: "chalk",
    src: "/images/hero-chalk-editorial.jpg",
    alt: "Model wearing EINAR Chalk White 320 GSM boxy t-shirt",
    objectPosition: "object-[76%_12%] sm:object-[72%_12%]",
    label: "03 // Chalk",
  },
];

export function HeroSection() {
  const { motionMode, scrollToSection } = useMotionSettings();
  const [activeSlide, setActiveSlide] = useState(0);

  const animateDynamic = motionMode === "dynamic";
  const animateAny = motionMode !== "off";

  useEffect(() => {
    if (motionMode === "off") return;
    const intervalMs = motionMode === "dynamic" ? 4800 : 6500;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [motionMode]);

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <section
      id="top"
      className="relative flex flex-1 w-full items-center overflow-hidden border-b border-[#dfe2e7] bg-[#f4f5f7]"
    >
      {/* Subtle architectural background grid on light canvas */}
      <div
        aria-hidden="true"
        className="bg-studio-grid pointer-events-none absolute inset-0 z-0 opacity-75"
      />

      {/* Right-side rotating 3-image background canvas — visible on mobile, tablet, and desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[86%] overflow-hidden sm:w-[68%] md:w-[62%] lg:w-[58%]"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={
              animateAny
                ? { opacity: 0, scale: animateDynamic ? 1.045 : 1 }
                : { opacity: 1 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={animateAny ? { opacity: 0 } : { opacity: 0 }}
            transition={{
              opacity: { duration: animateAny ? 0.95 : 0, ease: "easeInOut" },
              scale: { duration: animateDynamic ? 4.8 : 0, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              priority
              sizes="(max-width: 639px) 86vw, (max-width: 1023px) 68vw, 58vw"
              className={`object-cover ${currentSlide.objectPosition}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Seamless horizontal gradient fade from light canvas into right-side imagery */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f5f7] from-[10%] via-[#f4f5f7]/82 via-[42%] to-transparent sm:from-[4%] sm:via-[#f4f5f7]/65 sm:via-[30%]" />
      </div>

      {/* Vertically Centered Foreground Content Stage across all devices */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="max-w-[90%] sm:max-w-xl md:max-w-[540px] lg:max-w-[590px]">
          {/* Eyebrow Metadata Strip */}
          <motion.div
            initial={animateAny ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animateAny ? 0.45 : 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#d6d9e0] bg-white/92 px-3 py-1 backdrop-blur-xs sm:px-3.5 sm:py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0b0c0e]" />
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[#262930] uppercase sm:text-[11px]">
              Drop 01 // Monolith Series India
            </span>
          </motion.div>

          {/* Fluid Headline sized to fit cleanly inside viewport alongside ribbon */}
          <motion.h1
            initial={animateAny ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animateAny ? 0.6 : 0,
              delay: animateAny ? 0.06 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3 font-display text-[clamp(1.95rem,5.8vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#0b0c0e] sm:mt-4"
          >
            ARMOUR IN
            <br />
            <span className="text-[#454a54]">HEAVYWEIGHT</span>
            <br />
            COTTON.
          </motion.h1>

          {/* Concise Brand Narrative in Indian English */}
          <motion.p
            initial={animateAny ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animateAny ? 0.6 : 0,
              delay: animateAny ? 0.12 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3 max-w-md text-[13px] leading-relaxed text-[#2d3138] sm:mt-4 sm:max-w-lg sm:text-base lg:text-[17px]"
          >
            Crafted exclusively in chalk white, studio grey, slate, and obsidian.{" "}
            <strong className="font-semibold text-[#0b0c0e]">EINAR™</strong>{" "}
            engineers 320 GSM combed Indian cotton tees shaped around the quiet
            discipline of <span className="italic">The One Warrior</span>.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={animateAny ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animateAny ? 0.55 : 0,
              delay: animateAny ? 0.18 : 0,
            }}
            className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection("collection")}
              className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0d0e11] px-6 py-2.5 text-xs font-semibold tracking-[0.15em] text-white uppercase shadow-[0_10px_24px_-10px_rgba(11,12,14,0.45)] transition-all hover:bg-[#252830] active:scale-[0.99] sm:min-h-[48px] sm:w-auto sm:px-7"
            >
              <span>Shop Drop 01 Tees</span>
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("craft")}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#c8cdd5] bg-white/90 px-6 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#0b0c0e] uppercase backdrop-blur-xs transition-colors hover:border-[#0b0c0e] hover:bg-white sm:min-h-[48px] sm:w-auto"
            >
              <span>Fabric Engineering</span>
            </button>
          </motion.div>

          {/* Compact Telemetry Row */}
          <motion.div
            initial={animateAny ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animateAny ? 0.55 : 0,
              delay: animateAny ? 0.24 : 0,
            }}
            className="mt-4 grid grid-cols-3 gap-2 border-t border-[#d6d9e0]/90 pt-3.5 sm:mt-6 sm:gap-3 sm:pt-5"
          >
            <div className="rounded-xl border border-[#dfe2e7]/80 bg-white/90 px-2.5 py-2 backdrop-blur-xs sm:px-3.5 sm:py-3">
              <div className="flex items-center gap-1 text-[#5e6470]">
                <Layers className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                <span className="truncate font-mono text-[9px] uppercase sm:text-[10px]">
                  Weight
                </span>
              </div>
              <p className="mt-0.5 font-display text-xs font-bold text-[#0b0c0e] sm:mt-1 sm:text-lg">
                320 GSM
              </p>
            </div>
            <div className="rounded-xl border border-[#dfe2e7]/80 bg-white/90 px-2.5 py-2 backdrop-blur-xs sm:px-3.5 sm:py-3">
              <div className="flex items-center gap-1 text-[#5e6470]">
                <ShieldCheck className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                <span className="truncate font-mono text-[9px] uppercase sm:text-[10px]">
                  Collar
                </span>
              </div>
              <p className="mt-0.5 font-display text-xs font-bold text-[#0b0c0e] sm:mt-1 sm:text-lg">
                2.4 cm Rib
              </p>
            </div>
            <div className="rounded-xl border border-[#dfe2e7]/80 bg-white/90 px-2.5 py-2 backdrop-blur-xs sm:px-3.5 sm:py-3">
              <div className="flex items-center gap-1 text-[#5e6470]">
                <Truck className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                <span className="truncate font-mono text-[9px] uppercase sm:text-[10px]">
                  Delivery
                </span>
              </div>
              <p className="mt-0.5 font-display text-xs font-bold text-[#0b0c0e] sm:mt-1 sm:text-lg">
                Pan-India
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Minimal Background Slide Controls (Top-right on mobile, bottom-right on sm+) */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2 rounded-full border border-[#d6d9e0]/85 bg-white/85 px-2.5 py-1 backdrop-blur-xs sm:top-auto sm:right-6 sm:bottom-5 sm:px-3 sm:py-1.5">
        <span className="font-mono text-[9px] tracking-wider text-[#262930] uppercase sm:text-[10px]">
          {currentSlide.label}
        </span>
        <div
          className="flex items-center gap-1.5"
          role="tablist"
          aria-label="Hero lookbook slides"
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === activeSlide;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show ${slide.label}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-5 bg-[#0b0c0e] sm:w-6"
                    : "w-1.5 bg-[#9ea3ab] hover:bg-[#5e6470] sm:w-2"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
