"use client";
import { useShareParams } from "@/hooks/use-share-params";
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
import { url } from "@/urls";
import { useRouter } from "next/navigation";
import to from "await-to-js";
import Link from "next/link";
export const testArticle =
  "https://substack.com/home/post/p-144117118?source=queue";

export function SearchParams() {
  const router = useRouter();
  const { text, url: articleUrl, title } = useShareParams();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    data: article,
    isLoading,
    error,
    isSuccess,
  } = api.articles.doesArticleExist.useQuery(
    {
      url: articleUrl,
    },
    {
      enabled: !!articleUrl,
    },
  );

  const {
    mutateAsync: createArticle,
    isPending,
    isSuccess: isCreationSuccess,
    error: creationError,
  } = api.articles.createArticle.useMutation({
    onSuccess(data, variables, context) {
      console.log("Article created", data);
    },
  });

  const createArticleAndRedirect = async () => {
    const [err, article] = await to(createArticle({ url: articleUrl }));
    if (err) {
      console.log(err);
      return;
    }
    setIsRedirecting(true);
    router.push(url.reader.read({ articleId: article?.id }));
    setIsRedirecting(false);
  };

  useEffect(() => {
    const createArticleIfNotExists = async () => {
      if (!article && isSuccess) {
        await createArticleAndRedirect();
      }
    };

    createArticleIfNotExists();
  }, [article, isSuccess, articleUrl, createArticle, router]);

  if (isLoading) return <div>Loading Article...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {article && (
        <AlertDialog open={!!article}>
          <AlertDialogContent className="w-11/12">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isPending
                  ? "Creating article..."
                  : isRedirecting
                    ? "Taking you to  the article"
                    : "Exists in your library"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <span className="line-clamp-2">{title}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row justify-center space-x-2">
              <Button
                variant={"secondary"}
                onClick={createArticleAndRedirect}
                disabled={isPending}
              >
                Import Again
              </Button>
              <Link
                href={
                  isPending ? "" : url.reader.read({ articleId: article?.id })
                }
              >
                <Button disabled={isPending}>Go to the Article</Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="text-xl font-semibold">{articleUrl}</h2>
      <h3 className="text-lg font-medium">{text}</h3>
    </div>
  );
}
