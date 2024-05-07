"use server";
import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
const turndownService = new TurndownService();
import TurndownService from "turndown";

export async function fetchArticle(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const reader = new Readability(document);
  const article = reader.parse();
  if (article?.content) return turndownService.turndown(article?.content);
  return null;
}
