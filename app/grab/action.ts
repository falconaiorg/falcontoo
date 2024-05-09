"use server";
import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import Showdown from "showdown";

export async function fetchArticle(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const reader = new Readability(document);
  const article = reader.parse();
  const htmlSting = article?.content;
  console.log(htmlSting);
  const htmlNewDom = new JSDOM(htmlSting);
  console.log(htmlNewDom);
  const newDocument = htmlNewDom.window.document;
  console.log(newDocument);
  const convertor = new Showdown.Converter();
  if (htmlSting) {
    const markdown = convertor.makeMarkdown(htmlSting, newDocument);
    console.log(markdown);
    return markdown;
  }
  return null;
}
