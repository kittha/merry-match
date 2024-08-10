import axios from "axios";
import { isTokenExpired, refreshToken } from "./tokenUtils";

function jwtInterceptor() {
  axios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("token");

      if (token && isTokenExpired(token)) {
        try {
          await refreshToken(); // Refresh the token if expired
          token = localStorage.getItem("token"); // Get the new token
        } catch (error) {
          console.error("Error refreshing token:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("data");
          window.location.replace("/login"); // Redirect to login page
          return Promise.reject(error);
        }
      }

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("data");
        window.location.replace("/login"); // Redirect to login page
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
