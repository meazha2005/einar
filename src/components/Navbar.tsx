"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  Sparkles,
  PauseCircle,
  Gauge,
  ArrowUpRight,
} from "lucide-react";
import { useMotionSettings, type MotionMode } from "./MotionProvider";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { id: "collection", label: "Collection", num: "01" },
  { id: "ethos", label: "Ethos", num: "02" },
  { id: "craft", label: "Craft", num: "03" },
  { id: "lookbook", label: "Lookbook", num: "04" },
];

const MOTION_MODES: { value: MotionMode; label: string; short: string }[] = [
  { value: "dynamic", label: "Dynamic Motion", short: "Dynamic" },
  { value: "subtle", label: "Subtle Motion", short: "Subtle" },
  { value: "off", label: "Motion Off", short: "Static" },
];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const {
    motionMode,
    setMotionMode,
    cycleMotionMode,
    scrollToSection,
    setScrollLocked,
  } = useMotionSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollPos = window.scrollY + 140;
      let current = "top";
      for (const item of NAV_LINKS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(mobileOpen);
  }, [mobileOpen, setScrollLocked]);

  const handleNavigate = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const MotionIcon =
    motionMode === "dynamic"
      ? Sparkles
      : motionMode === "subtle"
        ? Gauge
        : PauseCircle;

  const currentMotionLabel =
    motionMode === "dynamic"
      ? "Dynamic"
      : motionMode === "subtle"
        ? "Subtle"
        : "Static";

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "border-b border-[#dfe2e7] bg-white/90 backdrop-blur-md"
            : "border-b border-transparent bg-[#f6f7f9]/85 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavigate("top")}
            aria-label="EINAR home"
            className="group flex min-h-[44px] items-center gap-2.5 text-left focus:outline-none"
          >
            <span className="relative flex h-9 w-11 items-center justify-center overflow-hidden rounded-md border border-[#dfe2e7] bg-white p-1 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/einar-emblem-dark.png"
                alt="EINAR Spartan emblem"
                width={44}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-[0.26em] text-[#0b0c0e] sm:text-lg">
                EINAR
                <sup className="ml-0.5 text-[9px] font-medium tracking-normal text-[#5e6470]">
                  ™
                </sup>
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#5e6470] uppercase">
                The One Warrior
              </span>
            </span>
          </button>

          {/* Desktop & Tablet Navigation */}
          <nav
            aria-label="Primary sections"
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className={`relative rounded-full px-3.5 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                    isActive
                      ? "text-[#0b0c0e]"
                      : "text-[#5e6470] hover:text-[#0b0c0e]"
                  }`}
                >
                  {isActive && motionMode !== "off" && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-[#e6e8ec]"
                    />
                  )}
                  {isActive && motionMode === "off" && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-[#e6e8ec]" />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Motion Toggle + Bag + Mobile Menu */}
          <div className="flex items-center gap-2">
            
            {/* Bag Drawer Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag (${cartCount} items)`}
              className="relative flex min-h-[42px] items-center gap-2 rounded-full bg-[#0d0e11] px-3.5 py-2 text-xs font-medium tracking-wider text-white uppercase transition-all hover:bg-[#262930] active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/15 px-1.5 font-mono text-[11px] text-white">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#d6d9e0] bg-white text-[#0b0c0e] transition-colors hover:bg-[#eceef1] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionMode === "off" ? 0 : 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-[#0b0c0e]/45 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                motionMode === "off"
                  ? { duration: 0 }
                  : { type: "spring", damping: 30, stiffness: 320 }
              }
              aria-label="Mobile Navigation"
              className="absolute top-0 right-0 flex h-full w-full max-w-[340px] flex-col justify-between bg-[#f6f7f9] p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#dfe2e7] pb-4">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/brand/einar-emblem-dark.png"
                      alt="EINAR"
                      width={36}
                      height={26}
                      className="h-6 w-auto object-contain"
                    />
                    <span className="font-display text-sm font-bold tracking-[0.25em] text-[#0b0c0e]">
                      EINAR™
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6d9e0] bg-white text-[#0b0c0e]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => handleNavigate(link.id)}
                      className="flex min-h-[54px] items-center justify-between rounded-xl border border-transparent bg-white px-4 text-left transition-colors hover:border-[#d6d9e0] active:bg-[#eceef1]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#888f9c]">
                          {link.num}
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight text-[#0b0c0e]">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#5e6470]" />
                    </button>
                  ))}
                </nav>

                {/* Mobile Motion Controls */}
                <div className="mt-6 rounded-2xl border border-[#dfe2e7] bg-white p-4">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-medium tracking-wider text-[#5e6470] uppercase">
                      Motion Control
                    </span>
                    <MotionIcon className="h-4 w-4 text-[#0b0c0e]" />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {MOTION_MODES.map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setMotionMode(m.value)}
                        className={`min-h-[38px] rounded-lg px-2 text-xs font-medium transition-colors ${
                          motionMode === m.value
                            ? "bg-[#0d0e11] text-white"
                            : "bg-[#f2f3f5] text-[#262930] hover:bg-[#e5e7eb]"
                        }`}
                      >
                        {m.short}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dark Footer Identity Box inside Mobile Drawer */}
              <div className="rounded-2xl bg-[#0d0e11] p-5 text-white">
                <Image
                  src="/brand/einar-lockup-light.png"
                  alt="EINAR - The One Warrior"
                  width={200}
                  height={112}
                  className="mx-auto h-20 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleNavigate("collection")}
                  className="mt-4 flex min-h-[46px] w-full items-center justify-center rounded-xl bg-white text-xs font-semibold tracking-[0.14em] text-[#0b0c0e] uppercase transition-colors hover:bg-[#e5e7eb]"
                >
                  Shop Drop 01
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
