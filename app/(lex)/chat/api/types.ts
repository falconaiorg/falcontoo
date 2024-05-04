export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
};
export type AIState = {
  id: string;
  messages: Message[]; // I don't know why is CoreMessage[] not used here
};

export type UIState = {
  id: string;
  node: React.ReactNode;
}[];
