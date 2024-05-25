"use server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitMarkdown = async () => {
  const markdownText = `
# 🦜️🔗 LangChain

⚡ Building applications with LLMs through composability ⚡

## Quick Install

\`\`\`bash
# Hopefully this code block isn't split
pip install langchain
\`\`\`

As an open-source project in a rapidly developing field, we are extremely open to contributions.
`;

  const mdSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 60,
    chunkOverlap: 0,
  });
  const mdDocs = await mdSplitter.createDocuments([markdownText]);

  return mdDocs;
};

const splitLatex = async () => {
  const latexText = `
\documentclass{article}

\begin{document}

\maketitle

\section{Introduction}
Large language models (LLMs) are a type of machine learning model that can be trained on vast amounts of text data to generate human-like language. In recent years, LLMs have made significant advances in a variety of natural language processing tasks, including language translation, text generation, and sentiment analysis.

\subsection{History of LLMs}
The earliest LLMs were developed in the 1980s and 1990s, but they were limited by the amount of data that could be processed and the computational power available at the time. In the past decade, however, advances in hardware and software have made it possible to train LLMs on massive datasets, leading to significant improvements in performance.

\subsection{Applications of LLMs}
LLMs have many applications in industry, including chatbots, content creation, and virtual assistants. They can also be used in academia for research in linguistics, psychology, and computational linguistics.

\end{document}
`;

  const latexSplitter = RecursiveCharacterTextSplitter.fromLanguage("latex", {
    chunkSize: 60,
    chunkOverlap: 0,
  });
  const latexDocs = await latexSplitter.createDocuments([latexText]);

  return latexDocs;
};

// Code Splitting

const splitCode = async ({
  language,
  code,
}: {
  language: SupportedLanguage;
  code: string;
}) => {
  const jsSplitter = RecursiveCharacterTextSplitter.fromLanguage(language, {
    chunkSize: 60,
    chunkOverlap: 0,
  });
  const jsDocs = await jsSplitter.createDocuments([code]);

  return jsDocs;
};

type SupportedLanguage =
  | "html"
  | "cpp"
  | "go"
  | "java"
  | "js"
  | "php"
  | "proto"
  | "python"
  | "rst"
  | "ruby"
  | "rust"
  | "scala"
  | "swift"
  | "markdown"
  | "latex"
  | "sol";
