import axios from "axios";
import {
  isTokenExpiringSoon,
  refreshToken,
  clearAuthDataAndRedirect,
} from "./tokenUtils";

/**
 * Sets up an interceptor for Axios requests and responses to handle JWT token refresh, set Bearer Token at Header and unauthorized errors.
 *
 * @return {void}
 */
function jwtInterceptor() {
  axios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("token");

      // console.log("isTokenExpiringSoon", isTokenExpiringSoon(token));

      if (token && isTokenExpiringSoon(token)) {
        try {
          await refreshToken(); // Refresh the token if expired
          token = localStorage.getItem("token");
        } catch (error) {
          console.error("Error refreshing token:", error);
          clearAuthDataAndRedirect();
          return Promise.reject(error);
        }
      }

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
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
        console.error("Unauthorized error:", error);
        clearAuthDataAndRedirect();
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
