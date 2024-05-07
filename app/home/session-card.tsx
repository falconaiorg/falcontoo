import { BookOpenIcon, BookmarkIcon, CalendarIcon } from "@/components/icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}

type CardData = {
  title: string;
  type: "WORK" | "READING";
  date: string;
  durationInSec: number;
};

const cardData: CardData = {
  title: "Thinking Fast and Slow",
  type: "READING",
  date: "23th March 2021",
  durationInSec: 8600,
};

const cardArraySingle: CardData[] = [cardData];

const cardArray: CardData[] = [
  {
    title: "Thinking Fast and Slow is a very good book",
    type: "READING",
    date: "24th March 2021",
    durationInSec: 6600,
  },
  {
    title: "Thinking Fast and Slow",
    type: "WORK",
    date: "24th March 2021",
    durationInSec: 5600,
  },
];

const typeIconMap = {
  WORK: <BookOpenIcon size="xxs" />,
  READING: <BookmarkIcon size="xxs" />,
};

export const SessionCard = function ({ cardData }: { cardData: CardData }) {
  return (
    <CardHeader className="w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex max-w-56 flex-row items-center space-x-1.5">
          <span className="shrink-0 rounded border bg-slate-900 p-1">
            {typeIconMap[cardData.type]}
          </span>
          {/* TODO: Truncation here does not work property. Currently is controlled with max width which is not optimum. */}
          <CardTitle className="min-w-0 flex-auto truncate text-sm">
            {cardData.title}
          </CardTitle>
        </div>
        <CardDescription className="flex-none text-xs">
          {secondsToMinutes(cardData.durationInSec)} mins
        </CardDescription>
      </div>
    </CardHeader>
  );
};

export const CardStack = function ({ cardArray }: { cardArray: CardData[] }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row items-center space-x-2 text-sm">
        <CalendarIcon size="sm" />
        <div className="font-semibold">{cardArray[0].date}</div>
      </div>
      <Card className="px-2">
        {cardArray.map((card) => (
          <>
            <SessionCard cardData={card} key={cardData.title} />
            <>{cardArray.length > 1 && <Separator />}</>
          </>
        ))}
      </Card>
    </div>
  );
};

export const CardList = function () {
  return (
    <div className="flex flex-col space-y-6">
      <CardStack cardArray={cardArraySingle} />
      <CardStack cardArray={cardArray} />
    </div>
  );
};
