import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/studio/app-shell";
import { Providers } from "@/components/providers";
import {
  analyticsSans,
  analyticsSerif,
  searchDisplay,
  searchSans,
  storylineSans,
  storylineSerif,
  storylineSerifBold,
} from "@/lib/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storyline Studio",
  description:
    "Private editorial workspace for Storyline Design YouTube assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${analyticsSans.variable} ${analyticsSerif.variable} ${searchDisplay.variable} ${searchSans.variable} ${storylineSerif.variable} ${storylineSerifBold.variable} ${storylineSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
