"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Ruler } from "lucide-react";
import { FIT_COMPARISON } from "@/data/einarData";
import { RevealBlock } from "./RevealBlock";
import { useMotionSettings } from "./MotionProvider";

export function LookbookSection() {
  const { scrollToSection } = useMotionSettings();
  const [fitMode, setFitMode] = useState<"boxy" | "core">("boxy");

  return (
    <section
      id="lookbook"
      className="border-b border-[#dfe2e7] bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealBlock className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#5e6470] uppercase">
              04 // Campaign & Silhouette Fit
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b0c0e] sm:text-4xl lg:text-5xl">
              STILLNESS IN MOTION
            </h2>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("collection")}
            className="inline-flex min-h-[42px] w-fit items-center gap-2 rounded-full border border-[#cfd3db] bg-[#f6f7f9] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-[#0b0c0e] uppercase transition-colors hover:border-[#0b0c0e] hover:bg-[#eceef1]"
          >
            <span>Return to Drop 01</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </RevealBlock>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Editorial Lookbook Campaign Frame */}
          <RevealBlock className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-3xl border border-[#dfe2e7] bg-[#eceef1]">
              <div className="relative aspect-[4/3] w-full lg:h-full lg:min-h-[430px]">
                <Image
                  src="/images/lookbook-warrior-stance.jpg"
                  alt="EINAR campaign lookbook showing washed charcoal heavyweight boxy tee against concrete studio wall"
                  fill
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/75 via-[#0b0c0e]/10 to-transparent"
                />
              </div>

              <div className="absolute right-4 bottom-4 left-4 flex flex-col justify-between gap-3 rounded-2xl border border-white/15 bg-[#0d0e11]/88 p-4 text-white backdrop-blur-md sm:flex-row sm:items-center sm:p-5">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#b4b8c2] uppercase">
                    Look 03 // Concrete Studio
                  </span>
                  <p className="mt-1 font-display text-base font-bold sm:text-lg">
                    Model is 185 cm (6&apos;1&quot;) wearing Size L — Boxy Oversized
                  </p>
                </div>
                <span className="w-fit shrink-0 rounded-full border border-white/25 px-3 py-1 font-mono text-[11px] text-[#e5e7eb]">
                  TRUE TO DRAPE
                </span>
              </div>
            </div>
          </RevealBlock>

          {/* Interactive Fit Architecture Card */}
          <RevealBlock delay={0.08} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[#dfe2e7] bg-[#f6f7f9] p-5 sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[#0b0c0e]">
                    <Ruler className="h-4 w-4" />
                    <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                      Fit Telemetry (cm)
                    </span>
                  </div>

                  <div className="inline-flex rounded-full border border-[#d6d9e0] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setFitMode("boxy")}
                      className={`min-h-[32px] rounded-full px-3 text-[11px] font-semibold transition-colors ${
                        fitMode === "boxy"
                          ? "bg-[#0d0e11] text-white"
                          : "text-[#5e6470] hover:text-[#0b0c0e]"
                      }`}
                    >
                      Boxy Cut
                    </button>
                    <button
                      type="button"
                      onClick={() => setFitMode("core")}
                      className={`min-h-[32px] rounded-full px-3 text-[11px] font-semibold transition-colors ${
                        fitMode === "core"
                          ? "bg-[#0d0e11] text-white"
                          : "text-[#5e6470] hover:text-[#0b0c0e]"
                      }`}
                    >
                      Core Cut
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#454a54]">
                  {fitMode === "boxy"
                    ? "Boxy Oversized delivers +4 cm dropped shoulders and wider chest clearance for structured street presence. Pick your regular Indian size for the intended drape."
                    : "Tailored Core offers a contoured shoulder seam and closer athletic chest fit — ideal for layering or crisp daily wear."}
                </p>

                {/* Responsive Measurement Table */}
                <div className="mt-5 overflow-hidden rounded-2xl border border-[#dfe2e7] bg-white">
                  <div className="grid grid-cols-3 border-b border-[#eceef1] bg-[#f2f3f5] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-wider text-[#5e6470] uppercase">
                    <span>Size</span>
                    <span className="text-center">Half Chest</span>
                    <span className="text-right">Body Length</span>
                  </div>
                  <div className="divide-y divide-[#eceef1]">
                    {FIT_COMPARISON.map((row) => (
                      <div
                        key={row.size}
                        className="grid grid-cols-3 items-center px-4 py-3 text-sm"
                      >
                        <span className="font-mono font-bold text-[#0b0c0e]">
                          {row.size}
                        </span>
                        <span className="text-center font-mono text-xs text-[#262930]">
                          {fitMode === "boxy" ? row.chestBoxy : row.chestCore}
                        </span>
                        <span className="text-right font-mono text-xs text-[#262930]">
                          {fitMode === "boxy" ? row.lengthBoxy : row.lengthCore}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[11px] text-[#5e6470]">
                Cold wash inside out • Line dry flat • Zero tumble shrink
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
