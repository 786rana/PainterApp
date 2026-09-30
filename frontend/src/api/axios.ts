import axios from "axios";

export const TOKEN_KEY = "auth_token";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    /* storage unavailable */
  }
  return config;
});

export default api;
