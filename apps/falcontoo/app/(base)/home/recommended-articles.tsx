"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Snooze from "./snooze";
import { useSetAtom } from "jotai";
import { snoozeDialogAtom } from "./snooze-atom";

const article = {
  title: "Hello World",
  progress: 57,
  estimatedTime: 5,
};

const articles = [
  { id: "123", ...article },
  { id: "124", ...article },
  { id: "125", ...article },
];
export function RecommendedArticles() {
  const setSnoozeDialog = useSetAtom(snoozeDialogAtom);

  return (
    <div className="mt-20 flex w-full flex-col items-center space-y-10">
      {articles.map((article) => (
        <motion.h1
          key={article.id}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" w-11/12 bg-gradient-to-br bg-clip-text py-4"
        >
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-row items-center justify-end space-x-4">
              <Button variant={"outline"} onClick={() => setSnoozeDialog(true)}>
                Snooze{" "}
              </Button>
              <Button variant={"default"}>Read</Button>
            </CardFooter>
          </Card>
          <Snooze articleId={article.id} />
        </motion.h1>
      ))}
    </div>
  );
}
