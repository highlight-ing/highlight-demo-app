import "@/app/globals.css";

import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Highlight Demo App",
  description: "Highlight Demo App",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      suppressHydrationWarning
      className={cn(
        "select-none overscroll-none scroll-smooth",
        GeistSans.variable,
        GeistMono.variable,
      )}
      lang="en"
    >
      <body>
        <main className="font-sans antialiased">{children}</main>
      </body>
    </html>
  );
}
