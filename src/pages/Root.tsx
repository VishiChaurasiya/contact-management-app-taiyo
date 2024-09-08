import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="px-5 py-3 flex flex-col flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
