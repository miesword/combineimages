import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Combine Images Online – Free Photo Merger | No Ads, Easy to Use",
  description: "Merge multiple photos into one image online. 100% free, no ads, no watermark. Use our simple and fast image combiner tool today.",
  icons: {
    icon: '/icons/logo.svg',
    shortcut: '/icons/logo.svg',
    apple: '/icons/logo.svg',
  },
  openGraph: {
    title: "Combine Images Online – Free Photo Merger | No Ads, Easy to Use",
    description: "Merge multiple photos into one image online. 100% free, no ads, no watermark. Use our simple and fast image combiner tool today.",
    type: "website",
    url: "https://combine-images.com",
    images: [
      {
        url: "https://combine-images.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Combine Images Tool Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Combine Images Online – Free Photo Merger | No Ads, Easy to Use",
    description: "Merge multiple photos into one image online. 100% free, no ads, no watermark. Use our simple and fast image combiner tool today.",
    images: ["https://combine-images.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
