import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/authOptions";

export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
