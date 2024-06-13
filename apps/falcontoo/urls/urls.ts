// Dragon urls
const root = ``;

export const url = {
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
