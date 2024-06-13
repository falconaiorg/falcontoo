"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

const article = {
  title: "Hello World",
  progress: 57,
  estimatedTime: 5,
};

const articles = [
  { id: 123, ...article },
  { id: 124, ...article },
  { id: 125, ...article },
];

export default function HomePage() {
  return (
    <LampContainer>
      {articles.map((article, index) => (
        <motion.h1
          key={article.id}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-12 w-11/12 bg-gradient-to-br bg-clip-text py-4"
        >
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-row items-center justify-end space-x-4">
              <Button variant={"outline"}>Defer </Button>
              <Button variant={"default"}>Read</Button>
            </CardFooter>
          </Card>
        </motion.h1>
      ))}
    </LampContainer>
  );
}
