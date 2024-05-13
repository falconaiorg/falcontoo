import { CardList, SessionCard } from "./session-card";
import { TRPCTest } from "./test-trpc";

export default async function HomePage() {
  return (
    <div className="px-4 py-2">
      <TRPCTest />
      <CardList />
    </div>
  );
}
