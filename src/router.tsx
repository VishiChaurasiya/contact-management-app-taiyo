import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/pages/Root";
import Contacts from "@/pages/Contacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Contacts />,
      },
      // {
      //   path: "contact",
      //   element: <ContactPage />,
      // },
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "*",
      //   element: <NotFound />, // Handle 404 routes
      // },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
