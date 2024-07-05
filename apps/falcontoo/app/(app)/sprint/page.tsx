"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { url } from "@/urls";
import { api } from "@falcon/trpc/next/client";
import { format } from "date-fns";
import Link from "next/link";

export default function Sprint() {
  const [sprints] = api.sprint.getUserSprints.useSuspenseQuery();
  if (!sprints || sprints.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="mb-4">No sprints available</p>
        <Link href={url.sprint.create({ duration: 15 })}>
          <Button>Create New Sprint</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 pb-64 md:grid-cols-2 lg:grid-cols-3">
      {sprints.map((sprint) => (
        <Card key={sprint.id} className="w-full">
          <CardHeader>
            <CardTitle>Sprint ID: {sprint.id}</CardTitle>
            <CardDescription>Status: {sprint.status}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Started At:{" "}
              {sprint.startedAt
                ? format(new Date(sprint.startedAt), "PPpp")
                : "Not started yet"}
            </p>
            <p>
              Completed At:{" "}
              {sprint.completedAt
                ? format(new Date(sprint.completedAt), "PPpp")
                : "Not completed yet"}
            </p>
            <p>
              Duration:{" "}
              {sprint.duration ? `${sprint.duration} ms` : "Not available"}
            </p>
          </CardContent>
          <CardFooter>
            <button className="btn btn-primary">View Details</button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
