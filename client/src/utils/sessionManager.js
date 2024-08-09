function decodeJWT(token) {
  try {
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

function isTokenExpired(token) {
  const decodedToken = decodeJWT(token);
  if (!decodedToken || !decodedToken.exp) {
    return true; // Consider token expired if it's not decodable or doesn't have an exp field
  }

  // Get the current time in seconds since Unix epoch
  const currentTime = Math.floor(Date.now() / 1000);
  //   console.log("isTokenExpired ?", currentTime > decodedToken.exp);
  return currentTime > decodedToken.exp;
}

// Centralized function to get parsed localStorage data
export function getStoredData() {
  const storedData = localStorage.getItem("data");

  if (!storedData) {
    console.error("No data found in localStorage.");
    return null;
  }

  try {
    // Check if token is expired
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      console.warn("JWT token is expired.");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("data");
      window.location.replace("/");
      return null;
    }

    return storedData;
  } catch (error) {
    console.error("Error parsing JSON data from localStorage:", error);
    console.warn("JWT token is expired.");
    // localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("data");
    // window.location.replace("/");
    return null;
  }
}

// const myUserId = getStoredData()?.id;
// const myAvatar = getStoredData()?.avatars?.[0];

// console.log("User ID:", myUserId);
// console.log("User Avatar:", myAvatar);
