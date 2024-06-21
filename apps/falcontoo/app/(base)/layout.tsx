import { BottomNav } from "./bottom-nav";

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      {children}
      <BottomNav />
    </div>
  );
}
