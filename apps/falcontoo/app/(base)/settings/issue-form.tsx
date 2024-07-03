"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const issueSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const ReportIssue = () => {
  const form = useForm<z.infer<typeof issueSchema>>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof issueSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="What's the issue?"
                  {...field}
                  className={cn(
                    "focus-visible:ring-0",
                    "rounded-none border border-b border-l-0 border-r-0 border-t-0",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className={cn(
                    "h-36 resize-none focus-visible:ring-0",
                    "rounded-none border border-b border-l-0 border-r-0 border-t-0",
                  )}
                  placeholder="Give us the spicy details."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"} className="">
          Submit
        </Button>
      </form>
    </Form>
  );
};
