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

const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export default async function TestingPage() {
  const { user } = await getServerComponentSession();
  const testArticle = "clws6pbqe000114jegegslmlk";

  const data = await prisma.article.findFirst({
    where: {
      id: testArticle,
    },
    select: {
      contentId: true,
    },
  });
  if (!data) {
    throw new Error("Content not found");
  }

  // const article = await prisma.article.findFirst({
  //   where: {
  //     user: {
  //       some: {
  //         id: user.id,
  //       },
  //     },
  //   },
  // });

  return (
    <Card className="relative bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      <CardHeader>
        <CardTitle>Pre-reading</CardTitle>
        <CardDescription>
          Before you start reading, here is a summary of the article
        </CardDescription>
      </CardHeader>

      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Shimmer
      </button>
    </Card>
    // <div
    //   className={cn({
    //     "select-none": hasSelection,
    //   })}
    // >
    //   {hasSelection ? (
    //     <div key="base">{aiText}</div>
    //   ) : (
    //     <div key="swapped">{aiText}</div>
    //   )}
    //   <AnnotationDrawer />
    // </div>
  );
}
