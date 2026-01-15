import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Homepage from "./Homepage";

export default function AppLayout() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen">
      <Navbar /> {/* Keep Homepage always mounted, only hide/show */}
      <div className={location.pathname === "/" ? "block" : "hidden"}>
        <Homepage />
      </div>
      <Outlet />
    </div>
  );
}
