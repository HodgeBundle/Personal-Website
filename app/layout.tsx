import type { Metadata } from "next";
import localFont from "next/font/local";
import type { CSSProperties } from "react";
import { publicAsset } from "./site-paths";
import "./globals.css";

const manrope = localFont({
  src: "../.vinext/fonts/manrope-76eca2803f7f/manrope-81401990.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const playfair = localFont({
  src: "../.vinext/fonts/playfair-display-4ca25ebd8797/playfair-display-9deeae77.woff2",
  variable: "--font-playfair",
  weight: "500 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zheng Zhu | Mathematics",
    template: "%s | Zheng Zhu",
  },
  description:
    "Zheng Zhu is a PIMS Postdoctoral Fellow at the University of Calgary working in arithmetic dynamics, Arakelov geometry, and Diophantine geometry.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: publicAsset("/favicon.svg"),
    shortcut: publicAsset("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${playfair.variable} antialiased`}
        style={{
          "--hero-image": `url("${publicAsset("/images/hero-orbit.jpg")}")`,
        } as CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
