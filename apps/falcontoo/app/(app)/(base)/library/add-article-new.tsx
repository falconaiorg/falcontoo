"use client";
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
import { AddIcon } from "@/components/icons";
import Link from "next/link";

const ArticleFormSchema = z.object({
  url: z.string(),
});

export function AddArticle() {
  const form = useForm<z.infer<typeof ArticleFormSchema>>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      url: "",
    },
  });
  async function onSubmit(data: z.infer<typeof ArticleFormSchema>) {
    const url = data.url;

    // const urlURI = encodeURIComponent(url);
    // router.push("/grab?url=" + urlURI + "&title=" + "test" + "&text=" + "test");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-row items-center justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Paste URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          key={form.watch("url")}
          href={{
            pathname: "/grab",
            query: {
              url: form.watch("url"),
              title: "test Of The Test",
              text: "test Of The Test",
            },
          }}
        >
          <Button variant="outline" size={"icon"} type="button">
            <AddIcon />
          </Button>
        </Link>
      </form>
    </Form>
  );
}
