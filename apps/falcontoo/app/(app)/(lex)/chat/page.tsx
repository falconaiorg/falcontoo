import { nanoid } from "nanoid";
// import { AI } from "./chat/actions";
import { Chat } from "./components/chat/chat";
import { AI } from "./api/actions";

const Page = () => {
  const id = nanoid();

  return (
    <AI initialAIState={{ id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
};

export default Page;

// import { nanoid } from "nanoid";
// import { Chat } from "./chat";
// import { AI } from "@/app/draco/chat/actions";
// // import { AI } from "./api/actions";

// const Page = () => {
//   const id = nanoid();

//   return (
//     <AI initialAIState={{ chatId: id, messages: [] }}>
//       <Chat id={id} />
//     </AI>
//   );
// };

// export default Page;
