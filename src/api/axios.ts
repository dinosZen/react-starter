import { clearCookie, getCookieValue, setCookieValue } from "@/lib/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      getCookieValue("access_token") ?? getCookieValue("partial_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const normalizedError =
      error instanceof Error
        ? error
        : new Error(
            error?.response?.data?.message ??
              error?.message ??
              "An unknown request error occurred."
          );

    return Promise.reject(normalizedError);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      __isRetry?: boolean;
    };

    const isAuthRoute =
      originalRequest?.url?.includes("/auth") &&
      !originalRequest?.url?.includes("/auth/logout") &&
      !originalRequest?.url?.includes("/auth/create-password");
    const isUnauthorized = error.response?.status === 401;

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (isUnauthorized && !originalRequest.__isRetry) {
      originalRequest.__isRetry = true;

      try {
        const {
          data: {
            data: { access_token },
          },
        } = await api.post("/auth/refresh", {}, { withCredentials: true });

        const newToken = access_token;

        if (newToken) {
          setCookieValue("access_token", newToken);
        }
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        clearCookie("access_token");
        window.location.href = "/login";

        const message =
          refreshError instanceof Error
            ? refreshError.message
            : "Unknown error during token refresh";

        return Promise.reject(new Error(message));
      }
    }

    return Promise.reject(error);
  }
);

export default api;
