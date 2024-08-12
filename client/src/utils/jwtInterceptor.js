import axios from "axios";
import { clearAuthDataAndRedirect } from "./tokenUtils";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let isRefreshing = false;
let refreshSubscribers = [];
let lastRefreshTime = null; // Timestamp of the last refresh

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

function jwtInterceptor() {
  axios.interceptors.request.use(
    (config) => {
      config.withCredentials = true; // Ensure cookies are sent with requests
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

      if (error.response?.status === 429) {
        await delay(1234); // Delay before retrying
        return axios(originalRequest);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        const now = Date.now();

        if (isRefreshing) {
          // If another request is refreshing, wait for it to finish
          return new Promise((resolve) => {
            addRefreshSubscriber(() => {
              originalRequest._retry = true;
              resolve(axios(originalRequest));
            });
          });
        } else if (!lastRefreshTime || now - lastRefreshTime > 60000) {
          // If no refresh is in progress and more than 1 minute has passed
          originalRequest._retry = true;
          isRefreshing = true;
          lastRefreshTime = now;

          try {
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
              {},
              {
                withCredentials: true, // Send cookies with the refresh token request
              }
            );

            isRefreshing = false;
            onRefreshed();
            return axios(originalRequest); // Retry the original request
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            isRefreshing = false;
            clearAuthDataAndRedirect();
            return Promise.reject(refreshError);
          }
        } else {
          // Ignore if within the 1-minute window to avoid multiple refresh requests
          console.log(
            "Refresh token request ignored: Throttling refresh requests."
          );
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
