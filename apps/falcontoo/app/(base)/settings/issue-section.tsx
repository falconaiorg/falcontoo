"use client";
import { fonts } from "@falcon/lib/fonts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONSTANTS } from "@falcon/lib/constants";
import { cn } from "@/lib/utils";
import { ReportIssue } from "./issue-form";
import Link from "next/link";
const lora = fonts.serif.lora;

export const IssueSection = () => {
  return (
    <Dialog>
      <section className="flex flex-col space-y-3">
        <p className={cn("", lora)}>
          If you are facing an issue, or have a request, email us at{" "}
          <Link
            href={`mailto ${CONSTANTS.helpEmail}`}
            className="underline decoration-cyan-400"
          >
            {CONSTANTS.helpEmail}
          </Link>
          {/* <DialogTrigger
            className={cn("inline-flex text-base underline", lora)}
          >
            here.
          </DialogTrigger>{" "} */}
          {/* Or, you can directly email us{" "}
          <Link href={`mailto:${email}`} className="underline">
            here.
          </Link> */}
        </p>
        <DialogContent className="w-11/12">
          <DialogHeader className="pb-3">
            <DialogTitle>Help us, help you.</DialogTitle>
          </DialogHeader>
          <ReportIssue />
        </DialogContent>
      </section>
    </Dialog>
  );
};
