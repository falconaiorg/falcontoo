"use client";
import { useState } from "react";
import { Step, TooltipRenderProps } from "react-joyride";
import dynamic from "next/dynamic";
import { joyrideSteps } from "./steps";
import { useAtom } from "jotai";
import { startJoyrideAtom } from "@/app/(reader)/components/drawer/atoms";
// Usually, you would import this at the top of the file like so:
// import JoyRide from "react-joyride";
// However, we are using dynamic imports here to prevent server-side rendering
// NOT doing this will cause hydration errors because joyride uses window
// By default, Next.js will try to render this component on the server
// This will cause an error because window is not defined on the server
// By setting ssr to false, we tell Next.js to only render this component on the client
const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

export function LexJoyride() {
  const [steps] = useState<Step[]>(joyrideSteps);
  const [run] = useAtom(startJoyrideAtom);
  return (
    <JoyRideNoSSR
      steps={steps}
      continuous={true}
      showProgress={true}
      hideBackButton={true}
      showSkipButton={false}
      disableOverlayClose={true}
      hideCloseButton
      run={run}
      styles={{
        options: {
          arrowColor: "#333333", // Dark background color for the tooltip arrow
          backgroundColor: "#333333", // Dark background color for the tooltip
          primaryColor: "#ff3e00", // Highlight color, can be used for the button or progress dot
          textColor: "#ffffff", // Light text color for better readability in dark mode
          zIndex: 1000, // Ensure the tooltip is above other content
        },
      }}
    />
  );
}
