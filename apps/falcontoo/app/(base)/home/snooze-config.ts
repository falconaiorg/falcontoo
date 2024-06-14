import { format } from "date-fns-tz";
import { addHours, addDays, addWeeks, addMonths } from "date-fns";

export type SnoozeOptionValue =
  | "laterToday"
  | "tomorrow"
  | "in2Days"
  | "nextWeek"
  | "in2Weeks"
  | "nextMonth";

export type SnoozeOption = {
  label: string;
  value: SnoozeOptionValue;
  addTime: (date: Date) => Date;
  roundTo10AM: boolean;
  fullDate: boolean;
};

export const snoozeOptions: SnoozeOption[] = [
  {
    label: "Later Today",
    value: "laterToday",
    addTime: (date) => addHours(date, 4),
    roundTo10AM: false,
    fullDate: false,
  },
  {
    label: "Tomorrow",
    value: "tomorrow",
    addTime: (date) => addDays(date, 1),
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "In 2 Days",
    value: "in2Days",
    addTime: (date) => addDays(date, 2),
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "Next Week",
    value: "nextWeek",
    addTime: (date) => addWeeks(date, 1),
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "In 2 Weeks",
    value: "in2Weeks",
    addTime: (date) => addWeeks(date, 2),
    roundTo10AM: true,
    fullDate: true,
  },
  {
    label: "Next Month",
    value: "nextMonth",
    addTime: (date) => addMonths(date, 1),
    roundTo10AM: true,
    fullDate: true,
  },
];

export const getSnoozeDate = (
  value: SnoozeOptionValue,
): {
  date: Date;
  formattedDate: string;
} => {
  const option = snoozeOptions.find((option) => option.value === value);
  if (!option) throw new Error(`Invalid snooze option ${value}`);

  let date = new Date();
  date = option.addTime(date);

  // Round to 10 AM if needed
  if (option.roundTo10AM) {
    date.setHours(10, 0, 0, 0);
  }

  const formatString = option.fullDate ? "MMM d, h:mm a" : "h:mm a";

  return {
    date,
    formattedDate: format(date, formatString),
  };
};
