import axios from "axios";
import { clearAuthDataAndRedirect } from "./tokenUtils";

/**
 * Sets up an interceptor for Axios requests and responses to handle JWT token refresh, set Bearer Token at Header and unauthorized errors.
 *
 * @return {void}
 */
function jwtInterceptor() {
  axios.interceptors.request.use(
    async (config) => {
      config.withCredentials = true;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest.__isRetryRequest) {
        console.log(
          "error.response.data?.needRefresh",
          error.response.data?.needRefresh
        );

        if (error.response.data?.needRefresh === undefined) {
          console.log(
            "Token refresh not required or not possible, redirecting to login."
          );
          clearAuthDataAndRedirect();
          return; // Stop execution
        }

        if (error.response.data?.needRefresh) {
          try {
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            originalRequest.__isRetryRequest = true;
            return axios(originalRequest); // Retry original request with new token
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            clearAuthDataAndRedirect();
          }
        }
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
