"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { formatInr, type TeeProduct, type TeeSize } from "@/data/einarData";
import { useMotionSettings } from "./MotionProvider";

interface QuickViewModalProps {
  product: TeeProduct | null;
  onClose: () => void;
  onAddToCart: (product: TeeProduct, size: TeeSize) => void;
}

export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const { motionMode, setScrollLocked } = useMotionSettings();

  useEffect(() => {
    setScrollLocked(Boolean(product));
  }, [product, setScrollLocked]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionMode === "off" ? 0 : 0.22 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0b0c0e]/55 backdrop-blur-xs"
          />

          <motion.div
            initial={
              motionMode === "off"
                ? false
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              motionMode === "off"
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{
              duration: motionMode === "off" ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-[#dfe2e7] bg-white shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d9e0] bg-white/95 text-[#0b0c0e] transition-colors hover:bg-[#eceef1]"
            >
              <X className="h-4 w-4" />
            </button>

            <QuickViewBody
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function QuickViewBody({
  product,
  onAddToCart,
}: {
  product: TeeProduct;
  onAddToCart: (product: TeeProduct, size: TeeSize) => void;
}) {
  const [size, setSize] = useState<TeeSize>("L");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12">
      <div className="relative aspect-[3/4] bg-[#f1f2f5] sm:col-span-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-5 sm:col-span-6 sm:p-7">
        <div>
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#5e6470] uppercase">
            {`${product.code} // ${product.gsm} // ${product.fit}`}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0c0e]">
            {product.name}
          </h3>
          <p className="mt-1 font-display text-xl font-bold text-[#262930]">
            {formatInr(product.priceInr)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#454a54]">
            {product.description}
          </p>

          <ul className="mt-4 space-y-1.5 border-t border-[#eceef1] pt-4">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-xs text-[#262930]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b0c0e]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-mono font-semibold text-[#5e6470] uppercase">
              Select Size
            </span>
            <span className="font-mono text-[#0b0c0e]">
              Colour: {product.colourName}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-h-[42px] rounded-xl font-mono text-xs font-semibold transition-colors ${
                  size === s
                    ? "bg-[#0d0e11] text-white"
                    : "bg-[#f2f3f5] text-[#262930] hover:bg-[#e5e7eb]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0d0e11] text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#262930]"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add {size} to Bag — {formatInr(product.priceInr)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
