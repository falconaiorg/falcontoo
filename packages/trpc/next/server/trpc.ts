import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import type { TrpcContext } from "./trpc-context";
import { User } from "@falcon/prisma/client";

export const t = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
});

// Middleware

export const authenticatedMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login to perform action",
    });

  return await next({
    ctx: {
      ...ctx,
      user: ctx.user,
      session: ctx.session,
    },
  });
});

const isProUser = async function (user: User) {
  return user.plan === "PRO" ? true : false;
};

export const proMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login to perform this action",
    });

  const isPro = await isProUser(ctx.user);

  if (!isPro) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be pro user to perform this action",
    });
  }

  return await next({
    ctx: {
      ...ctx,
      user: ctx.user,
      session: ctx.session,
    },
  });
});

export const router = t.router;

export const procedure = t.procedure;

export const createCallerFactory = t.createCallerFactory;

export const authenticatedProcedure = t.procedure.use(authenticatedMiddleware);

export const proProcedure = t.procedure.use(proMiddleware);
