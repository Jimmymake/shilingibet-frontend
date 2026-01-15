// Casino.jsx (used as layout)
import { Outlet } from "react-router-dom";

export default function CasinoLayout() {
  return (
    <div className="text-textColor ">
      <Outlet />
    </div>
  );
}