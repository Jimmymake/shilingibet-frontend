import { useLocation, useNavigate } from "react-router-dom";
import BaseClass from "../../services/BaseClass";
import { useState } from "react";
import DepositModal from "../payments/DepositModal";
import { LuTrophy } from "react-icons/lu";

export default function BottomNav({ closeAll, isSomethingOpen }) {
  const baseClass = new BaseClass();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDepositOpen, setDepositOpen] = useState(false);
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const linkTo = baseClass.userId ? `/playGame/aviator` : `/login`;
  const linkSportsTo = baseClass.userId ? `/sports` : `/login`;

  function handleHomeClick() {
    if (isSomethingOpen) {
      closeAll?.();
    } else {
      navigate("/");
    }
  }

  const handleSlotsClick = () => {
    if (isSomethingOpen) {
      closeAll?.();
    } else {
      navigate("/refer");
    }
  };

  function handleSportsClick() {
    if (isSomethingOpen) {
      closeAll?.();
    } else {
      navigate(linkSportsTo);
    }
  }

  function handleAviatorClick() {
    if (isSomethingOpen) {
      closeAll?.();
    } else {
      navigate(linkTo);
    }
  }
  function handleProfileClick() {
    if (isSomethingOpen) {
      closeAll?.();
    } else {
      navigate("/profile");
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0E161B] border-t border-gray-700 flex justify-around items-center py-2 md:hidden z-50">
      {/* Home */}
      <button
        onClick={handleHomeClick}
        className={`flex flex-col items-center text-xs cursor-pointer ${
          isActive("/") ? "text-primary" : "text-[rgb(151,137,205)]/90"
        }`}
      >
        <img src="/home.svg" className="w-6 h-6 mb-1" />
        Home
      </button>
      {/* Sports */}
      <button
        onClick={handleSportsClick}
        className={`flex flex-col items-center text-xs cursor-pointer ${
          isActive("/sports") ? "text-primary" : "text-[rgb(151,137,205)]/90"
        }`}
      >
        <LuTrophy className="w-6 h-6 mb-1" />
        Sports
      </button>
      {/* Aviator */}
      <button
        onClick={handleAviatorClick}
        className={`flex flex-col items-center text-xs cursor-pointer ${
          isActive(linkTo) ? "text-primary" : "text-[rgb(151,137,205)]/90 "
        }`}
      >
        <img src="/aviator.png" className="w-6 h-6 mb-1" />
        Aviator
      </button>
      {/* Slots */}
      <button
        onClick={handleSlotsClick}
        className={`flex flex-col items-center text-xs cursor-pointer ${
          isActive("/refer") ? "text-primary" : "text-[rgb(151,137,205)]/90 "
        }`}
      >
        <img src="/refer.png" className="w-6 h-6 mb-1" />
        Refer
      </button>
      {/* Menu -> Opens Drawer */}
      <button
        onClick={handleProfileClick}
        className={`flex flex-col items-center text-xs cursor-pointer ${
          isActive("/profile") ? "text-primary" : "text-[rgb(151,137,205)]/90"
        }`}
      >
        <img src="/profile.png" className="w-6 h-6 mb-1" />
        Profile
      </button>{" "}
      {/* ✅ Deposit Modal */}
      {isDepositOpen && <DepositModal onClose={() => setDepositOpen(false)} />}
    </div>
  );
}
