"use client";
import { api } from "@/app/_trpc";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { url as urlRouter } from "@/urls";
import { useRouter } from "next/navigation";
import to from "await-to-js";
import Link from "next/link";
import { parseArticle } from "@/server/parser";
import { parseUrl } from "@/server/parser/url";
export const testArticle =
  "https://substack.com/home/post/p-144117118?source=queue";

export function GrabArticle({ url }: { url: string }) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);

  const {
    data: article,
    isLoading,
    error,
    isSuccess,
  } = api.articles.doesArticleExist.useQuery(
    {
      url,
    },
    {
      enabled: !!url,
    },
  );

  const {
    mutateAsync: createArticle,
    isPending: isCreationPending,
    isSuccess: isCreationSuccess,
    error: creationError,
  } = api.articles.createArticle.useMutation({
    onSuccess(data, variables, context) {
      console.log("Article created", data);
    },
  });

  const createArticleAndRedirect = async () => {
    // const [error1, parsedUrl] = await to(parseUrl({ url: url }));
    // if (error1) {
    //   setManualError("error parsing url");
    //   return;
    // }
    // const [error2, testArticle] = await to(parseArticle({ url: parsedUrl }));
    // if (error2) {
    //   setManualError("error parsing article");
    //   return;
    // }

    const [err, article] = await to(createArticle({ url: url }));
    if (err) {
      console.log(err);
      return;
    }
    setIsRedirecting(true);
    router.push(urlRouter.reader.read({ articleId: article?.id }));
    setIsRedirecting(false);
  };

  useEffect(() => {
    const createArticleIfNotExists = async () => {
      if (!article && isSuccess) {
        await createArticleAndRedirect();
      }
    };

    createArticleIfNotExists();
  }, [article, isSuccess, url, createArticle, router]);

  if (isLoading) return <div>Loading Article...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (isCreationPending) return <div>Creating article...</div>;
  if (creationError)
    return <div>An error occurred: {creationError.message}</div>;
  if (isCreationSuccess) return <div>Article created successfully</div>;

  return (
    <div>
      {manualError && <div>{manualError}</div>}
      {article && (
        <AlertDialog open={!!article}>
          <AlertDialogContent className="w-11/12">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isCreationPending
                  ? "Creating article..."
                  : isRedirecting
                    ? "Taking you to  the article"
                    : "Exists in your library"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <span className="line-clamp-2">{article.content.title}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row justify-center space-x-2">
              <Button
                variant={"secondary"}
                onClick={createArticleAndRedirect}
                disabled={isCreationPending}
              >
                Import Again
              </Button>
              <Link
                href={
                  isCreationPending
                    ? ""
                    : urlRouter.reader.read({ articleId: article?.id })
                }
              >
                <Button disabled={isCreationPending}>Go to the Article</Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
