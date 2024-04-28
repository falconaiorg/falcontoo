"use client";

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export function useUser() {
  const session = useSession();
  const status = session.status;

  if (status === "loading") {
    return null;
  }

  if (!session) {
    notFound();
  }
  const user = session.data?.user;
  if (!user) {
    notFound();
  }
  return user;
}
