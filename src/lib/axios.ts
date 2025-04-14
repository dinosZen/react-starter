import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  //baseURL: process.env.VITE_APP_API_URL,
  //baseURL: import.meta.env.VITE_APP_API_URL,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("token", localStorage.getItem("auth_token"));
    const token = localStorage.getItem("auth_token");
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API error:", error);
    if (error.response && error.response.status === 401) {
      //window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
