import { nanoid } from "nanoid";
import { AI } from "./chat/actions";
import { Chat } from "./chat/chat";
import { NoSleepToggle } from "@/components/no-sleep";
import { Capture } from "@/components/capture";

const Page = () => {
  const id = nanoid();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Capture />
      <NoSleepToggle />
      <Chat id={id} />
    </AI>
  );
};

export default Page;
