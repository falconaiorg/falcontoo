export const FullScreenMessage = function ({ text }: { text: string }) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex animate-pulse items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 animate-pulse bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-3xl font-bold text-transparent">
        {text}
      </p>
    </div>
  );
};
