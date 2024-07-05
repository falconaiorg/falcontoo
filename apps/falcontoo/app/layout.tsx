import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import { ViewTransitions } from "next-view-transitions";
import { readerFontsObject } from "./(reader)/read/[articleId]/theme/reader-fonts";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { headers, cookies } from "next/headers";
import { cn } from "@/lib/utils";
export const maxDuration = 300; // sets max duration for all actions in the app

const {
  FuturaBook,
  OpenDyslexic,
  Helvetica,
  Palatino,
  Georgia,
  NotoSerif,
  RobotoSlab,
  OpenSans,
  Roboto,
} = readerFontsObject;
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Lex Reader",
  description: "Read, Learn, Repeat.",
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
  //console.log(`Session token: ${sessionToken}`);

  const csrfToken = nextCookies
    .get("next-auth.csrf-token")
    ?.value?.split("|")[0];

  //console.log(`CSRF token: ${csrfToken}`);

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cn(
          montserrat.variable,
          FuturaBook.variable,
          OpenDyslexic.variable,
          Helvetica.variable,
          Palatino.variable,
          Georgia.variable,
          NotoSerif.variable,
          RobotoSlab.variable,
          OpenSans.variable,
          Roboto.variable,
        )}
      >
        <body className="font-montserrat">
          <div className="flex h-svh flex-col items-center md:p-2">
            <Providers headers={headers()} tokens={{ sessionToken, csrfToken }}>
              <div className="scrollbar-sm h-full w-full overflow-y-auto scrollbar-hide scrollbar-track-transparent">
                {children}
              </div>
            </Providers>
            <Toaster richColors />
          </div>
        </body>
        <Toaster richColors />
      </html>
    </ViewTransitions>
  );
}
