// Dragon urls
const root = ``;

export const url = {
  home: `${root}/home`,
  notes: `${root}/notes`,
  profile: `${root}/profile`,
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
