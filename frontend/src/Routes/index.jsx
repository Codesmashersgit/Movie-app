import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../Pages/Home";
import ExplorePage from "../Pages/ExplorePage";
import DetailsPage from "../Pages/DetailsPage";
import SearchPage from "../Pages/SearchPage";

import Login from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";
import AdminController from "../Pages/AdminController"
import AdminRoute from "./adminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // ✅ AUTH ROUTES
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // ✅ MOVIE ROUTES
      {
        path: "explore/:explore",
        element: <ExplorePage />,
      },
      {
        path: ":explore/:id",
        element: <DetailsPage />,
      },

      // ✅ SEARCH
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "admincontroller",
        element: (
    <AdminRoute>
      <AdminController />
    </AdminRoute>
  ),
      },
    ],
  },
]);

export default router;
