import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";


import Timeline from "../pages/Timeline";
import Kanban from "../pages/Kanban";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <Timeline /> },
  { path: "/contact", element: <Kanban /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
