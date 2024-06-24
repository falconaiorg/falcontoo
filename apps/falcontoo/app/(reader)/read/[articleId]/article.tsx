import MarkdownWithHighlight from "../../components/markdown/with-highlight";
import { AnnotationDrawer } from "../../components/drawer/annotation-drawer";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReadingProgress } from "./reading-progress";
import { server } from "@falcon/lib/server/next";
import { Link } from "next-view-transitions";
const searchWords = [
  "This is a sample markdown text. The words 'sample' and 'markdown'",
];
export async function Article({ articleId }: { articleId: string }) {
  const { user } = await getServerComponentSession();
  const article = await server.article.getArticlebyArticleId({
    articleId,
    userId: user.id,
  });
  return (
    <Card className="flex flex-col gap-4 border-none">
      <CardHeader className="px-2">
        <CardTitle className="w-10/12 font-medium">
          {article.content.title}
        </CardTitle>
        <CardDescription className="underline decoration-sky-700 underline-offset-2">
          <Link
            href={article.content.url}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
          >
            Read in browser
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <MarkdownWithHighlight
          markdownText={article.content.markdown}
          searchWords={searchWords}
        />
        <AnnotationDrawer />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <ReadingProgress article={article} />
      </CardFooter>
    </Card>
  );
  {
    /* <Card
        className={cn(
          "inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
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
      </Card> */
  }
}
