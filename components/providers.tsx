"use client";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider>
        <NextIntlClientProvider locale="en">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NextIntlClientProvider>
      </Provider>
    </SessionProvider>
  );
}
