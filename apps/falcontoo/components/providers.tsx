"use client";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TRPCProvider from "@falcon/trpc/next/client/provider";

const queryClient = new QueryClient();

export default function Providers({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: Headers;
}) {
  return (
    <SessionProvider>
      <TRPCProvider headers={headers}>
        <Provider>
          <NextIntlClientProvider locale="en">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </NextIntlClientProvider>
        </Provider>
      </TRPCProvider>
    </SessionProvider>
  );
}
