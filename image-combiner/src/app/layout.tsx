import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "图片拼接工具 - 免费在线合并多张图片",
  description: "免费的在线图片拼接工具，支持多张图片合并、拖拽排序、实时预览。简单易用，无需注册，所有处理都在本地完成，保护您的隐私。",
  keywords: "图片拼接,图片合并,在线拼图,照片合成,图片编辑",
  authors: [{ name: "图片拼接工具" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "图片拼接工具 - 免费在线合并多张图片",
    description: "免费的在线图片拼接工具，支持多张图片合并、拖拽排序、实时预览",
    type: "website",
    locale: "zh_CN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
