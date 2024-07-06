import { z } from "zod";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { fonts } from "@falcon/lib/fonts";
import { Z_AnalysisSchema } from "@falcon/lib/ai/context/analysis/schema";
import { Analysis } from "@falcon/lib/ai/context/analysis/generate-analysis";
import {
  CheckBadgeIcon,
  CrossIcon,
  EllipsisIcon,
  ExclamationIcon,
  SettingsIcon,
} from "@/components/icons";

const verdictSchema = z.enum(["high", "medium", "low"]);
type Verdict = z.infer<typeof verdictSchema>;

type BadgeType = "positive" | "negative" | "neutral";

interface Badge {
  text: string;
  type: BadgeType;
}

interface BadgeResult {
  topBadges: string[];
  sections: {
    clickbait: Badge;
    expertise: Badge;
    logicalFallacies: Badge;
    bias: Badge;
    news: Badge;
    opinion: Badge;
    contentMarketing: Badge;
    domain: Badge;
  };
}

const determineBadge = (
  analysis: z.infer<typeof Z_AnalysisSchema>,
): BadgeResult => {
  const topBadges: string[] = [];
  const sections: BadgeResult["sections"] = {
    clickbait: { text: "Clickbait", type: "neutral" },
    expertise: { text: "Expertise", type: "neutral" },
    logicalFallacies: { text: "Logical Fallacies", type: "neutral" },
    bias: { text: "Bias", type: "neutral" },
    news: { text: "News", type: "neutral" },
    opinion: { text: "Opinion", type: "neutral" },
    contentMarketing: { text: "Content Marketing", type: "neutral" },
    domain: { text: "Domain", type: "neutral" },
  };

  const determineType = (level: Verdict): BadgeType => {
    switch (level) {
      case "low":
        return "positive";
      case "medium":
        return "neutral";
      case "high":
        return "negative";
    }
  };

  // Determine top badges
  if (analysis.expertiseMismatch.mismatchLevel === "low") {
    topBadges.push("Expertise");
  }
  if (analysis.bias.biasLevel === "low") {
    topBadges.push("Unbiased");
  }
  if (analysis.clickbait.clickBaitLevel === "low") {
    topBadges.push("No Clickbait");
  }
  if (analysis.logicalFallacies.fallaciesLevel === "low") {
    topBadges.push("No Logical Fallacies");
  }

  // Set section badge types
  sections.clickbait.type = determineType(analysis.clickbait.clickBaitLevel);
  sections.expertise.type = determineType(
    analysis.expertiseMismatch.mismatchLevel,
  );
  sections.logicalFallacies.type = determineType(
    analysis.logicalFallacies.fallaciesLevel,
  );
  sections.bias.type = determineType(analysis.bias.biasLevel);

  return { topBadges, sections };
};

const ArticleBadge = ({
  content,
  type,
}: {
  content: string;
  type: "positive" | "negative" | "neutral";
}) => (
  <Badge
    className={cn(
      "bg-emerald-900",
      "rounded px-2 py-1 text-xs font-semibold text-white",
      fonts.serif.lora,
    )}
  >
    {content}
  </Badge>
);

const HeroSection: React.FC<{ badges: string[] }> = ({ badges }) => (
  <section className="flex flex-row flex-wrap gap-2">
    {badges.map((badge) => (
      <ArticleBadge key={badge} content={badge} type="positive" />
    ))}
  </section>
);

interface SectionProps {
  analysis: Analysis;
  badge: Badge;
}

const SectionBadge: React.FC<{ badge: Badge }> = ({ badge }) => {
  const testResult =
    badge.type === "positive"
      ? { result: "Passed", icon: <CheckBadgeIcon size="xs" /> }
      : badge.type === "negative"
        ? { result: "Failed", icon: <ExclamationIcon size="xs" /> }
        : { result: "Gray Area", icon: <EllipsisIcon size="xs" /> };

  const isObservation =
    badge.text === "Domain" ||
    badge.text === "News" ||
    badge.text === "Opinion";

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between p-1 pr-4",
        "border-b text-xs font-semibold text-secondary",
      )}
    >
      <div className="text-primary">{badge.text}</div>
      {!isObservation && (
        <div
          className={cn(
            "flex items-center space-x-2",
            badge.type === "positive"
              ? "text-emerald-700"
              : badge.type === "negative"
                ? "text-red-700"
                : badge.type === "neutral" && isObservation
                  ? "text-transparent"
                  : "text-amber-700",
          )}
        >
          {testResult.icon}
          <div>{testResult.result}</div>
        </div>
      )}
    </div>
  );
};
const ClickbaitSection: React.FC<SectionProps> = ({ analysis, badge }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <p className="text-xs">{analysis.clickbait.comments}</p>
  </section>
);

const ExpertiseSection: React.FC<SectionProps> = ({ analysis, badge }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <Badge
      variant={"outline"}
      className="flex flex-row items-center space-x-2 text-xs text-slate-500"
    >
      <SettingsIcon size={"xxs"} />
      <div>
        This ia an experimental feature, and may sometimes fail to detect the
        author.
      </div>
    </Badge>
    <p className="text-xs">{analysis.expertiseMismatch.comments}</p>
    <p className="text-xs">{analysis.expertiseMismatch.authorName}</p>
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <h2 className="text-xs">Content Domain:</h2>
        <div className="flex space-x-1">
          {analysis.domain.map((domain) => (
            <Badge key={domain} variant="outline" className="text-xs font-thin">
              {domain}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <h2 className="text-xs">Author Experience:</h2>
        <div className="flex space-x-1">
          {analysis.expertiseMismatch.authorExperience.map((experience) => (
            <Badge
              key={experience}
              variant="outline"
              className="text-xs font-thin"
            >
              {experience}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LogicalFallaciesSection: React.FC<SectionProps> = ({
  analysis,
  badge,
}) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <p className="text-xs">{analysis.logicalFallacies.comments}</p>
  </section>
);

const BiasSection: React.FC<SectionProps> = ({ analysis, badge }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <h2 className="text-xs">Political Bias:</h2>
        <div className="text-xs">{analysis.bias["political-bias"]}</div>
      </div>
      <div className="flex items-center space-x-2">
        <h2 className="text-xs">Sensationalism:</h2>
        <div className="text-xs">{analysis.bias.sensationalism}</div>
      </div>
    </div>
  </section>
);

const NewsSection: React.FC<SectionProps> = ({ badge, analysis }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <p className="text-xs">This is a news article.</p>
  </section>
);

const Opinion: React.FC<SectionProps> = ({ badge, analysis }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <p className="pl-2 text-xs">{analysis.opinion.comments}</p>
  </section>
);

const ContentMarketing: React.FC<SectionProps> = ({ badge, analysis }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <p className="pl-2 text-xs">{analysis.contentMarketing.comments}</p>
  </section>
);

const ContentDomain: React.FC<SectionProps> = ({ badge, analysis }) => (
  <section className={cn("flex flex-col space-y-2", fonts.serif.lora)}>
    <SectionBadge badge={badge} />
    <div className="flex space-x-1">
      {analysis.domain.map((domain) => (
        <Badge key={domain} variant="outline" className="text-xs font-thin">
          {domain}
        </Badge>
      ))}
    </div>
  </section>
);

export function ArticleCredibility({
  analysis,
}: {
  analysis: z.infer<typeof Z_AnalysisSchema>;
}) {
  const { topBadges, sections } = useMemo(
    () => determineBadge(analysis),
    [analysis],
  );

  return (
    <div className="flex w-full flex-col space-y-4 p-1 text-muted-foreground">
      {/* <HeroSection badges={topBadges} /> */}

      <ClickbaitSection analysis={analysis} badge={sections.clickbait} />
      {analysis.expertiseMismatch.authorDetected && (
        <ExpertiseSection analysis={analysis} badge={sections.expertise} />
      )}
      <LogicalFallaciesSection
        analysis={analysis}
        badge={sections.logicalFallacies}
      />
      <BiasSection analysis={analysis} badge={sections.bias} />
      {analysis.contentMarketing.isBlatantContentMarketing && (
        <ContentMarketing
          analysis={analysis}
          badge={sections.contentMarketing}
        />
      )}
      <Separator className="bg-primary" />
      <h1 className="font-serif font-bold text-primary">Observations</h1>
      <ContentDomain analysis={analysis} badge={sections.domain} />

      {analysis.news.isNews && (
        <NewsSection analysis={analysis} badge={sections.news} />
      )}
      {analysis.opinion.isOpinion && (
        <Opinion analysis={analysis} badge={sections.opinion} />
      )}
    </div>
  );
}
