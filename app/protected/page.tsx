"use client";

import { useSession } from "next-auth/react";
import { useUser } from "../hooks/use-user";

export default function Home() {
  const user = useUser();
  return <>Protected</>;
}
