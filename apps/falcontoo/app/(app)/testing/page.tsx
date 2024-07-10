"use client";
import prisma from "@falcon/prisma";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { Embed } from "./embed";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentArticleEmbeddings } from "@falcon/lib/ai/context/generate-context";
import { api } from "@falcon/trpc/next/client";
import { Button } from "@/components/ui/button";
import { FullScreenMessage } from "@/components/full-screen-message";
import { updateAllArticlesToParsed } from "./action";
const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";
const testArticle = "clws6pbqe000114jegegslmlk";

export default function TestingPage() {
  const handleSaveArticle = async () => {
    await updateAllArticlesToParsed();
  };

  return (
    <Button onClick={handleSaveArticle}>Update all articles to parsed</Button>
  );
}
