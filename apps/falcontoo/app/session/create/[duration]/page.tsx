import { BackBar } from "@/components/back-bar";
import { url } from "@/urls";
import { Recommendations } from "./recommendations";

export default async function CreateSessionPage({
  params,
}: {
  params: { duration: string };
}) {
  const { duration } = params;
  console.log(duration);
  return (
    <div className="h-full p-2">
      <BackBar link={url.home} noText />
      <Recommendations />
    </div>
  );
}
