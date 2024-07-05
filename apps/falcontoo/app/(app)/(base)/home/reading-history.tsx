"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@falcon/trpc/next/client";
import { format } from "date-fns";
import Link from "next/link";
import { url } from "@/urls";

export const ReadingHistory = () => {
  const [sessions] = api.stats.getSessionHistory.useSuspenseQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div>Reading History</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-0"
        >
          {sessions.map((session, sessionIndex) => (
            <AccordionItem key={sessionIndex} value={`item-${sessionIndex}`}>
              <AccordionTrigger>
                <div className="flex space-x-4">
                  <div>{format(session.createdAt, "MMM d, yyyy")}</div>
                  <div>{format(session.createdAt, "HH:mm")}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {session.sessionArticles.map((article, articleIndex) => (
                  <Link
                    href={url.reader.read({ articleId: article.article.id })}
                    key={articleIndex}
                    className="underline decoration-cyan-400 underline-offset-2"
                  >
                    {article.article.content.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
