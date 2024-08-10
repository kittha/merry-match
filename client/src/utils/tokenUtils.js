import axios from "axios";
import { debounce } from "./debounce";
import logout from "../hooks/useAuth";

let isRefreshing = false;

/**
 * Decode a JWT token and return the payload.
 * @param {string} token - The JWT token to decode.
 * @returns {object|null} - The decoded payload or null if decoding fails.
 */
export function decodeJWT(token) {
  try {
    // FIXME need validation
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

/**
 * Check if a JWT token is expired.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if the token is expired, otherwise false.
 */
export function isTokenExpired(token) {
  const decodedToken = decodeJWT(token);
  if (!decodedToken || !decodedToken.exp) {
    return true; // Consider token expired if it's not decodable or doesn't have an exp field
  }

  // // **********
  // // DEBUGGER: Check if the token is expired
  // if (token) {
  //   const daysLeft = getDaysUntilExpiration(token);
  //   console.log(`Days left until token expires: ${daysLeft}`);
  // }
  // // **********

  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}

/**
 * Calculate the number of days left until a JWT token expires.
 * @param {string} token - The JWT token to check.
 * @returns {number|null} - The number of days until the token expires, or null if the token is invalid or expired.
 */
export function getDaysUntilExpiration(token) {
  const decodedToken = decodeJWT(token);
  if (!decodedToken || !decodedToken.exp) {
    console.error("Invalid token or token has no expiration.");
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeftInSeconds = decodedToken.exp - currentTime;

  if (timeLeftInSeconds <= 0) {
    console.warn("Token is already expired.");
    return null;
  }

  const daysLeft = Math.ceil(timeLeftInSeconds / (60 * 60 * 24));
  return daysLeft;
}

export const refreshToken = async () => {
  if (isRefreshing) return; // Prevent multiple refreshes

  isRefreshing = true;

  const refresh_token = localStorage.getItem("refreshToken");

  console.log("refreshing token", refresh_token);

  if (refresh_token) {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
        { refresh_token }
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
      return;
    } catch (error) {
      // console.error("Error refreshing token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("data");
      window.location.replace("/login"); // Redirect to login page
    } finally {
      isRefreshing = false;
    }
  } else {
    isRefreshing = false; // Reset flag if no refresh_token is found
  }
};

export const initializeTokenRefresh = () => {
  const refreshAndSetState = async () => {
    try {
      await refreshToken();
    } catch (error) {
      // console.error("Error refreshing token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("data");
      window.location.replace("/login"); // Redirect to login page
    }
  };

  // const interval = setInterval(refreshAndSetState, 15000); // 15 sec * 1000 ms = Refresh every 15 seconds (for testing purpose)
  const interval = setInterval(refreshAndSetState, 15 * 60 * 1000); // 15 min * 60 sec * 1000 ms = Refresh every 15 minutes
  return () => clearInterval(interval);
};
