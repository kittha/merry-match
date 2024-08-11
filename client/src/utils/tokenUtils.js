import axios from "axios";

let isRefreshing = false;

/**
 * Clears authentication data from local storage and redirects the user to the login page.
 *
 * @return {void}
 */
export function clearAuthDataAndRedirect() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("data");
  localStorage.removeItem("authenticated");
  window.location.replace("/login");
}

export async function refreshToken() {
  if (isRefreshing) return; // Prevent multiple refreshes

  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    clearAuthDataAndRedirect();
  } finally {
    isRefreshing = false;
  }
}

export function initializeTokenRefresh() {
  const refreshAndSetState = async () => {
    try {
      await refreshToken();
    } catch (error) {
      console.error("Error refreshing token:", error);
      clearAuthDataAndRedirect();
    }
  };

  // const interval = setInterval(refreshAndSetState, 15000); // 15 sec * 1000 ms = Refresh every 15 seconds (for testing purpose)
  const interval = setInterval(refreshAndSetState, 15 * 60 * 1000); // 15 min * 60 sec * 1000 ms = Refresh every 15 minutes
  return () => clearInterval(interval);
}
