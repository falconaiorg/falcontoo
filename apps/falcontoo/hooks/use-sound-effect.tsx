"use client";
import { soundEnabledAtom } from "@falcon/lib/state/app";
import { useAtomValue } from "jotai";
import useSound from "use-sound";
export const useSoundEffect = (soundUrl: string) => {
  const [play, { stop, pause }] = useSound(soundUrl, {
    volume: 0.3,
    soundEnabled: useAtomValue(soundEnabledAtom),
    interrupt: false,
  });

  return { playSound: play, stopSound: stop, pauseSound: pause };
};
