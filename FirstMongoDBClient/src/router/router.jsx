import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Users from "../components/Users";
import MainLayout from "../components/MainLayout";
import UpdateDetailes from "../components/UpdateDetailes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/users",
        element: <Users />,
        loader: () => fetch("http://localhost:5000/users"),
      },
      {
        path: "/update/:id",
        element: <UpdateDetailes />,
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
      },
    ],
  },
]);

export default router;
