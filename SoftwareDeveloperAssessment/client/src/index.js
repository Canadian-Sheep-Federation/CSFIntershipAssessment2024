import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Reviews from "./modules/Reviews";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/reviews", element: <Reviews /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
