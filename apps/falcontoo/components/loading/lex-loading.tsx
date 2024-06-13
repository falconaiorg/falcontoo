import Image from "next/image";

export const LexLoading = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/lex.png"
        alt="loader"
        width={150}
        height={150}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform brightness-50"
      />
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="opacity-45">
          <div className="animate-breath flex h-96 w-96 items-center justify-center rounded-full bg-fuchsia-800 blur-xl">
            <div className="animate-breath h-80 w-80 rounded-full bg-sky-800 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
