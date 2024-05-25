import { retrieve } from "./retrieve";
import { saveAsVector } from "./save";

export const rag = {
  articles: {
    save: saveAsVector,
    retrieve,
  },
};
