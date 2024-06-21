import { cn } from "@/lib/utils";
import { fonts } from "@falcon/lib/fonts";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import Link from "next/link";
import { ReportIssue } from "./issue-form";
import { Separator } from "@/components/ui/separator";
import { SignOut } from "@/components/auth/sign-out";
import { InstallButton } from "./install-btn";
import { IssueSection } from "./issue-section";

const { crimsonPro, lora } = fonts.serif;

const getFirstName = (name: string | null) => {
  if (!name) {
    return "";
  }
  return name.split(" ")[0];
};

const email = "www.prashant@falconai.in";

const steps = [
  "Log in from Chrome",
  "Click on the profile icon",
  "Click on Settings",
  "Click on Install App",
];

export default async function SettingsPage() {
  const { user } = await getServerComponentSession();
  if (!user) {
    return null;
  }
  const firstName = getFirstName(user.name);
  return (
    <div className="flex h-full flex-col space-y-10 px-6 py-10 text-slate-300">
      <section className="flex flex-col space-y-3">
        <h1 className={cn("text-3xl font-thin", crimsonPro)}>
          Hello, {firstName}!
        </h1>
        <p className={cn(lora)}>Your wish, is our command.</p>
      </section>
      <IssueSection />
      <section className="flex flex-col space-y-3">
        {/* <InstallButton /> */}
        <SignOut variant={"destructive"} />
      </section>
    </div>
  );
}
