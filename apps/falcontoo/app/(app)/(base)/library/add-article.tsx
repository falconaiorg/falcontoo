"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddIcon } from "@/components/icons";
import Link from "next/link";
import { useArticleCreation } from "../../grab/use-article-creation";
import { url as urlRouter } from "@/urls";
import { api } from "@falcon/trpc/next/client";
import { useClipboard } from "@/hooks/use-paste";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ArticleFormSchema = z.object({
  url: z.string().refine(
    (url) => {
      try {
        new URL(url.startsWith("http") ? url : `https://${url}`);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid URL",
    },
  ),
});

export function AddArticle() {
  const router = useRouter();
  const trpcUtils = api.useUtils();

  const clipboardText = useClipboard();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ArticleFormSchema>>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      url: clipboardText || "",
    },
  });

  const {
    existingArticle,
    isCheckingExistence,
    checkError,
    createArticleAndRedirect,
    isCreationPending,
    isCreationSuccess,
    creationError,
    isCreatingArticle,
    checkArticleExistence,
    isCheckSuccess,
    isRedirecting,
  } = useArticleCreation(form.watch("url"));

  async function createAndInvalidate() {
    console.log("createAndInvalidate");
    await createArticleAndRedirect();
    console.log("invalidate");
    setOpen(false);
    form.reset();
    router.refresh();
  }

  async function onSubmit(data: z.infer<typeof ArticleFormSchema>) {
    await checkArticleExistence();
    console.log("onSubmit");
    console.log(existingArticle?.article);
    console.log(isCheckSuccess);
    console.log(isCreatingArticle);
    if (!existingArticle?.article && !isCreatingArticle) {
      await createAndInvalidate();
    }
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger>
        <Button variant="outline" size={"icon"}>
          <AddIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AlertDialogHeader>
              <AlertDialogTitle
                className={cn({
                  "animate-pulse": isCreationPending || isCheckingExistence,
                })}
              >
                {isCreationPending || isCheckingExistence
                  ? "Creation takes upto 10 seconds"
                  : "Add to library"}
              </AlertDialogTitle>

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="www.paulgraham.com/persistence"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                className={cn({
                  "animate-pulse": isCreationPending || isCheckingExistence,
                })}
                type="submit"
                disabled={isCreatingArticle || isCheckingExistence}
              >
                {isCreationPending || isCheckingExistence
                  ? "Processing..."
                  : "Add"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
        {existingArticle?.article && (
          <AlertDialog open={!!existingArticle}>
            <AlertDialogContent className="w-11/12">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isCreationPending
                    ? "Creating article... takes upto 10 seconds"
                    : isRedirecting
                      ? "Taking you to the article"
                      : "Exists in your library"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <span className="line-clamp-2">
                    {existingArticle?.article.content.title}
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-row justify-center space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={createAndInvalidate}
                  disabled={isCreationPending}
                >
                  Import Again
                </Button>
                <Link
                  href={
                    isCreationPending
                      ? ""
                      : urlRouter.reader.read({
                          articleId: existingArticle?.article?.id,
                        })
                  }
                >
                  <Button disabled={isCreationPending}>
                    Go to the Article
                  </Button>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
