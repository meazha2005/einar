import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const plusJakarta = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-plus-jakarta",
  weight: "200 800",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EINAR™ — The One Warrior | Heavyweight Monochrome Tees India",
  description:
    "Heavyweight 320 GSM monochrome t-shirts crafted in India across obsidian black, washed charcoal, heather ash grey, and chalk white. Sculpted discipline by EINAR.",
  icons: {
    icon: "/brand/einar-emblem-dark.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f7f9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#f6f7f9] text-[#0b0c0e] antialiased selection:bg-[#0d0e11] selection:text-white">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
