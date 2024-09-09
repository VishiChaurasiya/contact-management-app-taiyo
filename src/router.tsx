import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/pages/Root";
import Contacts from "@/pages/Contacts";
import ChartsAndMaps from "./pages/ChartsAndMaps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Contacts />,
      },
      {
        path: "charts-and-maps",
        element: <ChartsAndMaps />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
