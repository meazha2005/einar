"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EMBLEM_ANATOMY } from "@/data/einarData";
import { RevealBlock } from "./RevealBlock";
import { useMotionSettings } from "./MotionProvider";

export function PhilosophySection() {
  const { motionMode } = useMotionSettings();
  const [surfacePreview, setSurfacePreview] = useState<"light" | "dark">(
    "light"
  );

  return (
    <section
      id="ethos"
      className="border-b border-[#dfe2e7] bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealBlock className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#5e6470] uppercase">
              02 // Brand Identity & Logo DNA
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b0c0e] sm:text-4xl lg:text-5xl">
              THE ONE WARRIOR ETHOS
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#454a54] sm:text-base">
            Every silhouette and seam extends directly from our emblem —
            balancing Spartan discipline with sharp modern geometry.
          </p>
        </RevealBlock>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Interactive Brand Mark Contrast Showcase */}
          <RevealBlock className="lg:col-span-5">
            <div
              className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-colors duration-500 sm:p-8 ${
                surfacePreview === "light"
                  ? "border-[#dfe2e7] bg-[#f4f5f7] text-[#0b0c0e]"
                  : "border-[#2a2d34] bg-[#0d0e11] text-white bg-studio-grid-dark"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
                    surfacePreview === "light"
                      ? "text-[#5e6470]"
                      : "text-[#9ea3ab]"
                  }`}
                >
                  Official Lockup // Contrast Study
                </span>

                {/* Light / Dark Ground Switcher */}
                <div
                  className={`inline-flex rounded-full p-1 ${
                    surfacePreview === "light"
                      ? "border border-[#d6d9e0] bg-white"
                      : "border border-white/15 bg-[#1a1c22]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSurfacePreview("light")}
                    className={`min-h-[30px] rounded-full px-3 text-[11px] font-medium transition-colors ${
                      surfacePreview === "light"
                        ? "bg-[#0d0e11] text-white"
                        : "text-[#9ea3ab] hover:text-white"
                    }`}
                  >
                    Alabaster
                  </button>
                  <button
                    type="button"
                    onClick={() => setSurfacePreview("dark")}
                    className={`min-h-[30px] rounded-full px-3 text-[11px] font-medium transition-colors ${
                      surfacePreview === "dark"
                        ? "bg-white text-[#0b0c0e]"
                        : "text-[#5e6470] hover:text-[#0b0c0e]"
                    }`}
                  >
                    Obsidian
                  </button>
                </div>
              </div>

              {/* Lockup Artwork Frame */}
              <div className="my-8 flex min-h-[200px] items-center justify-center sm:my-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={surfacePreview}
                    initial={
                      motionMode === "off" ? false : { opacity: 0, scale: 0.96 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      motionMode === "off"
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.96 }
                    }
                    transition={{ duration: motionMode === "off" ? 0 : 0.28 }}
                    className="w-full max-w-[330px]"
                  >
                    <Image
                      src={
                        surfacePreview === "light"
                          ? "/brand/einar-lockup-dark.png"
                          : "/brand/einar-lockup-light.png"
                      }
                      alt="EINAR — The One Warrior official lockup"
                      width={705}
                      height={398}
                      className="h-auto w-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                className={`border-t pt-4 text-xs leading-relaxed ${
                  surfacePreview === "light"
                    ? "border-[#dfe2e7] text-[#454a54]"
                    : "border-white/15 text-[#b4b8c2]"
                }`}
              >
                <strong
                  className={
                    surfacePreview === "light" ? "text-[#0b0c0e]" : "text-white"
                  }
                >
                  Adaptive Monolith Mark:
                </strong>{" "}
                Finished in dual brushed-obsidian and brushed-chrome treatments
                so every chest crest and neck print retains razor-sharp clarity
                across both chalk white and obsidian tees.
              </div>
            </div>
          </RevealBlock>

          {/* Emblem Anatomy 2x2 Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {EMBLEM_ANATOMY.map((item, idx) => (
              <RevealBlock key={item.code} delay={idx * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#dfe2e7] bg-[#f6f7f9] p-5 transition-colors duration-300 hover:border-[#0b0c0e]/35 hover:bg-white sm:p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d0e11] font-mono text-xs font-medium text-white">
                        {item.code}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-[#5e6470] uppercase">
                        {item.element}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-[#0b0c0e] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#454a54]">
                      {item.meaning}
                    </p>
                  </div>
                  <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-[#0b0c0e]/25 via-[#0b0c0e]/10 to-transparent" />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
