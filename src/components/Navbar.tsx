import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="shadow-md h-16 flex items-center justify-between px-5 py-3 bg-white dark:bg-gray-800">
      <Link to="/" className="md:absolute">
        <img
          src="https://taiyo.ai/wp-content/uploads/Taiyo-logo.png"
          alt="taiyo.ai"
          className="w-28"
        />
      </Link>
      <div className="hidden md:flex flex-grow justify-center gap-6">
        <Link
          to="/"
          className={cn(
            "text-lg font-medium hover:scale-110 transition duration-200 ease-in-out",
            location.pathname === "/" && "underline underline-offset-4"
          )}
        >
          Contacts
        </Link>
        <Link
          to="/charts-and-maps"
          className={cn(
            "text-lg font-medium hover:scale-110 transition duration-200 ease-in-out",
            location.pathname === "/charts-and-maps" &&
              "underline underline-offset-4"
          )}
        >
          Charts & Maps
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 w-[200px] p-4">
            <Link
              to="/"
              className={cn(
                "text-lg font-medium hover:underline",
                location.pathname === "/" && "underline underline-offset-4"
              )}
            >
              Contacts
            </Link>
            <Link
              to="/charts-and-maps"
              className={cn(
                "text-lg font-medium hover:scale-110 transition duration-200 ease-in-out",
                location.pathname === "/charts-and-maps" &&
                  "underline underline-offset-4"
              )}
            >
              Charts & Maps
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
