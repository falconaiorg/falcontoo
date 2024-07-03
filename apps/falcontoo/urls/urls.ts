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
  session: {
    create: ({ duration }: { duration: string }) =>
      `${root}/session/create/${duration}`,
    read: ({ sessionId }: { sessionId: string }) =>
      `${root}/session/read/${sessionId}`,
  },
  reader: {
    read: ({ articleId }: { articleId: string }) => `${root}/read/${articleId}`,
  },
};
