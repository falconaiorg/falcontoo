const durationMap = {
  sm: 70,
  md: 100,
  lg: 200,
};

export const vibrate = ({
  duration = "md",
}: {
  duration?: "sm" | "md" | "lg";
} = {}) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(durationMap[duration]);
  }
};
