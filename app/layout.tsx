import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const departureMono = localFont({
  src: "../public/fonts/DepartureMono-1.500/DepartureMono-Regular.woff2",
  variable: "--font-departure",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyen Quoc Nam | Portfolio",
  description:
    "Interactive developer portfolio for Nguyen Quoc Nam, built with Next.js, React, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${departureMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          data-goatcounter="https://quocnam612.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
