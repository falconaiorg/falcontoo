import { signIn } from "next-auth/react";
import { SignOut } from "../components/auth/sign-out";
import { SignIn } from "../components/auth/sign-in";
import { auth } from "@falcon/lib/next-auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      {session ? session.user?.email : ""}
      <SignIn />
      <SignOut />
    </>
  );
}
