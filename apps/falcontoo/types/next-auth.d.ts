import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Plan } from "@falcon/prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: Plan;
      planStart: Date;
      planEnd: Date;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    plan: Plan;
    planStart: Date;
    planEnd: Date;
  }
}
