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
import { motion } from "framer-motion";
import { usePrefetchArticle } from "@/hooks/query/usePrefetchArticle";

export const ReadingHistory = () => {
  const [sessions] = api.stats.getSessionHistory.useSuspenseQuery();
  const { prefetchArticle } = usePrefetchArticle();

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
                {session.sessionArticles.map((articleData, articleIndex) => (
                  <motion.div
                    key={articleIndex}
                    onViewportEnter={() =>
                      prefetchArticle({ articleId: articleData.article.id })
                    }
                  >
                    <Link
                      href={url.reader.read({
                        articleId: articleData.article.id,
                      })}
                      className="underline decoration-cyan-400 underline-offset-2"
                    >
                      {articleData.article.content.title}
                    </Link>
                  </motion.div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
