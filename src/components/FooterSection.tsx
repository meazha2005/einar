"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUp, Check, Send } from "lucide-react";
import { RevealBlock } from "./RevealBlock";
import { useMotionSettings } from "./MotionProvider";

export function FooterSection() {
  const { scrollToSection, motionMode, cycleMotionMode } = useMotionSettings();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "joined">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setStatus("error");
      return;
    }
    setStatus("joined");
    setEmail("");
  };

  return (
    <footer className="bg-[#f6f7f9]">
      {/* Pre-Footer Light Gray Early Access Dispatch */}
      <section className="border-b border-[#dfe2e7] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <RevealBlock>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#5e6470] uppercase">
              05 // Warrior Dispatch
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b0c0e] sm:text-4xl">
              PRIORITY ACCESS FOR DROP 02
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#454a54] sm:text-base">
              Small-batch Indian releases sell out without restock timers. Enter
              your email for private early access 24 hours ahead of launch.
            </p>

            {status === "joined" ? (
              <div className="mx-auto mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#0b0c0e] bg-white px-5 py-3 text-sm font-medium text-[#0b0c0e]">
                <Check className="h-4 w-4" />
                <span>You are on the EINAR Drop 02 dispatch list.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row"
              >
                <label htmlFor="einar-dispatch-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="einar-dispatch-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="warrior@einar.in"
                  className="min-h-[48px] flex-1 rounded-full border border-[#cfd3db] bg-white px-5 text-sm text-[#0b0c0e] placeholder:text-[#888f9c] focus:border-[#0b0c0e] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#0d0e11] px-6 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#262930]"
                >
                  <span>Join List</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-2.5 font-mono text-xs text-[#262930]">
                Please enter a valid email address.
              </p>
            )}
          </RevealBlock>
        </div>
      </section>

      {/* Dark Contrast Architectural Footer showcasing Official Lockup */}
      <div className="bg-[#0a0b0d] bg-studio-grid-dark text-[#eceef1]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
            <div className="flex flex-col items-center text-center md:col-span-5 md:items-start md:text-left">
              <Image
                src="/brand/einar-lockup-light.png"
                alt="EINAR — The One Warrior"
                width={260}
                height={147}
                className="h-24 w-auto object-contain sm:h-28"
              />
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#9ea3ab]">
                Minimalist monochrome streetwear built around heavy 320 GSM
                fabric structure and enduring Spartan poise.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 md:col-span-7">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#888f9c] uppercase">
                  Sections
                </p>
                <ul className="mt-3 space-y-2.5 text-xs text-[#d1d5db]">
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("collection")}
                      className="hover:text-white"
                    >
                      Drop 01 Tees
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("ethos")}
                      className="hover:text-white"
                    >
                      Warrior Ethos
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("craft")}
                      className="hover:text-white"
                    >
                      320 GSM Craft
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("lookbook")}
                      className="hover:text-white"
                    >
                      Fit & Lookbook
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#888f9c] uppercase">
                  Colour Palette
                </p>
                <ul className="mt-3 space-y-2.5 text-xs text-[#d1d5db]">
                  <li>Obsidian Black</li>
                  <li>Washed Charcoal</li>
                  <li>Heather Ash Grey</li>
                  <li>Chalk White</li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#888f9c] uppercase">
                  Controls
                </p>
                <div className="mt-3 flex flex-col items-start gap-2.5">
                  <button
                    type="button"
                    onClick={cycleMotionMode}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] text-[#e5e7eb] transition-colors hover:bg-white/10"
                  >
                    Motion: {motionMode.toUpperCase()}
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection("top")}
                    className="inline-flex items-center gap-1.5 text-xs text-[#9ea3ab] transition-colors hover:text-white"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                    <span>Back to Top</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center font-mono text-[11px] text-[#888f9c] sm:flex-row sm:text-left">
            <p>© 2026 EINAR™ APPAREL INDIA. ALL RIGHTS RESERVED.</p>
            <p>THE ONE WARRIOR • PAN-INDIA STUDIO ARCHIVE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
