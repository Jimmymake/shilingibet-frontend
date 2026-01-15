import { useNavigate } from "react-router-dom";

export default function SportsHeader() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/");
  };

  return (
    <header className="relative h-10 bg-primary text-black flex items-center select-none">
      <button
        type="button"
        onClick={handleBack}
        className="h-10 w-12 mr-2 flex items-center justify-center text-black bg-primary border-r focus:outline-none hover:bg-primary/90 transition-colors"
        aria-label="Go back to home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <span className="mx-auto font-medium text-sm text-black">Sports</span>

      <div className="w-12"></div>
    </header>
  );
}

