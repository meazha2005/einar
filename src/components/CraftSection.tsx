"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CRAFT_TABS } from "@/data/einarData";
import { RevealBlock } from "./RevealBlock";
import { useMotionSettings } from "./MotionProvider";

export function CraftSection() {
  const { motionMode } = useMotionSettings();
  const [activeTabId, setActiveTabId] = useState(CRAFT_TABS[0].id);

  const activeTab =
    CRAFT_TABS.find((t) => t.id === activeTabId) ?? CRAFT_TABS[0];

  return (
    <section
      id="craft"
      className="border-b border-[#dfe2e7] bg-[#f6f7f9] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: Macro Textile Photography */}
          <RevealBlock className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#dfe2e7] bg-[#eceef1] shadow-[0_20px_50px_-28px_rgba(11,12,14,0.22)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/craft-fabric-detail.jpg"
                  alt="Macro detail of heavyweight charcoal and matte black 320 GSM combed cotton tees beside a stone plinth"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dfe2e7] bg-white px-5 py-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#5e6470] uppercase">
                    Textile Standard
                  </p>
                  <p className="font-display text-sm font-bold text-[#0b0c0e]">
                    Custom Milled Long-Staple Indian Cotton
                  </p>
                </div>
                <span className="rounded-full bg-[#0d0e11] px-3 py-1 font-mono text-[11px] font-medium text-white">
                  320 GSM // ZERO TORQUE
                </span>
              </div>
            </div>
          </RevealBlock>

          {/* Right: Interactive Spec Selector */}
          <RevealBlock delay={0.08} className="lg:col-span-6">
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#5e6470] uppercase">
              03 // Garment Engineering
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b0c0e] sm:text-4xl">
              BUILT TO OUTLAST SEASONS
            </h2>

            {/* Mobile-scrollable Tab Strip */}
            <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
              {CRAFT_TABS.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabId(tab.id)}
                    className={`min-h-[40px] shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-[#0d0e11] text-white shadow-sm"
                        : "border border-[#d6d9e0] bg-white text-[#262930] hover:border-[#0b0c0e]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Spec Content Card */}
            <div className="mt-5 rounded-2xl border border-[#dfe2e7] bg-white p-5 shadow-xs sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={motionMode === "off" ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    motionMode === "off"
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6 }
                  }
                  transition={{ duration: motionMode === "off" ? 0 : 0.25 }}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#eceef1] pb-4">
                    <span className="font-mono text-xs font-medium tracking-[0.14em] text-[#5e6470] uppercase">
                      {activeTab.label}
                    </span>
                    <span className="rounded-lg bg-[#eceef1] px-2.5 py-1 font-mono text-xs font-semibold text-[#0b0c0e]">
                      {activeTab.metric}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#0b0c0e] sm:text-2xl">
                    {activeTab.headline}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#454a54] sm:text-base">
                    {activeTab.copy}
                  </p>

                  <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {activeTab.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-xl border border-[#eceef1] bg-[#f6f7f9] p-3"
                      >
                        <dt className="font-mono text-[10px] tracking-wider text-[#5e6470] uppercase">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 text-xs font-semibold text-[#0b0c0e]">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
