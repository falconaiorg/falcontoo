import prisma from "@/prisma";
import { getServerComponentSession } from "@/auth";

const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export default async function TestingPage() {
  const { user } = await getServerComponentSession();
  const testArticle = "clwc653nl001clgw1u0funwqt";

  // const article = await prisma.article.findFirst({
  //   where: {
  //     user: {
  //       some: {
  //         id: user.id,
  //       },
  //     },
  //   },
  // });

  const article = await prisma.article.findUnique({
    where: {
      id: testArticle,
    },
  });

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <>nothing</>
    // <>
    //   <Embed article={article} />
    // </>
    // <div
    //   className={cn({
    //     "select-none": hasSelection,
    //   })}
    // >
    //   {hasSelection ? (
    //     <div key="base">{aiText}</div>
    //   ) : (
    //     <div key="swapped">{aiText}</div>
    //   )}
    //   <AnnotationDrawer />
    // </div>
  );
}
