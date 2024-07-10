import metascraper from "metascraper";
import metascraperUrl from "metascraper-url";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperAuthor from "metascraper-author";
import metascraperPublisher from "metascraper-publisher";
import metascraperDate from "metascraper-date";
import metascraperImage from "metascraper-image";
import fetch from "node-fetch";

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
  const response = await fetch(url);
  const html = await response.text();
  const metadata = await metascraperSetup({ html, url });
  return metadata;
};
