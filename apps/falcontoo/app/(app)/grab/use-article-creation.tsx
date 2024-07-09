"use client";
import { useState, useCallback, useEffect } from "react";
import { api } from "@falcon/trpc/next/client";
import to from "await-to-js";
import useNoSleep from "@/hooks/use-no-sleep";
import { useRouter } from "next/navigation";
import { url as urlRouter } from "@/urls";

export function useArticleCreation(url: string) {
  const trpcUtils = api.useUtils();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { enableNoSleep, disableNoSleep } = useNoSleep();
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);

  const {
    data: existingArticle,
    error: checkError,
    isSuccess: isCheckSuccess,
    refetch: checkArticleExistence,
    isRefetching: isCheckingExistence,
  } = api.articles.doesArticleExist.useQuery({ url }, { enabled: !!url });

  console.log("existingArticle", existingArticle);

  const {
    mutateAsync: createArticle,
    isPending: isCreationPending,
    isSuccess: isCreationSuccess,
    error: creationError,
  } = api.articles.createArticle.useMutation({
    onSuccess: () => {
      trpcUtils.articles.getArticles.invalidate();
    },
  });

  const checkAndCreateArticle = async () => {
    enableNoSleep();
    const [err, article] = await to(createArticle({ url }));
    disableNoSleep();
    setIsCreatingArticle(false);
    return { err, article };
  };

  const createArticleAndRedirect = async () => {
    const { err } = await checkAndCreateArticle();
    if (err) {
      console.error(err);
      return;
    }
    setIsRedirecting(true);
    router.push(urlRouter.library);
    setIsRedirecting(false);
  };

  return {
    existingArticle,
    isCheckingExistence,
    checkError,
    isCheckSuccess,
    isCreationPending,
    isCreationSuccess,
    creationError,
    isCreatingArticle,
    checkArticleExistence,
    createArticleAndRedirect,
    isRedirecting,
  };
}
