"use client";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TRPCProvider from "@falcon/trpc/next/client/provider";
import ExpressTRPCProvider from "@falcon/trpc/node/client/provider";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextCookies } from "@/app/(base)/notes/page";
import { CookieTokens } from "@/app/layout";

const queryClient = new QueryClient();

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
        <ExpressTRPCProvider headers={headers} tokens={tokens}>
          <Provider>
            <NextIntlClientProvider locale="en">
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </NextIntlClientProvider>
          </Provider>
        </ExpressTRPCProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}
