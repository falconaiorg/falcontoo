import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { url } from "@/urls";
import Link from "next/link";
import { RoundButton } from "./session-button";

export type SprintDuration = number;

const sessions = [
  { title: "Session 1", duration: 5 },
  { title: "Session 2", duration: 15 },
  { title: "Session 3", duration: 30 },
];

export const StartSprint = () => (
  <Card>
    <CardHeader>
      <CardTitle>Reading Sprint</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex justify-around">
        {sessions.map((session) => (
          <Link
            href={url.sprint.create({ duration: session.duration })}
            key={session.title}
          >
            <RoundButton>{session.duration} Min</RoundButton>
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);
