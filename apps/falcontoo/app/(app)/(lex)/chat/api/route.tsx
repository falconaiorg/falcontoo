import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import type { CoreMessage } from "ai";
import fetch from "node-fetch";
import { union, z } from "zod";
import { nanoid } from "nanoid";

const transcribeImage = async (image: string, messages: CoreMessage[]) => {
  const imageUrl =
    "https://i.ibb.co/9qVKc4W/Screenshot-2024-04-29-at-10-27-16-PM.png";
  const response = await fetch(image);
  const arrayBuffer = await response.arrayBuffer();
  const imageBase64 = Buffer.from(arrayBuffer).toString("base64");
  const imageMessage: CoreMessage = {
    role: "user",
    content: [
      {
        image: imageBase64,
        type: "image",
        mimeType: "image/png",
      },
      {
        text: "Transcribe this image, as is.",
        type: "text",
      },
    ],
  };
  const responseAnthropic = await streamText({
    model: anthropic("claude-3-haiku-20240307"),
    system:
      "You are dog that transcribes images. Like OCRDOG. You give exact text.",
    messages: [...messages, imageMessage],
  });
  return responseAnthropic.toAIStream();
  // const aiStream = await transcribeImage(imageUrl, messages);
};

const toolCallMessage: CoreMessage = {
  role: "assistant",
  content: [
    {
      type: "tool-call",
      toolName: "showStockPurchase",
      toolCallId: "8Bb6oJ1vAIRuHSIAVYmAp",
      args: z.object({
        symbol: z.string(),
        price: z.number(),
        defaultAmount: z.number(),
      }),
    },
  ],
};

const toolMessage: CoreMessage = {
  role: "tool",
  content: [
    {
      result: JSON.stringify({
        symbol: "AAPL",
        price: 150,
        defaultAmount: 100,
        status: "completed",
      }),
      type: "tool-result",
      toolCallId: "8Bb6oJ1vAIRuHSIAVYmAp",
      toolName: "showStockPurchase",
    },
  ],
};

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };
  //console.log(messages);

  const all = [...messages, toolCallMessage, toolMessage];

  //console.log(all);

  const response = await streamText({
    model: openai("gpt-3.5-turbo"),
    system: "You give the name of the tool last used.",
    messages: all,
  });

  //console.log(response);

  const aiStream = response.toAIStream();

  //console.log(aiStream);

  return new StreamingTextResponse(aiStream);
}
