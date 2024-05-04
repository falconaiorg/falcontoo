"use client";
import { CheckBadgeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export function Note({
  note,
  context,
  date,
}: {
  note: string;
  context: string;
  date: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center space-x-2">
          <CheckBadgeIcon size="xs" />
          <div className="font-serif">Note Taken</div>
        </CardTitle>
        <CardDescription>{note}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
