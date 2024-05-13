import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { BottomNav } from "@/components/bottom-nav";
import { headers } from "next/headers";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FalconTwo",
  description: "Study with Falcon",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="flex h-svh flex-col items-center md:p-2">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Providers headers={headers()}>
              <div className="scrollbar-sm h-full w-full max-w-screen-sm overflow-y-auto ">
                {children}
              </div>
            </Providers>
            <Toaster richColors />
          </ThemeProvider>
        </div>
      </body>
      <Toaster richColors />
    </html>
  );
}
