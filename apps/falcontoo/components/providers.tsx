"use client";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import TRPCProvider from "@falcon/trpc/next/client/provider";
import { CookieTokens } from "@/app/layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({
  children,
  headers,
  tokens,
}: {
  children: React.ReactNode;
  headers: Headers;
  tokens: CookieTokens;
}) {
  return (
    <SessionProvider>
      <TRPCProvider headers={headers}>
        <Provider>
          <NextIntlClientProvider locale="en">
            {children}
            <ReactQueryDevtools />
          </NextIntlClientProvider>
        </Provider>
      </TRPCProvider>
    </SessionProvider>
  );
}
