import { FiX } from "react-icons/fi";

export default function AppDownloadPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[rgb(9,12,29)]/80 z-40 transition-opacity duration-500 opacity-100"
        onClick={onClose}
      />
      {/* Bottom Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 opacity-100">
        <div className="relative bg-[rgb(25,25,57)] text-[rgb(151,137,205)] rounded-t-3xl p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] w-full max-w-md mx-auto transform transition-all duration-700 scale-100">
          {/* Subtle glowing top border */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f9ce36] to-transparent" />

          {/* Handle bar */}
          <div className="w-14 h-1.5 bg-[rgb(9,12,29)]/50 rounded-full mx-auto mb-5" />

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-center text-[rgb(151,137,205)]">
            Get Our Android App
          </h2>
          <p className="text-sm text-[rgb(151,137,205)]/80 text-center mb-6">
            Never Miss Anything, Download Now.
          </p>

          {/* Android Icon */}
          <img
            src="/app-1.png"
            alt="Android"
            className="w-16 h-16 mx-auto mb-6 animate-bounce"
          />

          {/* Install button */}
          <a
            href="/ndege.apk"
            className="block w-full bg-[#f9ce36] text-[rgb(25,25,57)] font-bold py-3 rounded-xl mb-5 transition-all duration-300 text-center"
          >
            🚀 Install Now
          </a>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center mx-auto rounded-full bg-[rgb(9,12,29)]/40 hover:bg-[rgb(9,12,29)]/60 text-[rgb(151,137,205)] transition-all"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}
