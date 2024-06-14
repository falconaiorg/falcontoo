"use client";
import { soundEnabledAtom } from "@falcon/lib/state/app";
import { useAtomValue } from "jotai";
import useSound from "use-sound";
import { vibrate as vibrateNow } from "@falcon/lib/vibrate";
export const useSoundEffect = (
  soundUrl: string,
  {
    vibrate,
  }: {
    vibrate?: "sm" | "md" | "lg";
  } = {},
) => {
  const [play, { stop, pause }] = useSound(soundUrl, {
    volume: 0.3,
    soundEnabled: useAtomValue(soundEnabledAtom),
    interrupt: false,
  });

  const playWithVibrate = () => {
    if (vibrate) {
      vibrateNow({ duration: vibrate });
    }
    play();
  };

  return {
    playSound: playWithVibrate,
    stopSound: stop,
    pauseSound: pause,
  };
};
