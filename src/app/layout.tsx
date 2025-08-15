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
  title: "Combine Images Online – Free Photo Merger | Merge JPG PNG Files",
  description: "Merge multiple photos into one image online. Combine JPG, PNG files for free. No ads, no watermark. Join images horizontally, vertically or in grid layout.",
  keywords: "combine images online, merge photos, join pictures, combine jpg, merge png, photo combiner, image merger, free online tool",
  icons: {
    icon: '/icons/logo.svg',
    shortcut: '/icons/logo.svg',
    apple: '/icons/logo.svg',
  },
  openGraph: {
    title: "Combine Images Online – Free Photo Merger | Merge JPG PNG Files",
    description: "Merge multiple photos into one image online. Combine JPG, PNG files for free. No ads, no watermark. Join images horizontally, vertically or in grid layout.",
    type: "website",
    url: "https://combine-images.com",
    images: [
      {
        url: "https://combine-images.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Combine Images Tool - Free Online Photo Merger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Combine Images Online – Free Photo Merger | Merge JPG PNG Files",
    description: "Merge multiple photos into one image online. Combine JPG, PNG files for free. No ads, no watermark.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Combine Images Online",
              "description": "Free online tool to combine and merge multiple images into one. Support JPG, PNG, GIF formats.",
              "url": "https://combine-images.com",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Combine multiple images",
                "Merge JPG and PNG files",
                "Horizontal and vertical layouts",
                "Grid arrangement",
                "No watermark",
                "Free to use"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can I combine two images into one for free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can use our free online tool to combine JPG, PNG, and other formats without installing software. Simply upload your images, choose a layout, and download the result."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I merge photos side by side?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, select 'Horizontal' layout in the tool to merge photos side by side. You can also choose vertical or grid layouts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How to join PNG images without losing quality?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our tool preserves original image quality when combining PNG files. The output maintains transparency and high resolution."
                  }
                }
              ]
            })
          }}
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
