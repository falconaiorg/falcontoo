"use client";
import { signOut, useSession } from "next-auth/react";
import { Button, ButtonProps } from "@/components/ui/button";
export function SignOut({ ...props }: ButtonProps) {
  const handleSignOut = () => {
    let redirectUrl = "/"; // Default redirect URL
    signOut({ redirect: false }).then(() => {
      // Perform the redirection after successful sign-out
      window.location.href = redirectUrl;
    });
  };
  return (
    <Button onClick={handleSignOut} {...props}>
      Logout
    </Button>
  );
}
