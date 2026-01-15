import { useState } from "react";
import { Drawer } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { RiMenuUnfold3Line, RiMenuFold3Line } from "react-icons/ri";
import { MdChevronRight } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImAirplane } from "react-icons/im";
import { FaFire, FaDice } from "react-icons/fa6";
import { IoClose, IoMegaphone } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import { TbCherry } from "react-icons/tb";
import { GiPokerHand } from "react-icons/gi";
import { LuTrophy } from "react-icons/lu";
import BaseClass from "../../services/BaseClass";
import { LoadTawk } from "../profile/LoadTawk";

function Sidebar({
  collapsed,
  setCollapsed,
  isMobile,
  showSidebar,
  setShowSidebar,
}) {
  const baseClass = new BaseClass();

  const location = useLocation();

  const [isCasinoOpen, setIsCasinoOpen] = useState(true);

  const toggleCasino = () => setIsCasinoOpen((prev) => !prev);

  const linkTo = baseClass.userId ? `/playGame/aviator` : `/login`;

  // Close sidebar on link click for mobile
  const handleMobileClose = () => {
    if (isMobile && setShowSidebar) setShowSidebar(false);
  };

  const casinoActivePrefixes = [
    // "/casino/popular",
    "/casino/slots",
  ];
  const isAnyCasinoActive = casinoActivePrefixes.some((p) =>
    location.pathname.startsWith(p)
  );

  const sidebarInner = (
    <div className="pt-4 pb-24 px-2 space-y-2 bg-stone-900 h-full overflow-y-auto">
      {/* (Desktop only) Collapse button */}
      {!isMobile && (
        <div className="flex justify-start px-2 mb-2">
          <div
            onClick={() => setCollapsed?.((prev) => !prev)}
            className="cursor-pointer p-1 rounded-md hover:bg-[#141E24] border-4 border-black"
            role="button"
          >
            {collapsed ? (
              <RiMenuUnfold3Line size={20} />
            ) : (
              <RiMenuFold3Line size={20} />
            )}
          </div>
        </div>
      )}

      {/* Casino group */}
      {/* <div
        className={`rounded-xl ${
          isAnyCasinoActive ? "bg-primary/10" : "bg-[rgb(151,137,205)]/10"
        } text-[rgb(151,137,205)]/90 relative`}
      >
        <div
          className="cursor-pointer px-4 py-2 flex justify-between items-center"
          onClick={toggleCasino}
        >
          <div className="flex items-center space-x-2">
            <FaDice
              className={`text-lg ${
                isAnyCasinoActive
                  ? "text-primary"
                  : "text-[rgb(151,137,205)]/90"
              }`}
            />
            {!collapsed && (
              <span
                className={`font-semibold ${
                  isAnyCasinoActive
                    ? "text-primary"
                    : "bg-[rgb(151,137,205)]/10"
                }`}
              >
                Casino
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="bg-background px-2 py-1 rounded-md">
              {isCasinoOpen ? <GoChevronDown /> : <MdChevronRight />}
            </div>
          )}
        </div>

        {!collapsed && isCasinoOpen && (
          <div className="mx-4 mt-1 space-y-2 flex flex-col gap-y-3 pb-2 text-sm">
            <SidebarSubItem
              icon={<FaFire />}
              label="Popular"
              to="/casino/popular"
              onClick={handleMobileClose}
            />
            <SidebarSubItem
              icon={<HiSparkles />}
              label="New Games"
              to="/casino/new-games"
              onClick={handleMobileClose}
            />
            <SidebarSubItem
              icon={<TbCherry />}
              label="Slots"
              to="/casino/slots"
              onClick={handleMobileClose}
            />
            <SidebarSubItem
              icon={<GiPokerHand />}
              label="Live Casino"
              to="/casino/live-casino"
              onClick={handleMobileClose}
            />
          </div>
        )}
      </div> */}

      {/* Main links */}
      <SidebarItem
        to="/sports"
        icon={<LuTrophy />}
        label="Sports"
        collapsed={collapsed}
        onClick={handleMobileClose}
      />
      <SidebarItem
        to="/casino/slots"
        icon={<TbCherry />}
        label="Slots"
        collapsed={collapsed}
        onClick={handleMobileClose}
      />

      <SidebarItem
        to={linkTo}
         icon={<ImAirplane />}
        label="Aviator"
        collapsed={collapsed}
        onClick={handleMobileClose}
      />

      <div className=" rounded-xl">
        <SidebarItem
          to="/promotions"
          icon={<IoMegaphone />}
          label="Promotions"
          collapsed={collapsed}
          onClick={handleMobileClose}
        />
      </div>

      <SidebarItem
        icon={<CustomerServiceOutlined />}
        label="Live Support"
        collapsed={collapsed}
        onClick={() => {
          handleMobileClose();
          LoadTawk();
        }}
      />
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          placement="left"
          closable={false}
          open={!!showSidebar}
          onClose={() => setShowSidebar?.(false)}
          styles={{ body: { padding: 0, background: "#0E161B" } }}
          width="80%"
          destroyOnClose
          // maskStyle={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          {/* extra (mobile) close button to the top-right of drawer content */}
          <div
            className="absolute top-3 right-3 p-2 bg- rounded-full cursor-pointer"
            onClick={() => setShowSidebar?.(false)}
          >
            <IoClose className="text-white" size={18} />
          </div>
          {sidebarInner}
        </Drawer>
      ) : (
        <aside
          className={`${
            collapsed ? "w-20" : "w-60"
          } transition-all duration-300 py-4 px-2 bg-secondary h-[calc(100vh-0px)] sticky top-0`}
        >
          {sidebarInner}
        </aside>
      )}
    </>
  );
}

export default Sidebar;

/* ----------------- Items ----------------- */

function SidebarItem({ icon, label, to, collapsed, onClick }) {
  const location = useLocation();
  const isActive = to ? location.pathname.startsWith(to) : false;

  const handleClick = () => {
    if (onClick) {
      setTimeout(() => onClick(), 100);
    }
  };

  const content = (
    <div
      onClick={handleClick}
      className={`rounded-xl px-4 py-2 my-2 flex items-center font-semibold space-x-3 cursor-pointer transition-colors duration-200
        ${
          isActive
            ? "bg-primary text-black"
            : "bg-[rgb(151,137,205)]/10 text-[rgb(151,137,205)]/90"
        }
      `}
    >
      <span className={`text-lg ${isActive ? "text-black" : ""}`}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

function SidebarSubItem({ icon, label, to, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = to ? location.pathname.startsWith(to) : false;

  const handleClick = () => {
    if (to) navigate(to);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center space-x-3 cursor-pointer transition-colors duration-200 rounded-lg
        ${
          isActive
            ? "bg-primary text-black px-3 py-2"
            : "text-[rgb(151,137,205)]/90 hover:text-textColor"
        }
      `}
    >
      <span className={`text-lg ${isActive ? "text-black" : ""}`}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
