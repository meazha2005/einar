"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Plus } from "lucide-react";
import {
  TEE_PRODUCTS,
  formatInr,
  type TeeCategory,
  type TeeProduct,
  type TeeSize,
} from "@/data/einarData";
import { RevealBlock } from "./RevealBlock";
import { useMotionSettings } from "./MotionProvider";

interface CollectionSectionProps {
  onAddToCart: (product: TeeProduct, size: TeeSize) => void;
  onQuickView: (product: TeeProduct) => void;
}

const CATEGORIES: { id: TeeCategory; label: string }[] = [
  { id: "all", label: "All Drop 01 (4)" },
  { id: "boxy", label: "Boxy Oversized" },
  { id: "tailored", label: "Tailored Core" },
  { id: "graphic", label: "Graphic Back" },
];

export function CollectionSection({
  onAddToCart,
  onQuickView,
}: CollectionSectionProps) {
  const { motionMode } = useMotionSettings();
  const [selectedCategory, setSelectedCategory] = useState<TeeCategory>("all");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, TeeSize>>({
    "en-01-obsidian": "L",
    "en-02-chalk": "L",
    "en-03-carbon": "M",
    "en-04-ash": "M",
  });
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return TEE_PRODUCTS;
    return TEE_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleSizeSelect = (productId: string, size: TeeSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: TeeProduct) => {
    const size = selectedSizes[product.id] ?? "L";
    onAddToCart(product, size);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1300);
  };

  return (
    <section
      id="collection"
      className="border-b border-[#dfe2e7] bg-[#f6f7f9] py-12 sm:py-18 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Section Header + Category Filter */}
        <RevealBlock className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#5e6470] uppercase">
              01 // Drop 01 Archive
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0c0e] sm:text-4xl lg:text-5xl">
              THE MONOLITH LINEUP
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#454a54] sm:text-base">
              Four foundational silhouettes milled in custom heavyweight Indian
              cotton and finished in our strict monochrome palette.
            </p>
          </div>

          {/* Horizontal scrollable pill filter on mobile */}
          <div className="no-scrollbar -mx-3 flex items-center gap-1.5 overflow-x-auto px-3 pb-1 sm:mx-0 sm:px-0 md:pb-0">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative min-h-[38px] shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors sm:min-h-[40px] sm:px-4 sm:py-2 ${
                    active
                      ? "text-white"
                      : "border border-[#d6d9e0] bg-white text-[#262930] hover:border-[#0b0c0e]"
                  }`}
                >
                  {active && motionMode !== "off" && (
                    <motion.span
                      layoutId="collection-tab-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-[#0d0e11]"
                    />
                  )}
                  {active && motionMode === "off" && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-[#0d0e11]" />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </RevealBlock>

        {/* Responsive Product Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <motion.div
          layout={motionMode !== "off"}
          className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const chosenSize = selectedSizes[product.id] ?? "L";
              const isAdded = justAddedId === product.id;

              return (
                <motion.article
                  key={product.id}
                  layout={motionMode !== "off"}
                  initial={
                    motionMode === "off" ? false : { opacity: 0, y: 18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    motionMode === "off"
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.96 }
                  }
                  transition={{
                    duration: motionMode === "off" ? 0 : 0.45,
                    delay: motionMode === "dynamic" ? index * 0.06 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#dfe2e7] bg-white shadow-[0_4px_20px_-14px_rgba(11,12,14,0.16)] transition-shadow duration-300 hover:shadow-[0_18px_36px_-20px_rgba(11,12,14,0.24)] sm:rounded-2xl"
                >
                  {/* Studio Product Image Frame */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f1f2f5]">
                    <Image
                      src={product.image}
                      alt={`${product.name} in ${product.colourName}`}
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2 right-2 left-2 flex items-center justify-between gap-1.5 sm:top-3 sm:right-3 sm:left-3">
                      <span className="rounded-full bg-white/92 px-2 py-0.5 font-mono text-[9px] font-medium tracking-wider text-[#0b0c0e] backdrop-blur-xs sm:px-2.5 sm:py-1 sm:text-[10px]">
                        <span className="sm:hidden">{product.code}</span>
                        <span className="hidden sm:inline">
                          {`${product.code} // ${product.gsm}`}
                        </span>
                      </span>
                      <span className="hidden rounded-full bg-[#0d0e11]/88 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white uppercase sm:inline-flex">
                        {product.badge}
                      </span>
                    </div>

                    {/* Quick View Trigger */}
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      aria-label={`Quick view ${product.name}`}
                      className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#d6d9e0] bg-white/92 text-[#0b0c0e] shadow-xs backdrop-blur-xs transition-all hover:bg-[#0d0e11] hover:text-white sm:right-3 sm:bottom-3 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[11px] sm:font-medium lg:translate-y-1.5 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Inspect</span>
                    </button>
                  </div>

                  {/* Product Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4 lg:p-5">
                    <div>
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-[13px] font-bold tracking-tight text-[#0b0c0e] sm:whitespace-normal sm:text-base">
                            {product.name}
                          </h3>
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-[#5e6470] sm:text-xs">
                            {product.subtitle}
                          </p>
                        </div>
                        <span className="shrink-0 font-display text-xs font-bold text-[#0b0c0e] sm:text-base">
                          {formatInr(product.priceInr)}
                        </span>
                      </div>

                      {/* Swatch + Fit Metadata */}
                      <div className="mt-2 flex items-center justify-between gap-1 border-y border-[#eceef1] py-1.5 sm:mt-3 sm:py-2.5">
                        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                          <span
                            className="h-3 w-3 shrink-0 rounded-full border border-[#0b0c0e]/20 sm:h-3.5 sm:w-3.5"
                            style={{ backgroundColor: product.swatchHex }}
                          />
                          <span className="truncate text-[10px] font-medium text-[#262930] sm:text-xs">
                            {product.colourName}
                          </span>
                        </div>
                        <span className="hidden shrink-0 font-mono text-[10px] tracking-wider text-[#5e6470] uppercase sm:inline">
                          {product.fit}
                        </span>
                      </div>
                    </div>

                    {/* Size Picker + Add CTA */}
                    <div className="mt-2.5 sm:mt-3.5">
                      <div
                        className="grid grid-cols-5 gap-1 sm:gap-1.5"
                        role="group"
                        aria-label={`Select size for ${product.name}`}
                      >
                        {product.sizes.map((size) => {
                          const selected = chosenSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`min-h-[30px] rounded-md font-mono text-[10px] font-medium transition-colors sm:min-h-[36px] sm:rounded-lg sm:text-[11px] ${
                                selected
                                  ? "bg-[#0d0e11] text-white"
                                  : "bg-[#f2f3f5] text-[#262930] hover:bg-[#e5e7eb]"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`mt-2 flex min-h-[36px] w-full items-center justify-center gap-1.5 rounded-lg text-[10px] font-semibold tracking-[0.1em] uppercase transition-all active:scale-[0.99] sm:mt-3 sm:min-h-[44px] sm:gap-2 sm:rounded-xl sm:text-xs sm:tracking-[0.12em] ${
                          isAdded
                            ? "bg-[#262930] text-white"
                            : "bg-[#0d0e11] text-white hover:bg-[#262930]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>Added ({chosenSize})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="sm:hidden">Bag — {chosenSize}</span>
                            <span className="hidden sm:inline">
                              Add to Bag — {chosenSize}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
