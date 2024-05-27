import { getServerComponentSession } from "@/auth";
import { server } from "@/server/next";
import MarkdownWithHighlight from "../../components/markdown/with-highlight";
import { FilterButton } from "../../components/filter-btn";
import { AnnotationDrawer } from "../../components/drawer/annotation-drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const markdownText = `
# Sample Markdown
This is a sample markdown text. The words 'sample' and 'markdown' should be highlighted.
`;

const searchWords = [
  "This is a sample markdown text. The words 'sample' and 'markdown'",
];

export default async function ReadPage({
  params,
}: {
  params: { articleId: string };
}) {
  const articleId = params.articleId;
  const { user } = await getServerComponentSession();
  const article = await server.article.getArticlebyArticleId({
    articleId,
    userId: user.id,
  });
  return (
    <div className="flex flex-col space-y-3 px-4 py-4">
      {/* <FilterButton /> */}
      <Card className="dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative ">
        <CardHeader className="py-4">
          <CardTitle className="text-sm">Pre-reading</CardTitle>
          <CardDescription>
            Before you start reading, here is a summary of the article. You will
            review stuff here. You can read your past annotations here. You can
            read similar articles here.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>{article.content.title}</CardTitle>
          {/* <p className="text-sm text-gray-500">{article.content.description}</p> */}
        </CardHeader>
        <CardContent>
          <MarkdownWithHighlight
            markdownText={article.content.markdown}
            searchWords={searchWords}
          />
          <AnnotationDrawer />
        </CardContent>
      </Card>
      <Card
        className={cn(
          "animate-shimmer inline-flex items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        )}
      >
        <CardHeader className="py-4">
          <CardTitle className="text-sm">Stay in the Flow</CardTitle>
          <CardDescription className="text-sm">
            Sam altman has something similar to this in his blog. I think you
            might like reading it.
          </CardDescription>
          <CardFooter className="flex justify-end">
            <div className="font-serif text-sm font-medium">Save 4 mins</div>
          </CardFooter>
        </CardHeader>
      </Card>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <h1 className="font-bold">Make what people want.</h1>
        </CardHeader>
        <CardContent>
          <MarkdownWithHighlight
            markdownText={article.content.markdown}
            searchWords={searchWords}
          />
          <AnnotationDrawer />
        </CardContent>
      </Card>
    </div>
  );
}
