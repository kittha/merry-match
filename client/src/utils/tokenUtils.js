import axios from "axios";
import { jwtDecode } from "jwt-decode";

let isRefreshing = false;
const expiry_buffer = 120; // expire buffer = 120 seconds = 2 minutes

/**
 * Clears authentication data from local storage and redirects the user to the login page.
 *
 * @return {void}
 */
export function clearAuthDataAndRedirect() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("data");
  window.location.replace("/login");
}

/**
 * Decodes a JWT token and returns the decoded token object.
 *
 * @param {string} token - The JWT token to decode.
 * @return {object|null} - The decoded token object or null if decoding fails.
 */
function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

/**
 * Checks if a given JWT token is expiring soon based on the expiry buffer.
 *
 * @param {string} token - The JWT token to check for expiration.
 * @return {boolean} True if the token is expiring soon, otherwise false.
 */
export function isTokenExpiringSoon(token) {
  if (!token) return true;

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) return true;

  // // **********
  // // DEBUGGER: Check if the token is expired
  // if (token) {
  //   const secondsLeft = getSecondsUntilExpiration(token);
  //   if (secondsLeft !== null) {
  //     console.log(`Seconds left until token expires: ${secondsLeft}`);
  //   }
  // }
  // // **********

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeft = decodedToken.exp - currentTime;

  return timeLeft <= expiry_buffer;
}

/**
 * Check if a JWT token is expired.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if the token is expired, otherwise false.
 */
export function isTokenExpired(token) {
  if (!token) return true;

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}

/**
 * Calculate the number of seconds left until a JWT token expires.
 * @param {string} token - The JWT token to check.
 * @returns {number|null} - The number of seconds until the token expires, or null if the token is invalid or expired.
 */
export function getSecondsUntilExpiration(token) {
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) return null;

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeftInSeconds = decodedToken.exp - currentTime;

  return timeLeftInSeconds > 0 ? timeLeftInSeconds : null;
}

/**
 * Refreshes the access token using the refresh token stored in local storage.
 * If the refresh token is valid, it retrieves a new access token and refresh token from the backend,
 * stores them in local storage, and returns. If the refresh token is invalid or missing,
 * it removes the existing tokens from local storage and redirects to the login page.
 *
 * @return {Promise<void>} A promise that resolves when the token refresh is complete.
 */
export async function refreshToken() {
  if (isRefreshing) return; // Prevent multiple refreshes

  isRefreshing = true;

  const refresh_token = localStorage.getItem("refreshToken");

  // console.log("refreshing token", refresh_token);

  if (refresh_token) {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
        { refresh_token },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const token = result.data?.session?.access_token;
      const newRefreshToken = result.data?.session?.refresh_token;

      if (token && newRefreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", newRefreshToken);
      } else {
        throw new Error(
          "Failed to refresh token: missing token or refresh token in response."
        );
      }
    } catch (error) {
      // console.error("Error refreshing token:", error);
      clearAuthDataAndRedirect();
    } finally {
      isRefreshing = false;
    }
  } else {
    isRefreshing = false; // Reset flag if no refresh_token is found
    clearAuthDataAndRedirect();
  }
}

/**
 * Initializes a token refresh mechanism that periodically refreshes the token and sets the state.
 *
 * @return {Function} A function that can be called to stop the token refresh mechanism.
 */
export function initializeTokenRefresh() {
  const refreshAndSetState = async () => {
    try {
      await refreshToken();
    } catch (error) {
      // console.error("Error refreshing token:", error);
      clearAuthDataAndRedirect();
    }
  };

  // const interval = setInterval(refreshAndSetState, 15000); // 15 sec * 1000 ms = Refresh every 15 seconds (for testing purpose)
  const interval = setInterval(refreshAndSetState, 15 * 60 * 1000); // 15 min * 60 sec * 1000 ms = Refresh every 15 minutes
  return () => clearInterval(interval);
}
