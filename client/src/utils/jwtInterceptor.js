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
      if (error.response.status === 401 && !error.config.__isRetryRequest) {
        try {
          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`
          );

          error.config.__isRetryRequest = true; // Prevent infinite loop in case of failure
          return axios(error.config); // Retry the original request with new access token
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          clearAuthDataAndRedirect();
        }
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
