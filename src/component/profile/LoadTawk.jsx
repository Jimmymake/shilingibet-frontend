let tawkLoaded = false;
let tawkLoading = false;

/**
 * Loads or shows Tawk.to widget when triggered by click
 */
export function LoadTawk() {
  // If already loaded, maximize it (don't reload script)
  if (tawkLoaded) {
    window.Tawk_API?.maximize?.();
    return;
  }

  // Prevent duplicate loading
  if (tawkLoading) return;
  tawkLoading = true;

  // Set up Tawk API
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const script = document.createElement("script");
  // ✅ Replace with YOUR Tawk.to embed URL (from dashboard)
  script.src = "https://embed.tawk.to/68be6726030d19192814c037/1j4js5s5k";
  script.async = true;
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");

  script.onload = () => {
    tawkLoaded = true;
    tawkLoading = false;

    // Override minimize/close to fully hide
    window.Tawk_API.onChatMinimized = hideTawkCompletely;
    window.Tawk_API.onChatHidden = hideTawkCompletely;

    // Open chat immediately on click
    window.Tawk_API.maximize?.();
  };

  script.onerror = () => {
    tawkLoading = false;
    console.error("Tawk.to failed to load. Check your widget ID.");
  };

  document.body.appendChild(script);
}

/**
 * Completely hides Tawk.to (chat + launcher button)
 */
export function hideTawkCompletely() {
  if (!window.Tawk_API) return;

  // Hide using Tawk's API
  window.Tawk_API.hideWidget?.();

  // Remove all Tawk elements
  const selectors = [
    "#tawkchat-container",
    "#tawkchat-minified",
    ".tawk-min-container",
    "#tawkchat-status",
    "#tawkchat-status-icon",
    ".tawk-button-circle",
    "iframe[src*='tawk.to']",
  ];

  selectors.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) element.remove();
  });
}
