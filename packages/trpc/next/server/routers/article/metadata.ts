import metascraper from "metascraper";
import metascraperUrl from "metascraper-url";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperAuthor from "metascraper-author";
import metascraperPublisher from "metascraper-publisher";
import metascraperDate from "metascraper-date";
import metascraperImage from "metascraper-image";
import fetch from "node-fetch";
import { TRPCError } from "@trpc/server";

const metascraperSetup = metascraper([
  metascraperUrl(),
  metascraperTitle(),
  metascraperDescription(),
  metascraperAuthor(),
  metascraperPublisher(),
  metascraperDate({ datePublished: true }),
  metascraperImage(),
]);

export const scrapeMetadata = async ({ url }: { url: string }) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Failed to fetch URL: ${url} with status: ${response.status}`,
      });
    }
    const html = await response.text();
    const metadata = await metascraperSetup({ html, url });
    return metadata;
  } catch (error) {
    if (error instanceof TRPCError) {
      throw error;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `An unexpected error occurred while processing the URL: ${url}`,
      });
    }
  }
};
