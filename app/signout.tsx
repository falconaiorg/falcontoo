"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
export function SignOut() {
  const session = useSession();
  console.log(session.data?.user?.email);
  return <Button onClick={() => signOut()}>Signout</Button>;
}
