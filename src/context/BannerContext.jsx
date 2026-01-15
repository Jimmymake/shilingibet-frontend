import { createContext, useContext, useState } from "react";
import BannerPopup from "../component/BannerPopup";

const BannerContext = createContext();

export function BannerProvider({ children }) {
  const [popup, setPopup] = useState({ open: false, type: null });

  const showBanner = (type) => setPopup({ open: true, type });
  const closeBanner = () => setPopup({ open: false, type: null });

  return (
    <BannerContext.Provider value={{ showBanner, closeBanner }}>
      {children}
      <BannerPopup
        open={popup.open}
        bannerType={popup.type}
        onClose={closeBanner}
      />
    </BannerContext.Provider>
  );
}

// 👇 Add this so you can use it in Register
export function useBanner() {
  return useContext(BannerContext);
}
