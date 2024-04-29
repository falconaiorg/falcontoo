import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

import "./globals.css";
import { ThemeProvider } from "next-themes";

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
        <div className="flex h-svh flex-col items-center md:bg-slate-900 md:p-2">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="scrollbar-sm w-full max-w-screen-sm overflow-y-auto bg-background ring-offset-rose-200 md:rounded  md:ring-2 md:ring-rose-300 md:ring-offset-2">
              <Providers>{children}</Providers>
            </div>
            <Toaster richColors />
          </ThemeProvider>
        </div>
      </body>
      <Toaster richColors />
    </html>
  );
}
