import { getCookieValue } from "@/lib/cookies";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookieValue("access_token");
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    const normalizedError =
      error instanceof Error
        ? error
        : new Error(error?.response?.data?.message ?? "Request failed");

    return Promise.reject(normalizedError);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    const normalizedError =
      error instanceof Error
        ? error
        : new Error(error?.response?.data?.message ?? "Request failed");

    return Promise.reject(normalizedError);
  }
);

export default api;
