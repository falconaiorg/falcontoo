"use client";
import { signOut, useSession } from "next-auth/react";
import { Button, ButtonProps } from "@/components/ui/button";
export function SignOut({ ...props }: ButtonProps) {
  const session = useSession();

  return (
    <Button onClick={() => signOut()} {...props}>
      Logout
    </Button>
  );
}
