"use server";
import crypto from "crypto";
import prisma from ".";
import { auth } from "@/auth";

export type SeedReturn = {
  message: string;
};

export async function seedDb(): Promise<SeedReturn> {
  const session = await auth();
  const userId = session?.user?.id;
  const articles = [
    {
      title: "The Rise of AI",
      description: "An article about the rise of artificial intelligence.",
      url: "https://example.com/rise-of-ai",
      rawHTML: "<p>The rise of AI...</p>",
      content: "The rise of AI has been remarkable over the past decade...",
      parsedChecksum: crypto
        .createHash("sha256")
        .update("The rise of AI has been remarkable over the past decade...")
        .digest("hex"),
      thumbnail: "https://example.com/thumbnails/rise-of-ai.png",
    },
    {
      title: "Quantum Computing",
      description: "Understanding the basics of quantum computing.",
      url: "https://example.com/quantum-computing",
      rawHTML: "<p>Quantum computing is...</p>",
      content:
        "Quantum computing is a type of computation that takes advantage of quantum mechanics...",
      parsedChecksum: crypto
        .createHash("sha256")
        .update(
          "Quantum computing is a type of computation that takes advantage of quantum mechanics...",
        )
        .digest("hex"),
      thumbnail: "https://example.com/thumbnails/quantum-computing.png",
    },
    {
      title: "The Future of Blockchain",
      description:
        "Exploring the future applications of blockchain technology.",
      url: "https://example.com/future-of-blockchain",
      rawHTML: "<p>The future of blockchain...</p>",
      content:
        "Blockchain technology has the potential to revolutionize many industries...",
      parsedChecksum: crypto
        .createHash("sha256")
        .update(
          "Blockchain technology has the potential to revolutionize many industries...",
        )
        .digest("hex"),
      thumbnail: "https://example.com/thumbnails/future-of-blockchain.png",
    },
    {
      title: "Advancements in Renewable Energy",
      description: "Recent advancements in renewable energy technologies.",
      url: "https://example.com/renewable-energy",
      rawHTML: "<p>Renewable energy advancements...</p>",
      content:
        "Recent advancements in renewable energy technologies have made them more efficient and cost-effective...",
      parsedChecksum: crypto
        .createHash("sha256")
        .update(
          "Recent advancements in renewable energy technologies have made them more efficient and cost-effective...",
        )
        .digest("hex"),
      thumbnail: "https://example.com/thumbnails/renewable-energy.png",
    },
    {
      title: "The Impact of Social Media",
      description: "How social media is impacting our daily lives.",
      url: "https://example.com/social-media-impact",
      rawHTML: "<p>The impact of social media...</p>",
      content:
        "Social media has significantly impacted our daily lives in various ways...",
      parsedChecksum: crypto
        .createHash("sha256")
        .update(
          "Social media has significantly impacted our daily lives in various ways...",
        )
        .digest("hex"),
      thumbnail: "https://example.com/thumbnails/social-media-impact.png",
    },
  ];

  try {
    for (const article of articles) {
      await prisma.article.create({
        data: {
          ...article,
          rawChecksum: crypto
            .createHash("sha256")
            .update(article.rawHTML)
            .digest("hex"),
          user: { connect: { id: userId } },
        },
      });
    }

    return { message: "Database seeded successfully!" };
  } catch (error) {
    console.log(error);
    throw new Error(`Error seeding database`);
  }
}
