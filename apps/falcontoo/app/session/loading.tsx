import { LexLoading } from "@/components/loading/base-loading";

export default function Loading() {
  return (
    <div className="h-screen w-screen rounded-lg bg-background">
      <LexLoading />
    </div>
  );
}
