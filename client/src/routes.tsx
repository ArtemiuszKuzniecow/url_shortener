import * as React from "react";
import { Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";

export const routes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return [
      {
        path: "/links",
        element: <LinksPage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "*",
        element: <Navigate to="/create" />,
      },
    ];
  } else {
    return [
      {
        path: "/",
        element: <AuthPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ];
  }
};
