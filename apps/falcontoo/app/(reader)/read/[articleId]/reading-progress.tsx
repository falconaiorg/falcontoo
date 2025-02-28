//TODO: Track Reading Progress - https://chatgpt.com/share/46aa5555-bb3c-494a-9e32-c2416db497b5
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { api } from "@falcon/trpc/next/client";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import { sounds } from "@/sounds";

const FormSchema = z.object({
  hasRead: z.boolean(),
});

// TODO Fix opmitimistic updates, currently state does not reset to previous state if the request fails
export const ReadingProgress = ({
  article,
}: {
  article: ArticleWithContent;
}) => {
  const { playSound } = useSoundEffect(sounds.check, {
    vibrate: "sm",
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hasRead: !!article.readingProgress,
    },
  });

  const { mutateAsync: setReadingProgress } =
    api.articles.setReadingProgress.useMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { hasRead } = data;
    if (hasRead) {
      const success = await setReadingProgress({
        articleId: article.id,
        progress: 100,
      });
      if (success) {
        form.setValue("hasRead", true);
      }
    }
    if (!hasRead) {
      const success = await setReadingProgress({
        articleId: article.id,
        progress: 0,
      });
      if (success) {
        form.setValue("hasRead", false);
      }
    }
    router.refresh();
  }
  const percentage = form.watch("hasRead") ? 100 : 0;

  return (
    <div className="flex items-center space-x-1">
      <div
        className={cn("relative h-8 w-8 transition-transform duration-200", {})}
      >
        <CircularProgressbar
          value={percentage}
          text={undefined}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathTransitionDuration: 0.75,
            pathColor: `hsl(var(--primary))`,
            trailColor: "hsl(var(--secondary-background))",
          })}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="hasRead"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) => {
                        value && playSound();
                        field.onChange(value);
                        form.handleSubmit(onSubmit)();
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform border-2 border-primary data-[state=checked]:h-5 data-[state=checked]:w-5 data-[state=checked]:border-transparent data-[state=checked]:bg-transparent data-[state=checked]:font-bold data-[state=checked]:text-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div
        className={cn("text-sm text-primary", {
          "text-primary": form.watch("hasRead"),
        })}
      >
        {form.watch("hasRead") ? "Read" : "Mark as Read"}
      </div>
    </div>
  );
};
