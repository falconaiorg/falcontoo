"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { useState } from "react";
import { transformer, getUrl } from "./shared";
import { draco } from ".";

export type CookieTokens = {
  sessionToken: string | undefined;
  csrfToken: string | undefined;
};
export default function ExpressTRPCProvider({
  children,
  headers,
  tokens,
}: {
  children: React.ReactNode;
  headers: Headers;
  tokens: CookieTokens;
}) {
  const url = process.env.RENDER
    ? process.env.RENDER_EXTERNAL_URL + "/trpc/"
    : "http://localhost:8000/trpc/";
  //console.log(`URL: ${url}`);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    draco.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url,
          headers() {
            const heads = new Map(headers);
            heads.set("authorization", `Bearer ${tokens.sessionToken}`);
            heads.set("x-csrf-token", tokens.csrfToken!); // TODO: Fix this: !
            return Object.fromEntries(heads);
          },
          transformer,
        }),
      ],
    }),
  );
  return (
    <draco.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </draco.Provider>
  );
}
