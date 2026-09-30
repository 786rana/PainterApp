import axios from "axios";

export const TOKEN_KEY = "auth_token";

/**
 * Where the API lives.
 * - Local development / Aspire: empty, so requests go to "/api" and the Vite proxy forwards them.
 * - Hosted frontend (e.g. Vercel): set VITE_API_URL to the backend's address,
 *   for example https://painter-api.azurewebsites.net
 */
const apiOrigin = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${apiOrigin}/api`,
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
