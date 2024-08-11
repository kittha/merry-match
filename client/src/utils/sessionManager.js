import { isTokenExpired, clearAuthDataAndRedirect } from "./tokenUtils.js";

export function getStoredData() {
  const storedData = localStorage.getItem("data");
  const token = localStorage.getItem("token");

  if (!storedData) {
    // console.error("No data found in localStorage.");
    return null;
  }

  if (token && isTokenExpired(token)) {
    console.warn("JWT token is expired.");
    clearAuthDataAndRedirect();
    return null;
  }

  try {
    const parsedData = JSON.parse(storedData);
    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON data from localStorage:", error);
    clearAuthDataAndRedirect();
    return null;
  }
}
