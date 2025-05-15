import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("api", process.env.NEXT_PUBLIC_API);
api.interceptors.request.use(
  (config) => {
    const token = getCookie("jwt");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
