import { cn } from "@/lib/utils";
import { fonts } from "@falcon/lib/fonts";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import Link from "next/link";
import { SignOut } from "@/components/auth/sign-out";
import { roadmap, updateLog } from "@/app/roadmap";
import { CONSTANTS } from "@falcon/lib/constants";
import { getFirstName } from "@falcon/lib/utils";
import { Separator } from "@/components/ui/separator";

const { crimsonPro, lora } = fonts.serif;

const email = "www.prashant@falconai.in";

export default async function SettingsPage() {
  const { user } = await getServerComponentSession();
  if (!user) {
    return null;
  }
  const firstName = getFirstName(user.name);
  return (
    <div className="flex h-full flex-col space-y-8 overflow-y-auto px-6 py-10 pb-32 text-slate-300 scrollbar-thin">
      <section className="flex flex-col space-y-3">
        <h1 className={cn("text-3xl", crimsonPro)}>Hello, {firstName}!</h1>
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
        <h1 className={cn("text-3xl font-thin text-green-500", crimsonPro)}>Roadmap</h1>
        <Separator />
        <div className={cn("flex flex-col space-y-4", lora)}>
          <div className="flex flex-col space-y-1">
            <h2 className={cn("text-xl text-green-600", crimsonPro)}>
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
            <h2 className={cn("text-xl text-green-600", crimsonPro)}>
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
          <div className="flex flex-col space-y-1">
            <h2 className={cn("text-xl text-green-600", crimsonPro)}>
              Known Issues
            </h2>
            <div className="flex flex-col space-y-1">
              {roadmap.issues.map((item) => (
                <p className={cn(lora)} key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col space-y-3">
        <h1 className={cn("text-3xl font-thin text-blue-500", crimsonPro)}>Update Log</h1>
        <Separator />
        <div className={cn("flex flex-col space-y-4", lora)}>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col space-y-3">
              {updateLog.map((item) => (
                <div
                  className={cn("flex flex-col space-y-1", lora)}
                  key={item.date}
                >
                  <h2 className={cn("text-xl text-blue-600", crimsonPro)}>
                    {item.date}
                  </h2>
                  <div className="flex flex-col space-y-1">
                    {item.changes.map((change) => (
                      <div
                        key={change.title + change.description}
                        className={lora}
                      >
                        <p className={cn("text-slate-300")}>{change.title}</p>
                        <p className={cn("pl-3 text-sm text-slate-400")}>
                          {change.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
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
