"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { url } from "@/urls";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const handleSignIn = async (provider: string, callbackUrl: string) => {
    try {
      let signInCallback = callbackUrl;
      await signIn(provider, {
        callbackUrl: signInCallback,
      });
    } catch (error) {
      console.error("SignIn Error", error);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") router.push(url.home);
  }, [sessionStatus, router]);

  return (
    <div
      className={cn(
        "custom-scrollbar flex h-screen min-h-screen w-screen flex-col items-center overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-950 to-purple-950",
      )}
    >
      <div className="flex w-full max-w-4xl flex-row items-end justify-center gap-3 px-6 py-4">
        <h1 className="font-serif text-5xl font-bold">Lex</h1>
        <h2 className={cn("text-xs font-semibold text-muted-foreground")}>
          by FalconAI
        </h2>
      </div>
      <div className="mt-16 flex flex-col items-center space-y-3">
        <div className="flex flex-col items-center space-y-8 rounded-md md:min-w-[500px]">
          <Image
            src={"/lex.png"}
            height={400}
            width={400}
            alt="Falcon Logo"
            className="rounded-2xl"
          />

          <Button
            size="lg"
            variant={"outline"}
            onClick={() => handleSignIn("google", "/home")}
            disabled={sessionStatus === "loading"}
            className="rounded-2xl border-accent py-6 text-slate-200"
          >
            <div className="flex items-center space-x-3">
              <FcGoogle className="h-6 w-6" />
              <div>
                {sessionStatus === "loading" ? "Loading..." : "Sign In"}
              </div>
            </div>
          </Button>
          <div className="text-sm">Sign in to use your learning assistant</div>
        </div>
      </div>
    </div>
  );
}
