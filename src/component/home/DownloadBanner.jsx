import { useState, useEffect } from "react";
import { FaAndroid } from "react-icons/fa";
import { FiDownload, FiX } from "react-icons/fi";

export default function DownloadBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenDownloadBanner");
    if (!seen && window.innerWidth <= 640) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("seenDownloadBanner", "true");
  };

  if (!visible) return null;

  return (
    <div className="relative w-full sm:hidden shadow-lg animate-slide-down">
      <style>
        {`
          @keyframes bounceIcon {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          .animate-bounce-slow {
            animation: bounceIcon 2s infinite;
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slideDown 0.6s ease-out;
          }
        `}
      </style>

      {/* Full-width Download button */}
      <a
        href="/ndege.apk"
        className="w-full flex items-center justify-center gap-3 bg-[#f9ce36] text-black font-bold py-2 px-6 text-lg transition-all duration-300"
      >
        <FaAndroid className="w-6 h-6 animate-bounce-slow" />
        Download Android App
        <FiDownload className="w-6 h-6" />
      </a>

      {/* Close button floating on top-right */}
      <button
        onClick={handleClose}
        className=" absolute -right-2 bg-secondary p-1 -top-2 text-[rgb(151,137,205)]/90 rounded-full transition-colors"
        aria-label="Dismiss banner"
      >
        <FiX className="w-6 h-6" />
      </button>
    </div>
  );
}
