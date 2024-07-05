import { UIState } from "@/app/(app)/draco/chat/actions";
import { BotMessage } from "@/app/(app)/draco/chat/rsc/bot-message";
import BookRack from "./bookrack";
import { Upload } from "./upload";
import { ScreenshotCapture } from "./screenshot";

export const exampleMessages = [
  {
    heading: "Take note",
    subheading: "of the conversation history",
    message: `Take note of the conversation history and save it.`,
  },
  {
    heading: "Add 10 minutes",
    subheading: "to this learning session",
    message: "Add 10 minutes to this learning session.",
  },
];

export const dummyChatMessages: UIState = [
  {
    id: "1",
    display: <BotMessage content={"Test"} />,
  },
  {
    id: "2",
    display: <BookRack />,
  },
  {
    id: "3",
    display: <BotMessage content={"Test"} />,
  },
  {
    id: "4",
    display: <BotMessage content={"Test"} />,
  },
  {
    id: "5",
    display: <Upload />,
  },
];
