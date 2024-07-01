import type { Metadata } from "next";
import React from 'react';
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Weaviate Vector Search",
  description: "Vector Search with Weaviate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className=" overflow-x-hidden" lang="en">
      <body className={`${inter.className} ${noto_serif.variable}`}>
        {children}
      </body>
    </html>
  );
}
