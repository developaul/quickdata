import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { DataMockerProvider, PromptProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/containers";
import { ThemeProvider } from "@/providers/Theme/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Generate JSON App",
  description: "Generate any kind of json structure",
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
          <DataMockerProvider>
            <PromptProvider>
              <Header />

              {children}

              {/* TODO: Add Footer */}
              <Toaster />
            </PromptProvider>
          </DataMockerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
