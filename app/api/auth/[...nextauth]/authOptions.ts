import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "@/prisma";
import { Adapter } from "next-auth/adapters";
import { AuthOptions } from "next-auth";

const GoogleProvider = () => {
  return Google({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    authorization: {
      params: {
        prompt: "select_account",
        access_type: "offline",
        response_type: "code",
      },
    },
  });
};

// JWT callback to store the user properties

// The main handler
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [GoogleProvider()],
  callbacks: {
    signIn: async ({ account, user, credentials, email, profile }) => {
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
