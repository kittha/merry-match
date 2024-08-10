import { isTokenExpired } from "./tokenUtils.js";

export function getStoredData() {
  let storedData = localStorage.getItem("data");

  if (!storedData) {
    console.error("No data found in localStorage.");
    return null;
  }

  try {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      console.warn("JWT token is expired.");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("data");
      window.location.replace("/");
      return null;
    }

    storedData = JSON.parse(storedData);

    return storedData;
  } catch (error) {
    console.error("Error parsing JSON data from localStorage:", error);
    console.warn("JWT token is expired.");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("data");
    window.location.replace("/");
    return null;
  }
}
