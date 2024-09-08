import Root from "@/pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // children: [
    //   {
    //     path: "",
    //     element: <Home />,
    //   },
    //   {
    //     path: "contact",
    //     element: <ContactPage />,
    //   },
    //   {
    //     path: "dashboard",
    //     element: <Dashboard />,
    //   },
    //   {
    //     path: "*",
    //     element: <NotFound />, // Handle 404 routes
    //   },
    // ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
