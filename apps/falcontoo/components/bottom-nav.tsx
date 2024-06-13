"use client";
import {
  BookmarkIcon,
  AIMagicIcon,
  UserIcon,
  PieChartIcon,
} from "@/components/icons";
import { url } from "@/urls";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { vibrate } from "@falcon/lib/vibrate";
import { Link } from "next-view-transitions";

type NavbarSegments = "home" | "notes" | "profile";

const bottomNavConfig = [
  { href: url.home, Icon: AIMagicIcon, text: "Home", segment: "home" },
  {
    href: url.library,
    Icon: BookmarkIcon,
    text: "Library",
    segment: "library",
  },
  {
    href: url.stats,
    Icon: PieChartIcon,
    text: "Stats",
    segment: "stats",
  },
] as const;

export const BottomNav = () => {
  const router = useRouter();
  const layoutSegment = useSelectedLayoutSegment() as NavbarSegments;

  useEffect(() => {
    router.prefetch(url.home);
    router.prefetch(url.library);
    router.prefetch(url.stats);
  }, [router]);

  return (
    <div className="fixed bottom-0 z-40 w-full bg-background shadow-md">
      <motion.div layout className="flex items-end justify-around py-2">
        {bottomNavConfig.map(({ href, Icon, text, segment }) => {
          const isSelected = layoutSegment === segment;
          return (
            <Link
              onClick={!isSelected ? () => vibrate() : undefined}
              key={href}
              href={href}
              className={cn(
                "relative flex min-w-24 flex-col items-center px-3 py-1",
                {
                  "text-primary": isSelected,
                  "text-slate-600": !isSelected,
                },
              )}
            >
              <div className="flex flex-col items-center space-y-0.5">
                <div
                  className={cn("rounded-full p-1.5", {
                    "bg-primary-foreground/50": !isSelected,
                  })}
                >
                  <Icon
                    size={
                      cn({
                        sm: isSelected,
                        xs: !isSelected,
                      }) as any
                    }
                  />
                </div>
                <span className="text-xs">{text}</span>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeNavItem"
                  className="absolute inset-0 -z-10 rounded-full bg-primary-foreground"
                  transition={{ duration: 0.2 }}
                ></motion.div>
              )}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
