"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export type GetServerSessionWithUser = {
  req: NextRequest;
  res: NextResponse;
};

export const getServerSessionWithUser = async function () {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) return { session: null, user: null };

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });

  return { session, user };
};

export const createTrpcContext = async function ({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  const { user, session } = await getServerSessionWithUser();

  if (!session) {
    return {
      session: null,
      user: null,
      req,
    };
  }

  if (!user) {
    return {
      session: null,
      user: null,
      req,
    };
  }

  return {
    session,
    user,
    req,
  };
};

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;
