import "server-only";

import { createAI, getAIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { Chat } from "../types";
import { saveChat } from "../save-chat";
import { submitUserMessage } from "./submit";
import { confirmPurchase } from "./confirm-purchase";
import { authOptions } from "@falcon/lib/next-auth/authOptions";
import { getUIStateFromAIState } from "../get-ui-from-ai-state";

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export type AIState = {
  chatId: string;
  messages: Message[];
};

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const session = await getServerSession(authOptions);

    if (session && session.user) {
      const aiState = getAIState();

      if (aiState) {
         // ToDO
        // @ts-ignore
        const uiState = getUIStateFromAIState(aiState)
        return uiState;
      }
    } else {
      return;
    }
  },
  onSetAIState: async ({ state, done }) => {
    "use server";

    const session = await getServerSession(authOptions);

    if (session && session.user) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session.user.id as string;
      const path = `/chat/${chatId}`;
      const title = messages[0].content.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };

      await saveChat(chat);
    } else {
      return;
    }
  },
});
