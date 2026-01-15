import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import BaseClass from "../services/BaseClass";
import AuthToggle from "./auth/AuthToggle";
import DepositModal from "./payments/DepositModal";
import SearchModal from "./home/SearchModal";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const base = new BaseClass();

  return (
    <header
      className="w-full bg-stone-900 text-textColor px-3 md:px-4 shadow-sm flex items-center py-2 justify-between sticky top-0 z-50 "
      aria-label="Site navigation"
    >
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          {/* Mobile Logo */}
          <img
            src="/fav.svg"
            alt="Logo"
            className="h-8 w-auto block md:hidden"
          />
          {/* Desktop Logo */}
          <img src="/logo.png" alt="Logo" className="w-28 hidden md:block" />
        </Link>
      </div>
      {/* Right: Authenticated or Guest */}
      {base.isAuthenticated() ? (
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <div
            onClick={() => setOpenSearch(true)}
            className="w-10 h-10 bg-[#0C0E1B] border-4 border-black rounded-lg flex items-center justify-center cursor-pointer hover:brightness-125"
          >
            <FiSearch className="text-lg text-textColor" />
          </div>
          {/* Deposit */}
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-black lg:px-3 lg:py-1 px-3 py-1 flex items-center justify-center
                       cursor-pointer text-sm md:text-base font-bold rounded-md hover:brightness-110 transition"
          >
            Deposit
          </button>
         <DepositModal onClose={() => setOpen(false)} isOpen={open} setIsOpen={setOpen} />

          {/* Profile (large devices only) */}
          <Link to="/profile" className="hidden lg:block">
            <div
              className="flex items-center gap-2 border-2 lg:border-4 border-black
               px-3 py-1 lg:px-4 lg:py-2 rounded-xl h-9 lg:h-auto"
            >
              <img
                src="/prof-1.png"
                className="h-6 w-6 rounded-full border-2 border-[rgb(151,137,205)]"
                alt="Profile"
              />
              <MdKeyboardArrowDown className="text-gray-400 inline" />
            </div>
          </Link>

          {/* Promo (mobile only) */}
          <Link to="/promotions" className="block md:hidden">
            <div
              className="flex items-center gap-2 border-2 border-black
               px-3 py-1 rounded-xl h-10"
            >
              <img
                src="/promo.svg"
                className="h-6 w-6 rounded-full"
                alt="promo"
              />
              {/* Hide arrow completely on mobile since md:hidden wraps */}
            </div>
          </Link>
        </div>
      ) : (
        <AuthToggle />
      )}
      {/* Search Modal */}
      <SearchModal isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </header>
  );
}
