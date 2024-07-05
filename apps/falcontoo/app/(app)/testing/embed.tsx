"use client";

import { Article } from "@falcon/prisma/client";
import { useState } from "react";

const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export function Embed({ article }: { article: Article }) {
  const [response, setResponse] = useState<string>("");

  return <>{response}</>;
}
