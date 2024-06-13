import Link from "next/link";
import { testArticles } from "../library/test-article";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { auth, getServerComponentSession } from "@falcon/lib/next-auth";
import { DracoTest } from "./test";
import { Return } from "@prisma/client/runtime/library";

async function getRoot(
  sessionToken: string | undefined,
  csrfToken: string | undefined,
) {
  try {
    const response = await axios.get("http://localhost:8000", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "X-CSRF-Token": csrfToken,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error making GET request: ${error}`);
  }
}

export type NextCookies = ReturnType<typeof cookies>;

export default async function NotesPage() {
  const session = await getServerComponentSession();
  console.log("Session");
  console.log(session);
  const requestHeaders = headers();
  const testCookies = cookies();
  console.log(testCookies);
  const sessionToken = testCookies.get("next-auth.session-token")?.value;
  const all = testCookies.getAll();
  all.forEach((cookie) => {
    console.log(cookie);
  });

  const csrfToken = testCookies
    .get("next-auth.csrf-token")
    ?.value?.split("|")[0];

  console.log(`Session token: ${sessionToken}`);
  console.log(`CSRF token: ${csrfToken}`);

  const token = requestHeaders.get("cookie")?.split(" ")[1]; // Extract the token from the authorization header
  console.log(`Received a request with JWT: ${token}`);
  console.log(requestHeaders);
  console.log("NotesPage");

  const root = await getRoot(sessionToken, csrfToken);
  console.log(root);
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
          <DracoTest />
        </Link>
      ))}
    </div>
  );
}
