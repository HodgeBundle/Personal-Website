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

const bitterName = localFont({
  src: "./fonts/bitter-name.woff2",
  variable: "--font-bitter-name",
  weight: "700",
  display: "swap",
});

const maShanZhengName = localFont({
  src: "./fonts/ma-shan-zheng-name.woff2",
  variable: "--font-ma-shan-zheng-name",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hodgebundle.github.io/Personal-Website/"),
  title: {
    default: "Zheng Zhu | Mathematics | University of Calgary",
    template: "%s | Zheng Zhu",
  },
  description:
    "Zheng Zhu is a PIMS Postdoctoral Fellow at the University of Calgary working in arithmetic dynamics, Arakelov geometry, and Diophantine geometry.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: "https://hodgebundle.github.io/Personal-Website/",
    title: "Zheng Zhu | Mathematics | University of Calgary",
    description:
      "Zheng Zhu is a PIMS Postdoctoral Fellow at the University of Calgary working in arithmetic dynamics, Arakelov geometry, and Diophantine geometry.",
    siteName: "Zheng Zhu | Mathematics",
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
        className={`${manrope.variable} ${playfair.variable} ${bitterName.variable} ${maShanZhengName.variable} antialiased`}
        style={{
          "--hero-image": `url("${publicAsset("/images/hero-warm-ivory-safari.jpg")}")`,
        } as CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
