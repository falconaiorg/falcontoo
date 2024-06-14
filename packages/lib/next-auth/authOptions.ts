import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "@falcon/prisma";
import { Adapter } from "next-auth/adapters";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User, Account, Profile } from "next-auth";
import { User as PrismaUser } from "@falcon/prisma/client";
import { assignTrialUserProperties } from "./trial";

const googleProfileHandler = async (profile: any, tokens: any) => {
  const existingUser: PrismaUser | null = await prisma.user.findUnique({
    where: { email: profile.email },
  });

  if (existingUser) {
    const { sub, ...profileWithoutSub } = profile;

    return {
      id: profile.sub,
      ...profileWithoutSub,
    };
  } else {
    // Set trial user properties for new users
    const trialUserProperties = await assignTrialUserProperties();

    return {
      id: profile.sub, // Google returns the id as 'sub'
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      ...trialUserProperties,
    };
  }
};

const GoogleProvider = () => {
  return Google({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    profile: googleProfileHandler,
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
const jwtCallback = async ({
  token,
  user,
  account,
  isNewUser,
  profile,
  trigger,
  session,
}: {
  token: JWT;
  user: User | null;
  account: Account | null;
  profile?: Profile;
  trigger?: "update" | "signIn" | "signUp";
  isNewUser?: boolean;
  session?: any;
}): Promise<any> => {
  if (user) {
    token.id = user.id;
    token.plan = user.plan;
    token.planStart = user.planStart;
    token.planEnd = user.planEnd;
  }

  if (user && isNewUser) {
    try {
    } catch (e) {
      return false;
    }
  }

  return token;
};
// Session callback to set session data
const sessionCallback = async ({
  session,
  token,
}: {
  session: any;
  token: any;
}) => {
  if (token) {
    session.user.id = token.sub;
    session.user.plan = token.plan;
    session.user.planStart = token.planStart;
    session.user.planEnd = token.planEnd;
  }

  return session;
};

// The main handler
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [GoogleProvider()],
  callbacks: {
    signIn: async ({ account, user, credentials, email, profile }) => {
      return true;
    },
    jwt: jwtCallback,
    session: sessionCallback,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
  },
};
