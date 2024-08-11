import { clearAuthDataAndRedirect } from "./tokenUtils.js";

export function getStoredData() {
  try {
    const storedData = localStorage.getItem("data");
    const parsedData = JSON.parse(storedData);
    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON data from localStorage:", error);
    clearAuthDataAndRedirect();
    return null;
  }
}

export function getUserIdFromStoredData() {
  const data = getStoredData();
  if (!data) {
    return null;
  }
  return data.id;
}
