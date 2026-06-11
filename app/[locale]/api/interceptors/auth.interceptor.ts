import apiClient from "../client";
import { authApi } from "../endpoints/auth.api";

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authApi.refreshToken();
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

apiClient.interceptors.request.use((config) => {
  const language = window.location.pathname.startsWith("/ar") ? "ar" : "en";
  config.headers.set("Accept-Language", language);
  return config;
});
