import Link from "next/link";
import { testArticles } from "../home/test-article";
import { Button } from "@/components/ui/button";

export default async function NotesPage() {
  return (
    <div className="px-4 py-2">
      {testArticles.map((article) => (
        <Link
          key={article.url}
          href={{
            pathname: "/grab",
            query: {
              url: article.url,
              title: article.title,
              text: article.text,
            },
          }}
        >
          <Button>{article.title}</Button>
        </Link>
      ))}
    </div>
  );
}
