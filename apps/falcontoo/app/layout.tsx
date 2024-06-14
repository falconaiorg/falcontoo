import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import { ViewTransitions } from "next-view-transitions";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { BottomNav } from "@/components/bottom-nav";
import { headers, cookies } from "next/headers";
export const maxDuration = 300; // sets max duration for all actions in the app

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FalconTwo",
  description: "Study with Falcon",
  manifest: "/manifest.json",
};

export type CookieTokens = {
  sessionToken: string | undefined;
  csrfToken: string | undefined;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextCookies = cookies();
  const sessionToken = nextCookies.get("next-auth.session-token")?.value;
  console.log(`Session token: ${sessionToken}`);

  const csrfToken = nextCookies
    .get("next-auth.csrf-token")
    ?.value?.split("|")[0];

  console.log(`CSRF token: ${csrfToken}`);

  return (
    <ViewTransitions>
      <html lang="en">
        <body className={montserrat.className}>
          <div className="flex h-svh flex-col items-center md:p-2">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <Providers
                headers={headers()}
                tokens={{ sessionToken, csrfToken }}
              >
                <div className="scrollbar-sm h-full w-full max-w-screen-sm overflow-y-auto scrollbar-track-transparent">
                  {children}
                </div>
              </Providers>
              <Toaster richColors />
            </ThemeProvider>
          </div>
        </body>
        <Toaster richColors />
      </html>
    </ViewTransitions>
  );
}
