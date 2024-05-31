import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { AIState, Message, UIState } from "./types";
import { nanoid } from "nanoid";
import { openai } from "@ai-sdk/openai";
import { systemPrompt } from "./system-prompt";
import { BotMessage } from "@/app/draco/chat/rsc/bot-message";
import { date, z } from "zod";
import { Note } from "../components/note";
import { BotCard } from "@/app/draco/chat/rsc/bot-card";
import { SpinnerMessage } from "@/app/draco/chat/rsc/spinner-message";

// Using any here is a problem, but the code does not work without it.
const getFormattedMessages = function ({
  provider,
  messages,
}: {
  provider: "openai" | "anthropic";
  messages: any;
}) {
  const formattedMessages = messages.map((message: any) => ({
    role: message.role,
    content: message.content,
    name: message.name,
  }));

  return formattedMessages;
};

const submitUserMessage = async (userMessageContent: string) => {
  "use server";
  const aiState = getMutableAIState<typeof AI>();
  console.log(aiState.get());

  const existingState = aiState.get();
  const existingMessages = existingState.messages;

  const userMessage: Message = {
    id: nanoid(),
    role: "user",
    content: userMessageContent,
  };

  // Add user message to the state
  aiState.update({
    ...existingState,
    messages: [...existingMessages, userMessage],
  });
  console.log(aiState.get());

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const messages = getFormattedMessages({
    provider: "openai",
    messages: aiState.get().messages,
  });
  console.log(aiState.get());

  const result = await streamUI({
    initial: <SpinnerMessage />,
    model: openai("gpt-3.5-turbo"),
    system: systemPrompt,
    messages: messages,
    text: ({ content, done, delta }) => {
      console.log(aiState.get());

      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        console.log(aiState.get());
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
        console.log(aiState.get());
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      takeNote: {
        description: "Take note and save it. Show UI of the note to the user.",
        parameters: z.object({
          note: z
            .string()
            .describe("Exact note that the user asked to take down."),
          context: z.string().describe("The context relevant to the note."),
        }),
        generate: async function* ({ context, note }) {
          console.log(aiState.get());

          yield <SpinnerMessage />;
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "tool",
                name: "takeNote",
                content: JSON.stringify({
                  note,
                  context,
                  date: new Date().toISOString(),
                }),
              },
            ],
          });
          console.log(aiState.get());
          return (
            <Note
              note={note}
              context={context}
              date={new Date().toISOString()}
            />
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
};

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { id: nanoid(), messages: [] },
  onSetAIState: async (aiState) => {
    "use server";
    console.log(aiState);
  },
  onGetUIState: async (aiState) => {
    "use server";
    console.log(aiState);
    return [];
  },
});
