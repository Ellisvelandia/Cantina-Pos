import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://cantina-pos-backend.onrender.com/api"
    : "http://localhost:5000/api");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
