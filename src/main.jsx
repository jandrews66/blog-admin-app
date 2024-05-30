import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AllPosts from "./routes/allPosts";
import Post from "./routes/post";
import Root from "./routes/root";
import Signup from "./routes/signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "posts",
    element: <AllPosts />,
  },
  {
    path: "posts/:postId",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);