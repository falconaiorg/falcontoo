"use client";
import { TestOverflow } from "@/components/ui/test/test-overflow";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Article } from "@falcon/prisma/client";
import { useState } from "react";
import { rag } from "@falcon/lib/ai/rag";
import { api } from "../_trpc";

const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export function Embed({ article }: { article: Article }) {
  const [response, setResponse] = useState<string>("");

  return <>{response}</>;
}
