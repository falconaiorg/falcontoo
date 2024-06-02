"use server";

import prisma from "@falcon/prisma";
import { Chat } from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@falcon/lib/next-auth/authOptions";

export const saveChat = async (chat: Chat) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;
  const { id, ...data } = chat;
  const stringifiedMessages = JSON.stringify(data.messages);

  const payload = {
    path: `/chat/${id}`,
    title: data.messages[0].content.substring(0, 100),
    messages: stringifiedMessages,
  };
  try {
    // await prisma.chat.upsert({
    //   where: { id },
    //   update: {
    //     messages: stringifiedMessages,
    //   },
    //   create: {
    //     id,
    //     userId,
    //     ...payload,
    //   },
    // });
  } catch (error) {
    console.error("Upsert Error:", error);
  }
};
