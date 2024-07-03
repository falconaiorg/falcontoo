import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import SuperJSON from "superjson";
import { parseUrl } from "@falcon/lib/parser/url";
import { parseArticle } from "@falcon/lib/parser";
import { saveArticle } from "@falcon/lib/server/next/article/save-article";
import { getToken } from "next-auth/jwt";
import prisma from "@falcon/prisma";

const base64Secret = process.env.NEXTAUTH_SECRET;

export const ZAddOrUpdateArticle = z.object({
  url: z.string().url().optional(),
});

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const userJWT = await getToken({ req, secret: base64Secret });
  if (!userJWT) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login to perform action",
    });
  }

  if (!userJWT.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Email is required",
    });
  }

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: userJWT.email,
    },
  });

  return {
    req,
    res,
    user,
  };
};

type TrpcContext = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
});
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((opts) => {
    //console.log(opts.input); // string
    opts.input; // string
    return { id: opts.input, name: "Bilbo" };
  }),
  test: t.procedure.query((opts) => {
    //console.log(opts.input); // undefined
    return { name: "Bilbo" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      return { id: "1", name: opts.input.name };
    }),
  createArticle: t.procedure
    .input(ZAddOrUpdateArticle)
    .mutation(async ({ ctx, input }) => {
      //console.log("Creating article", input.url);
      if (!input.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "URL is required",
        });
      }
      //console.log("Creating article", input.url);
      const parsedUrl = await parseUrl({ url: input.url });
      //console.log("Parsed URL", parsedUrl);
      const article = await parseArticle({ url: parsedUrl });
      //console.log("Parsed article", article);
      const savedArticle = await saveArticle({
        articleData: article,
        userId: ctx.user.id,
      });
      return savedArticle;
    }),
});

export type AppRouter = typeof appRouter;
