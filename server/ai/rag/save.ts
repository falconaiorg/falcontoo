"use server";
import { Article } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { split } from "./splitter";
import { checkArticleOwnership } from "../auth";
import { embedInQdrant } from "./embed";

export const saveAsVector = async function ({ article }: { article: Article }) {
  try {
    await checkArticleOwnership({ article });
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
