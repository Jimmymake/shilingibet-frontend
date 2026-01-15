import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DepositModal from "./DepositModal";

export default function DepositHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {open && <DepositModal onClose={handleClose} />}

      <header
        className="relative h-10 bg-primary text-black flex items-center select-none cursor-pointer"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Open Deposit Modal"
        aria-expanded={open}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(-1);
          }}
          className="h-10 w-12 mr-2 flex items-center justify-center text-black bg-primary border-r focus:outline-none"
          aria-label="Go back"
        >
          &larr;
        </button>

        <span className="mx-auto font-medium text-sm pointer-events-none text-black">
          Deposit
        </span>
      </header>
    </>
  );
}