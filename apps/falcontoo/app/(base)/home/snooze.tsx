import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns-tz";
import { round } from "lodash";
import { useState } from "react";
import { snoozeDialogAtom } from "./snooze-atom";
import { useAtom } from "jotai";

type SnoozeOptionValue =
  | "laterToday"
  | "tomorrow"
  | "in2Days"
  | "nextWeek"
  | "in2Weeks";

type SnoozeOption = {
  label: string;
  value: SnoozeOptionValue;
  hours: number;
  roundTo10AM: boolean;
  fullDate: boolean;
};

const snoozeOptions: SnoozeOption[] = [
  {
    label: "Later Today",
    value: "laterToday",
    hours: 4,
    roundTo10AM: false,
    fullDate: false,
  },
  {
    label: "Tomorrow",
    value: "tomorrow",
    hours: 24,
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "In 2 Days",
    value: "in2Days",
    hours: 48,
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "Next Week",
    value: "nextWeek",
    hours: 168,
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "In 2 Weeks",
    value: "in2Weeks",
    hours: 336,
    roundTo10AM: true,
    fullDate: true,
  },
];

const getSnoozeDate = (
  value: SnoozeOptionValue,
): {
  date: Date;
  formattedDate: string;
} => {
  const option = snoozeOptions.find((option) => option.value === value);
  if (!option) throw new Error(`Invalid snooze option ${value}`);
  const date = new Date();
  date.setHours(date.getHours() + option.hours);

  // Round to 10 AM if needed
  if (option.roundTo10AM) {
    date.setHours(10, 0, 0, 0);
  }
  // format as full date if needed
  if (option.fullDate) {
    return {
      date,
      formattedDate: format(date, "MMM d, h:mm a"),
    };
  }
  return {
    date,
    formattedDate: format(date, "h:mm a"),
  };
};

export default function Snooze({ articleId }: { articleId: string }) {
  const [isOpen, setIsOpen] = useAtom(snoozeDialogAtom);

  const snoozeArticle = async ({
    articleId,
    snoozeDate,
  }: {
    articleId: string;
    snoozeDate: Date;
  }) => {
    console.log(`Snoozing article ${articleId} until ${snoozeDate}`);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        {snoozeOptions.map((option) => {
          const { date, formattedDate } = getSnoozeDate(option.value);
          return (
            <Button
              key={option.value}
              variant={"ghost"}
              className="flex w-full flex-row items-center justify-between"
              onClick={() =>
                snoozeArticle({
                  articleId,
                  snoozeDate: date,
                })
              }
            >
              <div>{option.label}</div>
              <div>{formattedDate}</div>
            </Button>
          );
        })}
      </AlertDialogContent>
    </AlertDialog>
  );
}
