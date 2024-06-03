import { EventEmitter } from "events";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import SuperJSON from "superjson";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== "secret") {
      return null;
    }
    return {
      name: "alex",
    };
  };

  return {
    req,
    res,
    user: getUser(),
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
    console.log(opts.input); // string
    opts.input; // string
    return { id: opts.input, name: "Bilbo" };
  }),
  test: t.procedure.query((opts) => {
    console.log(opts.input); // undefined
    return { name: "Bilbo" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      return { id: "1", name: opts.input.name };
    }),
});

export type AppRouter = typeof appRouter;
