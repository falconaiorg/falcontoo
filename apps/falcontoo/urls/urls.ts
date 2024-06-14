// Dragon urls
const root = ``;

export const url = {
  auth: {
    signin: `${root}/auth/sign-in`,
  },
  home: `${root}/home`,
  library: `${root}/library`,
  stats: `${root}/stats`,
  session: {
    home: `${root}/session`,
    create: `${root}/session/create`,
    edit: `${root}/session/edit`,
    view: `${root}/session/view`,
  },
  reader: {
    read: ({ articleId }: { articleId: string }) => `${root}/read/${articleId}`,
  },
};
