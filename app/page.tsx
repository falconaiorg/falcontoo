import { auth, signIn, signOut } from "@/auth";
import { SignOut } from "./signout";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      {session ? session.user?.email : ""}
      <SignIn />
      <SignOut />
    </>
  );
}
