import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AllPosts from "./routes/allPosts";
import Post from "./routes/post";
import Root from "./routes/root";
import Signup from "./routes/signup";
import User from "./routes/user"
import CreatePost from "./routes/createPost";
import EditPost from "./routes/editPost";
import DeletePost from "./routes/deletePost";



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
  {
    path: "posts/:postId/edit",
    element: <EditPost />,
  },
  {
    path: "posts/:postId/delete",
    element: <DeletePost />,
  },
  {
    path: "users/:userId",
    element: <User />,
  },
  {
    path: "users/:userId/create",
    element: <CreatePost />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);