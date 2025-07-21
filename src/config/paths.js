export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo) =>
        redirectTo
          ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
          : "/login",
    },
    register: {
      path: "/register",
      getHref: (redirectTo) =>
        redirectTo
          ? `/register?redirectTo=${encodeURIComponent(redirectTo)}`
          : "/register",
    },
  },

  notes: {
    list: {
      path: "/notes",
      getHref: () => "/notes",
    },
    create: {
      path: "/notes/new",
      getHref: () => "/notes/new",
    },
    detail: {
      path: "/notes/:id",
      getHref: (id) => `/notes/${id}`,
    }
  },

  notFound: {
    path: "*",
    getHref: () => "*",
  },
};
