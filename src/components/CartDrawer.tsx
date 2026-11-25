"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatInr, type TeeProduct, type TeeSize } from "@/data/einarData";
import { useMotionSettings } from "./MotionProvider";

export interface CartItem {
  product: TeeProduct;
  size: TeeSize;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, size: TeeSize, delta: number) => void;
  onRemoveItem: (productId: string, size: TeeSize) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 3999;

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const { motionMode, setScrollLocked } = useMotionSettings();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleClose = () => {
    setCheckedOut(false);
    onClose();
  };

  useEffect(() => {
    setScrollLocked(open);
  }, [open, setScrollLocked]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCheckedOut(false);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.priceInr * item.quantity,
    0
  );
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckout = () => {
    setCheckedOut(true);
    onClearCart();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionMode === "off" ? 0 : 0.24 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0b0c0e]/50 backdrop-blur-xs"
          />

          <motion.aside
            initial={motionMode === "off" ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={motionMode === "off" ? { opacity: 0 } : { x: "100%" }}
            transition={
              motionMode === "off"
                ? { duration: 0 }
                : { type: "spring", damping: 32, stiffness: 330 }
            }
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#f6f7f9] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#dfe2e7] bg-white px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4 w-4 text-[#0b0c0e]" />
                <span className="font-display text-sm font-bold tracking-[0.14em] text-[#0b0c0e] uppercase">
                  Warrior Bag
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close shopping bag"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d9e0] bg-[#f6f7f9] text-[#0b0c0e] hover:bg-[#e5e7eb]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="border-b border-[#dfe2e7] bg-white px-5 py-3">
              <p className="font-mono text-[11px] text-[#454a54]">
                {remainingForFreeShip === 0
                  ? "Unlocked: Complimentary Pan-India Express Delivery"
                  : `Add ${formatInr(remainingForFreeShip)} more for complimentary Pan-India shipping`}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e6e8ec]">
                <div
                  className="h-full rounded-full bg-[#0d0e11] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {checkedOut ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#dfe2e7] bg-white p-6 text-center">
                  <CheckCircle2 className="h-11 w-11 text-[#0b0c0e]" />
                  <h3 className="mt-4 font-display text-xl font-bold text-[#0b0c0e]">
                    Reservation Confirmed
                  </h3>
                  <p className="mt-2 text-sm text-[#454a54]">
                    Your EINAR Drop 01 selection is queued in our front-page
                    showcase checkout preview.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 min-h-[44px] rounded-full bg-[#0d0e11] px-6 text-xs font-semibold tracking-[0.14em] text-white uppercase"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfd3db] bg-white/70 p-6 text-center">
                  <Image
                    src="/brand/einar-emblem-dark.png"
                    alt="EINAR Emblem"
                    width={64}
                    height={46}
                    className="h-10 w-auto opacity-35"
                  />
                  <p className="mt-4 font-display text-base font-semibold text-[#0b0c0e]">
                    Your bag is currently empty
                  </p>
                  <p className="mt-1 text-xs text-[#5e6470]">
                    Select a heavyweight tee size from Drop 01 to begin.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3.5 rounded-2xl border border-[#dfe2e7] bg-white p-3.5"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f1f2f5]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-display text-sm font-bold text-[#0b0c0e]">
                              {item.product.name}
                            </p>
                            <p className="font-mono text-[11px] text-[#5e6470]">
                              Size {item.size} • {item.product.gsm}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onRemoveItem(item.product.id, item.size)
                            }
                            aria-label={`Remove ${item.product.name} size ${item.size}`}
                            className="p-1 text-[#888f9c] hover:text-[#0b0c0e]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-[#dfe2e7] bg-[#f6f7f9]">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQty(item.product.id, item.size, -1)
                              }
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center text-[#262930] hover:text-[#0b0c0e]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs font-semibold text-[#0b0c0e]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQty(item.product.id, item.size, 1)
                              }
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center text-[#262930] hover:text-[#0b0c0e]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold text-[#0b0c0e]">
                            {formatInr(item.product.priceInr * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Totals */}
            {items.length > 0 && !checkedOut && (
              <div className="border-t border-[#dfe2e7] bg-white p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5e6470]">Subtotal (incl. GST)</span>
                  <span className="font-display text-lg font-bold text-[#0b0c0e]">
                    {formatInr(subtotal)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#0d0e11] text-xs font-semibold tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#262930]"
                >
                  Confirm Drop Reservation — {formatInr(subtotal)}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
