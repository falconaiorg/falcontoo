"use server";
import { Article } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { split } from "./splitter";
import { embedInQdrant } from "./embed";
import { ArticleWithContent } from "@/server/next/article";

export const saveAsVector = async function ({
  article,
}: {
  article: ArticleWithContent;
}) {
  try {
    const { documentArray, chunks } = await split({ article });
    console.log(documentArray, chunks);
    console.log(documentArray.forEach((doc) => console.log(doc.metadata)));
    await embedInQdrant({ documents: documentArray });
  } catch (e) {
    console.log(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error saving article as vector.",
      cause: e,
    });
  }
};
