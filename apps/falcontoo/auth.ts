import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { cache } from "react";
import prisma from "./prisma";

/**
 * Get session in the format compatible with authjs v5.
 */
export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

/**
 * Optional session. Use this if you want to allow unauthenticated users.
 */
export const getOptionalServerComponentSession = cache(async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    return { user: null, session: null };
  }

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });

  return { user, session };
});

/**
 * Authenticated session. Use this if you want to require authentication.
 */
export const getServerComponentSession = cache(async () => {
  const { user, session } = await getOptionalServerComponentSession();

  if (!user || !session) {
    throw new Error("No session found");
  }

  return { user, session };
});
