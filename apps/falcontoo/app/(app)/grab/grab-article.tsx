"use client";
import { api } from "@falcon/trpc/next/client";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { url as urlRouter } from "@/urls";
import { useRouter } from "next/navigation";
import to from "await-to-js";
import Link from "next/link";
import { FullScreenMessage } from "@/components/full-screen-message";
import useNoSleep from "@/hooks/use-no-sleep";
export const testArticle =
  "https://substack.com/home/post/p-144117118?source=queue";

export function GrabArticle({ url }: { url: string }) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { enableNoSleep, disableNoSleep } = useNoSleep();

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
      router.refresh();
    },
  });

  const createArticleAndRedirect = useCallback(async () => {
    enableNoSleep();
    const [err, article] = await to(createArticle({ url: url }));
    disableNoSleep();
    if (err) {
      //console.log(err);
      return;
    }
    setIsRedirecting(true);
    router.push(urlRouter.library);
    setIsRedirecting(false);
  }, [createArticle, router, url, enableNoSleep, disableNoSleep]);

  useEffect(() => {
    const createArticleIfNotExists = async () => {
      if (!article?.article && isSuccess) {
        console.log("Creating article");
        await createArticleAndRedirect();
      }
    };

    createArticleIfNotExists();
  }, [
    article,
    isSuccess,
    url,
    createArticle,
    router,
    createArticleAndRedirect,
  ]);

  if (isLoading) return <FullScreenMessage>{"Removing Ads"}</FullScreenMessage>;
  if (error) return <FullScreenMessage>{"Error Occurred"}</FullScreenMessage>;
  if (isCreationPending)
    return <FullScreenMessage>{"Saving to Lex's Memory"}</FullScreenMessage>;
  if (creationError)
    return (
      <FullScreenMessage>
        <div className="text-lg">Oops! We cannot save this article.</div>
        <Link href={urlRouter.library}>
          <Button variant="secondary" className="mt-4">
            Go to library
          </Button>
        </Link>
      </FullScreenMessage>
    );
  if (isCreationSuccess)
    return (
      <FullScreenMessage>{"Article Created Successfully"}</FullScreenMessage>
    );
  if (isRedirecting)
    return <FullScreenMessage>{"Opening Library"}</FullScreenMessage>;

  return (
    <div>
      {article?.article && (
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
                <span className="line-clamp-2">
                  {article.article.content.title}
                </span>
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
                    : urlRouter.reader.read({ articleId: article.article?.id })
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
