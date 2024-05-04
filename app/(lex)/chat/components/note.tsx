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
        <CardDescription className="flex flex-row items-center space-x-2">
          <CheckBadgeIcon size="xxs" />
          <div className="font-serif">Note Taken</div>
        </CardDescription>
        <CardTitle>{note}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{context}</div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
