import { Separator } from "@/components/ui/separator";
import { TestOverflow } from "@/components/ui/test/test-overflow";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { StarIcon } from "@/components/icons";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const user = {
  name: "Prashant Bhudwal",
  username: "prashantbhudwal",
  bio: "I am a software engineer who loves to build things.",
  avatar: "https://avatars.githubusercontent.com/u/1967350?v=4",
  twitter: "https://twitter.com/prashantbhudwal",
};

const articles = [
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    readingTime: 10,
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 2,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 2,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    readingTime: 10,
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    readingTime: 10,
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
  {
    title: "How to build a fullstack app with Next.js, Prisma, and PostgreSQL",
    slug: "how-to-build-a-fullstack-app-with-nextjs-prisma-and-postgresql",
    date: "2021-10-10",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4,
  },
];

export default async function Journey({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const { user: sessionUser } = await getServerComponentSession();

  return (
    <div className="flex w-full flex-col items-center">
      <section className="relative flex w-full max-w-4xl flex-col space-y-5 p-4">
        <header className="sticky top-0 flex flex-col space-y-4 bg-background pt-12">
          <div className="flex flex-col space-y-1">
            <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.bio}</p>
          </div>
          <Separator />
        </header>
        <section className="flex max-w-2xl flex-col space-y-2 bg-background">
          {articles.map((article) => (
            <Card key={article.slug} className="max-w-xl border-none px-0">
              <CardHeader className="px-0">
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row space-x-8 px-0">
                <CardDescription className="flex flex-row items-center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      size="sm"
                      color={index < article.rating ? "primary" : "secondary"}
                    />
                  ))}
                </CardDescription>
                <CardDescription>{article.date}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
      </section>
    </div>
  );
}
