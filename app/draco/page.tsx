import { nanoid } from "nanoid";
import { AI } from "./chat/actions";
import { Chat } from "./chat/chat";
import { NoSleepToggle } from "@/components/no-sleep";

const Page = () => {
  const id = nanoid();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <NoSleepToggle />
      <Chat id={id} />
    </AI>
  );
};

export default Page;
