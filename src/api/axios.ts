import { clearCookie, getCookieValue, setCookieValue } from "@/lib/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

api.interceptors.request.use((config) => {
  const token =
    getCookieValue("access_token") ?? getCookieValue("partial_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      __isRetry?: boolean;
    };

    if (originalRequest.url?.includes("/auth")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.__isRetry) {
      originalRequest.__isRetry = true;

      try {
        const refreshResponse = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.access_token;

        setCookieValue("access_token", newToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        clearCookie("access_token");
        window.location.href = "/login";

        let errorToReject: Error;

        if (refreshError instanceof Error) {
          errorToReject = refreshError;
        } else {
          const errorMessage =
            refreshError instanceof Error
              ? refreshError.message
              : "Unknown error during token refresh";
          errorToReject = new Error(errorMessage);
        }
        return Promise.reject(errorToReject);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
