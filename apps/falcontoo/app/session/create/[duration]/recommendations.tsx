"use client";
import { url } from "@/urls";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddIcon, MinusIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

const ArticleCard = ({
  type,
  action,
}: {
  type: "add" | "remove";
  action: () => void;
}) =>
  // { article }: { article: ArticleWithContent }
  {
    return (
      <Card
        className={cn("flex flex-row items-center justify-between pr-4", {
          // "border-neutral-700": article.readingProgress !== 100,
          // "brightness-75": article.readingProgress === 100,
        })}
      >
        <CardHeader>
          <CardTitle className="line-clamp-2 text-sm font-medium leading-5">
            {/* {article.content.title} */} This is a title
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs">
            {/* {article.content.description} */} This is a description
          </CardDescription>
          <CardDescription className="flex flex-row justify-between text-xs">
            <div className="font-semibold tracking-tight">
              {/* {article.readingProgress === 100 ? "Read" : `Unread`} */} Read
            </div>
          </CardDescription>
        </CardHeader>
        <Button
          size={"icon"}
          variant={type === "add" ? "secondary" : "outline"}
        >
          {type === "add" ? <AddIcon size="sm" /> : <MinusIcon size="sm" />}
        </Button>
      </Card>
    );
  };

export function Recommendations({}: {}) {
  const sessionId = "1234";
  const router = useRouter();
  const createSession = () => {
    console.log("Create session");
    router.push(url.session.read({ sessionId }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card className="border-cyan-600">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <CardTitle>Reccomended Articles</CardTitle>
            <CardDescription>Reading Time: 5 minutes</CardDescription>
          </div>
          <Button variant={"default"} onClick={createSession}>
            Create
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          <ArticleCard type="remove" action={() => {}} />
          <ArticleCard type="remove" action={() => {}} />
          <ArticleCard type="remove" action={() => {}} />
        </CardContent>
      </Card>
      <CardContent className="flex flex-col space-y-3">
        <ArticleCard type="add" action={() => {}} />
        <ArticleCard type="add" action={() => {}} />
        <ArticleCard type="add" action={() => {}} />
      </CardContent>
    </div>
  );
}
