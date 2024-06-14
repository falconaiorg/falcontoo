import Image from "next/image";

export const LexLoading = () => {
  return (
    <div className="relative h-full w-full">
      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text font-serif text-5xl font-semibold text-transparent brightness-50">
        Lex
      </span>
      {/* <Image

        src="/lex.png"
        alt="loader"
        width={150}
        height={150}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform brightness-50"
      /> */}
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="opacity-45">
          <div className="flex h-96 w-96 animate-breath items-center justify-center rounded-full bg-cyan-700 blur-xl">
            <div className="h-80 w-80 animate-breath rounded-full bg-sky-800 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
