import { auth } from "@falcon/lib/next-auth";
import { SignOut } from "@/components/auth/sign-out";
import SignIn from "../sign-in";

export default async function Home() {
  const session = await auth();
  return <SignIn />;
}
