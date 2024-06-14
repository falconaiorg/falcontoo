import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const filterAtom = atom(false);
export const soundEnabledAtom = atomWithStorage("soundEnabled", true);
