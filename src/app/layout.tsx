import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Combine Images - Merge Photos Online for Free",
  description: "Easily combine multiple images into one. Supports drag & drop, reordering, and various layout options. Free online image merging tool with no watermarks.",
  openGraph: {
    title: "Combine Images - Merge Photos Online",
    description: "Combine multiple images into a single photo with our free online image merger. Simple, fast, and no registration required.",
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
    title: "Combine Images - Merge Photos Online",
    description: "Free online tool to combine images into one. Supports multiple layouts and formats.",
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
      </body>
    </html>
  );
}
