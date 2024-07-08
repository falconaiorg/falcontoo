"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/acc/moving-border-btn";
import { TextGenerateEffect } from "@/components/ui/acc/text-generate-effect";
import { url } from "@/urls";
import { motion } from "framer-motion";

const words = "Read.  Learn.  Repeat.";

export default function LexHome() {
  const handleSignIn = async (provider: string, callbackUrl: string) => {
    console.log("Sign In");
    try {
      let signInCallback = callbackUrl;
      await signIn(provider, {
        callbackUrl: signInCallback,
      });
    } catch (error) {
      console.error("SignIn Error", error);
    }
  };

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") router.push(url.home);
  }, [sessionStatus, router]);

  return (
    <span className="relative flex h-full w-screen flex-col items-center justify-center space-y-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-2">
      <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text font-serif text-6xl font-semibold text-transparent">
        Lex
      </span>
      <TextGenerateEffect words={words} className="text-center" />
      <motion.div
        className="fixed bottom-16"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button onClick={() => handleSignIn("google", "/home")}>
          {sessionStatus === "loading" ? "Staring..." : "Start"}
        </Button>
      </motion.div>
    </span>
  );
}
