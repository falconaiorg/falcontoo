import { Step } from "react-joyride";

export const joyrideSteps: Step[] = [
  {
    target: ".joyride-home",
    content: "This is the home button.",
    title: "Home",
    data: {
      name: "home",
    },
  },
  {
    target: ".joyride-library",
    content: "This is the library button.",
    title: "Library",
    data: {
      name: "library",
    },
  },
  {
    target: ".joyride-settings",
    content: "This is the settings button.",
    title: "Settings",
    data: {
      name: "settings",
    },
  },
];
