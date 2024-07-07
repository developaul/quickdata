import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import {
  AIPickerProvider,
  BrowserAIProvider,
  CheckBrowserProvider,
  PromptProvider,
  ThemeProvider,
  CloudAIProvider,
} from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/containers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quickdata",
  description: "Generate any kind of json structure from types",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CheckBrowserProvider>
            <CloudAIProvider>
              <BrowserAIProvider>
                <AIPickerProvider>
                  <PromptProvider>
                    <Header />

                    {children}

                    {/* TODO: Add Footer */}
                    <Toaster />
                  </PromptProvider>
                </AIPickerProvider>
              </BrowserAIProvider>
            </CloudAIProvider>
          </CheckBrowserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
