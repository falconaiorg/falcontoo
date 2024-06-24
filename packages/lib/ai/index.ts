import * as context from "./context";
import * as analysis from "./context/analysis";
import { rag } from "./rag";

export const ai = {
  context,
  rag: rag,
  analysis,
};
