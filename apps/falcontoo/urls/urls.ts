import { SprintDuration } from "@/app/(base)/home/start-sprint";

// Dragon urls
const root = ``;

export const url = {
  auth: {
    signin: `${root}/auth/sign-in`,
  },
  home: `${root}/home`,
  library: `${root}/library`,
  stats: `${root}/stats`,
  settings: `${root}/settings`,
  sprint: {
    allSprints: `${root}/sprint`,
    create: ({ duration }: { duration: SprintDuration }) =>
      `${root}/sprint/create/${duration}`,
    read: ({ sprintId }: { sprintId: string }) =>
      `${root}/sprint/read/${sprintId}`,
  },
  reader: {
    read: ({ articleId }: { articleId: string }) => `${root}/read/${articleId}`,
  },
};
