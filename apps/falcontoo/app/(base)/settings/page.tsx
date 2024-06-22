import { cn } from "@/lib/utils";
import { fonts } from "@falcon/lib/fonts";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import Link from "next/link";
import { SignOut } from "@/components/auth/sign-out";
import { roadmap } from "@/app/roadmap";
import { CONSTANTS } from "@falcon/lib/constants";

const { crimsonPro, lora } = fonts.serif;

const getFirstName = (name: string | null) => {
  if (!name) {
    return "";
  }
  return name.split(" ")[0];
};

const email = "www.prashant@falconai.in";

export default async function SettingsPage() {
  const { user } = await getServerComponentSession();
  if (!user) {
    return null;
  }
  const firstName = getFirstName(user.name);
  return (
    <div className="flex h-full flex-col space-y-8 overflow-y-auto px-6 py-10 text-slate-300">
      <section className="flex flex-col space-y-3">
        <h1 className={cn("text-3xl font-thin", crimsonPro)}>
          Hello, {firstName}!
        </h1>
        <p className={cn(lora)}>Your wish, is our command.</p>
        <p className={cn(lora)}>
          {`If you face any issues or have any suggestions, feel free to to react
          out to us at`}{" "}
          <Link
            href={`mailto ${CONSTANTS.helpEmail}`}
            className="underline decoration-cyan-400"
          >
            {CONSTANTS.helpEmail}.
          </Link>
          <br />
          <br />
          {"Here's what is in store for you:"}
        </p>
      </section>
      <section className="flex flex-col space-y-3">
        <h1 className={cn("text-3xl font-thin", crimsonPro)}>Roadmap</h1>
        <div className={cn("flex flex-col space-y-4", lora)}>
          <div className="flex flex-col space-y-1">
            <h2 className={cn("text-xl text-green-500", crimsonPro)}>
              In 1 Day
            </h2>
            <div className="flex flex-col space-y-1">
              {roadmap.now.map((item) => (
                <p className={cn(lora)} key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className={cn("text-xl text-orange-500", crimsonPro)}>
              In 1 Week
            </h2>
            <div className="flex flex-col space-y-1">
              {roadmap.soon.map((item) => (
                <p className={cn(lora)} key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className={cn("text-xl text-sky-500", crimsonPro)}>
              In 1 Month
            </h2>
            <div className="flex flex-col space-y-1">
              {roadmap.later.map((item) => (
                <p className={cn(lora)} key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col space-y-3">
        <SignOut variant={"destructive"} />
      </section>
    </div>
  );
}
