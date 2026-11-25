"use client";

import React, { useCallback, useState } from "react";
import type { TeeProduct, TeeSize } from "@/data/einarData";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BrandTicker } from "@/components/BrandTicker";
import { CollectionSection } from "@/components/CollectionSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { CraftSection } from "@/components/CraftSection";
import { LookbookSection } from "@/components/LookbookSection";
import { FooterSection } from "@/components/FooterSection";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CartDrawer, type CartItem } from "@/components/CartDrawer";

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<TeeProduct | null>(
    null
  );

  const handleAddToCart = useCallback((product: TeeProduct, size: TeeSize) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  }, []);

  const handleUpdateQty = useCallback(
    (productId: string, size: TeeSize, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const handleRemoveItem = useCallback((productId: string, size: TeeSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-dvh bg-[#f6f7f9] text-[#0b0c0e]">
      <Navbar cartCount={totalCount} onOpenCart={() => setCartOpen(true)} />

      <main>
        <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:h-[calc(100dvh-4rem)] lg:max-h-[940px]">
          <HeroSection />
          <BrandTicker />
        </div>
        <CollectionSection
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
        />
        <PhilosophySection />
        <CraftSection />
        <LookbookSection />
      </main>

      <FooterSection />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
