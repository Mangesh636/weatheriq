import type { Metadata } from "next";

import { NotoSansFont, NotoSerifFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | WeatherIQ",
    default: "WeatherIQ — Accurate, Real-Time Weather Dashboard",
  },
  description:
    "WeatherIQ is a fast, modern weather dashboard providing real-time conditions, hourly forecasts, 7-day outlooks, air quality, and alerts — powered by reliable global data.",
    icons: {
      icon: "/logo.svg",
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${NotoSansFont.variable} ${NotoSerifFont.variable} antialiased text-base font-normal font-noto-sans`}
      >
        {children}
      </body>
    </html>
  );
}
