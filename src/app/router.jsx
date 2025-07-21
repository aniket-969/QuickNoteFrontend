import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner} from "../components/ui/spinner.jsx"
import { paths } from "../config/paths.js"
import { ProtectedRoute } from "../lib/ProtectedRoute.jsx";
import {ErrorBoundary as AppRootErrorBoundary} from "../components/appLayout.jsx"
import React from "react";
import { HomeRedirector } from "./routes/home.jsx";

function convert(queryClient) {
  return (module) => {
    const { clientLoader, clientAction, default: Component, ...rest } = module;
    return {
      ...rest,
      loader: clientLoader ? clientLoader(queryClient) : undefined,
      action: clientAction ? clientAction(queryClient) : undefined,
      Component,
    };
  };
}

export function createAppRouter(queryClient) {
  const c = convert(queryClient);

  return createBrowserRouter(
    [
      // Public routes
      {
        path: paths.home.path,
        element: <HomeRedirector />,
        
      },
      {
        path: paths.auth.register.path,
        lazy: () => import("./routes/auth/register").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
      {
        path: paths.auth.login.path,
        lazy: () => import("./routes/auth/login").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },

      // Protected /app routes
   {
        element: <ProtectedRoute />,
        children: [
          {
            path: paths.notes.list.path,
            lazy: () => import("./routes/app/notes/NotesPage.jsx").then(c),
            hydrateFallbackElement: <Spinner />,
          },
          {
            path: paths.notes.create.path,
            lazy: () => import("./routes/app/notes/CreateNotes.jsx").then(c),
            hydrateFallbackElement: <Spinner />,
          },
          {
            path: paths.notes.detail.path,
            lazy: () => import("./routes/app/notes/NoteDetail.jsx").then(c),
            hydrateFallbackElement: <Spinner />,
          },
        ],
      },

      // Catch-all 404
      {
        path: "*",
        lazy: () => import("./routes/not-found").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner />
          </div>
        ),
      },
    ],
    {
      future: { v7_partialHydration: true },
    }
  );
}

export function AppRouter() {
  const queryClient = useQueryClient();
  const router = React.useMemo(
    () => createAppRouter(queryClient),
    [queryClient]
  );
  return <RouterProvider router={router} />;
}
