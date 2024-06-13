"use client";

import { api } from "@falcon/trpc/next/client";

export function TRPCTest() {
  const { data, error } = api.sessions.getSessions.useQuery(
    { dog: "bobby" },
    {},
  );
  console.log(data);

  return <>{"data"}</>;
}
