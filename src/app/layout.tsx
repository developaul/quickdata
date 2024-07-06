import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  CheckBrowserProvider,
  DataMockerProvider,
  PromptProvider,
  ThemeProvider,
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
            <DataMockerProvider>
              <PromptProvider>
                <Header />

                {children}

                {/* TODO: Add Footer */}
                <Toaster />
              </PromptProvider>
            </DataMockerProvider>
          </CheckBrowserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
