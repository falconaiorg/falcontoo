import { signIn } from "next-auth/react";
import { SignOut } from "./signout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { SignIn } from "./sign-in";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      {session ? session.user?.email : ""}
      <SignIn />
      <SignOut />
    </>
  );
}
