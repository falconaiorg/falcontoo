import { LampContainer } from "@/components/ui/lamp";
import { RecommendedArticles } from "./recommended-articles";

export default function HomePage() {
  return (
    <LampContainer className="h-full">
      <RecommendedArticles />
    </LampContainer>
  );
}
