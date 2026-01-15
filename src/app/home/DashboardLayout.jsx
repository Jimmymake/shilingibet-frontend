import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import SearchModal from "../../component/home/SearchModal";
import Sidebar from "../../component/home/Sidebar";
import BottomNav from "../../component/home/BottomNav";
import AppDownloadPopup from "../../component/home/AppDownloadPopup";
import DownloadBanner from "../../component/home/DownloadBanner";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  const isSomethingOpen = showSidebar || isSearchOpen || isAppModalOpen;

  const closeAll = () => {
    setShowSidebar(false);
    setIsSearchOpen(false);
    setIsAppModalOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show popup once on first visit
  useEffect(() => {
    const seen = localStorage.getItem("seenAppPopup");
    if (!seen) {
      setIsAppModalOpen(true);
      localStorage.setItem("seenAppPopup", "true");
    }
  }, []);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (!isMobile) return;
    const shouldLock = isSomethingOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isSomethingOpen]);

  return (
    <div className="flex h-screen bg-secondary text-textColor relative">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        {" "}
        {/* ✅ Banner sits above homepage */}
        <DownloadBanner />
        <Navbar />
        <main className="app-scroll flex-1 overflow-y-auto md:px-1 md:py-4 md:pb-4 pb-16">
          <Outlet />
        </main>
        {isMobile && (
          <BottomNav
            onMenuClick={() => setShowSidebar(true)}
            onSearchClick={() => setIsSearchOpen(true)}
            closeAll={closeAll}
            isSomethingOpen={isSomethingOpen}
          />
        )}
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      {/* <AppDownloadPopup
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
      /> */}
    </div>
  );
}
export default DashboardLayout;
