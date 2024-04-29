import { auth } from "@/auth";
import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/sign-out";

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
