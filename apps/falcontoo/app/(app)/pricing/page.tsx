"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuCheckCircle2 as CheckCircle2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="pt-1 text-xl">{subtitle}</p>
    <br />
  </section>
);

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="mx-auto w-40" onValueChange={onSwitch}>
    <TabsList className="px-2 py-6">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => (
  <Card
    className={cn(
      `flex w-72 flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`,
      {
        "animate-background-shine bg-white bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
          exclusive,
      },
    )}
  >
    <div>
      <CardHeader className="pb-8 pt-4">
        {isYearly && yearlyPrice && monthlyPrice ? (
          <div className="flex justify-between">
            <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
              {title}
            </CardTitle>
            <div
              className={cn(
                "h-fit rounded-xl bg-zinc-200 px-2.5 py-1 text-sm text-black dark:bg-zinc-800 dark:text-white",
                {
                  "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ":
                    popular,
                },
              )}
            >
              Save ${monthlyPrice * 12 - yearlyPrice}
            </div>
          </div>
        ) : (
          <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
            {title}
          </CardTitle>
        )}
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">
            {yearlyPrice && isYearly
              ? "$" + yearlyPrice
              : monthlyPrice
                ? "$" + monthlyPrice
                : "Custom"}
          </h3>
          <span className="mb-1 flex flex-col justify-end text-sm">
            {yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}
          </span>
        </div>
        <CardDescription className="h-12 pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
      <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-white dark:text-black">
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
        {actionLabel}
      </Button>
    </CardFooter>
  </Card>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);

export default function Page() {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  const plans = [
    // {
    //   title: "Basic",
    //   monthlyPrice: 5,
    //   yearlyPrice: 50,
    //   description: "Essential features you need to get started",
    //   features: [
    //     "Example Feature Number 1",
    //     "Example Feature Number 2",
    //     "Example Feature Number 3",
    //   ],
    //   actionLabel: "Get Started",
    // },
    {
      title: "Pro",
      monthlyPrice: 10,
      yearlyPrice: 100,
      description: "Spend less time browsing and more time reading.",
      features: [
        "Ad-Free Reading",
        "Clickbait Detection",
        "News Summarization",
        "Article to Podcast",
        "Reading Assistant",
        "Public Reading Profile",
      ],
      actionLabel: "Coming Soon",
      exclusive: true,
    },
    // {
    //   title: "Enterprise",
    //   price: "Custom",
    //   description: "Dedicated support and infrastructure to fit your needs",
    //   features: [
    //     "Example Feature Number 1",
    //     "Example Feature Number 2",
    //     "Example Feature Number 3",
    //     "Super Exclusive Feature",
    //   ],
    //   actionLabel: "Contact Sales",
    //   exclusive: true,
    // },
  ];
  return (
    <div className="py-8">
      <PricingHeader title="Lex" subtitle="Built for serious readers" />
      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />;
        })}
      </section>
    </div>
  );
}
