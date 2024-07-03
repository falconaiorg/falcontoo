import { atom } from "jotai";

export const hasSelectionAtom = atom<boolean>(false);

export const backBarAtom = atom({
  title: "",
  url: "",
});

export const readingSessionIdAtom = atom<string | null>(null);
