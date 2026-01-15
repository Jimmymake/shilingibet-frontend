import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import "./index.css";
import { BannerProvider } from "./context/BannerContext.jsx";
import { GameProvider } from "./context/GameContext.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      <BrowserRouter>
        <BannerProvider>
          <GameProvider>
            <ScrollToTop />
            <App />
          </GameProvider>
        </BannerProvider>{" "}
      </BrowserRouter>
      {/* ✅ Global Toaster Config */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 5000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f9ce36",
            color: "#000",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
