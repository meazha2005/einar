"use client";

import React from "react";
import Image from "next/image";

const TICKER_ITEMS = [
  "EINAR™",
  "THE ONE WARRIOR",
  "320 GSM HEAVYWEIGHT JERSEY",
  "OBSIDIAN • CHARCOAL • ASH • CHALK",
  "ENGINEERED DROP SHOULDER",
  "ZERO COMPROMISE ARCHITECTURE",
];

export function BrandTicker() {
  return (
    <div
      aria-label="Brand attributes ticker"
      className="marquee-wrapper overflow-hidden border-b border-[#252830] bg-[#0d0e11] py-3.5 text-[#eceef1]"
    >
      <div className="marquee-track">
        {[0, 1].map((dupIdx) => (
          <div
            key={dupIdx}
            aria-hidden={dupIdx === 1}
            className="flex shrink-0 items-center"
          >
            {TICKER_ITEMS.map((item, idx) => (
              <div
                key={`${dupIdx}-${idx}`}
                className="flex items-center gap-6 px-6 sm:gap-8 sm:px-8"
              >
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] whitespace-nowrap text-[#e5e7eb] uppercase sm:text-xs">
                  {item}
                </span>
                <Image
                  src="/brand/einar-emblem-light.png"
                  alt=""
                  width={22}
                  height={16}
                  className="h-3.5 w-auto shrink-0 opacity-75"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
