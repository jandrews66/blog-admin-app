import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./routes/allPosts";
import Post from "./routes/post";
import Signup from "./routes/signup";
import User from "./routes/user"
import CreatePost from "./routes/createPost";
import EditPost from "./routes/editPost";
import DeletePost from "./routes/deletePost";
import Layout from './routes/components/Layout'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "posts",
        element: <AllPosts />,
      },
      {
        path: "posts/create",
        element: <CreatePost />,
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
    ]
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);