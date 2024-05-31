import { BottomNav } from "@/components/bottom-nav";

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <BottomNav />
    </div>
  );
}
