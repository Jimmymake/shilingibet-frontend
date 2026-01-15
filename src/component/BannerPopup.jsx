import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

function BannerPopup({ open, onClose, bannerType }) {
  if (!open) return null;

  const banners = {
    registration: { bannerImage: "/register-banner.png", route: "/" },
    referandearn: { bannerImage: "/refer-banner.png", route: "/refer" },
    cashback: { bannerImage: "/cashback-banner.png", route: "/" },
  };
  const bannerData = banners[bannerType] || banners.registration;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative flex flex-col items-center justify-center  p-4">
        {" "}
        {/* ✅ Earn More button on top */}
        <Link
          to={bannerData.route}
          onClick={() => {
            if (onClose) onClose();
          }}
          className="absolute bottom-30 px-5 py-2 bg-primary min-w-[200px] text-black text-center font-bold rounded-md shadow hover:scale-105 transition-transform"
        >
          🚀 Earn More
        </Link>
        <Link
          to={bannerData.route}
          onClick={() => {
            if (onClose) onClose(); // ✅ close modal when navigating
          }}
        >
          <img
            src={bannerData.bannerImage}
            alt={`${bannerType} banner`}
            loading="eager"
            decoding="sync"
            className="max-w-full mx-auto rounded-lg"
          />
        </Link>
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="mt-4 flex items-center justify-center w-10 h-10 rounded-full"
        >
          <IoMdClose className="text-primary border border-primary rounded-full p-1 font-bold text-xl" />
        </button>
      </div>
    </div>
  );
}

export default BannerPopup;
