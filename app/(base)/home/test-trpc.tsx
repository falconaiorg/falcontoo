"use client";

import { api } from "../../_trpc";

export function TRPCTest() {
  const { data, error } = api.sessions.getSessions.useQuery(
    { dog: "bobby" },
    {},
  );
  console.log(data);

  return <>{"data"}</>;
}
