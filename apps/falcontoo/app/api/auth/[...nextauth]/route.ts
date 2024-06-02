import NextAuth from "next-auth";
import { authOptions } from "@falcon/lib/next-auth/authOptions";
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
