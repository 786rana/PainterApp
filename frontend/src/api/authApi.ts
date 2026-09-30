import axios from "axios";
import api from "./axios";

export type Credentials = { email: string; password: string };

/** Returns the JWT. */
export const login = async (data: Credentials): Promise<string> => {
  const res = await api.post<string>("/auth/login", data, { responseType: "text" });
  return String(res.data).replace(/^"|"$/g, "");
};

export const register = async (data: Credentials): Promise<void> => {
  await api.post("/auth/register", data);
};

export type AuthErrorKind = "invalid" | "validation" | "exists" | "disabled" | "network" | "unknown";

/** Maps an API failure to something the UI can translate. */
export function classifyAuthError(error: unknown): { kind: AuthErrorKind; detail?: string } {
  if (!axios.isAxiosError(error)) return { kind: "unknown" };
  if (!error.response) return { kind: "network" };

  const { status, data } = error.response;
  if (status === 401) return { kind: "invalid" };
  if (status === 404) return { kind: "disabled" };
  if (status === 400) {
    const message = typeof data?.message === "string" ? data.message : undefined;
    if (message && /already registered/i.test(message)) return { kind: "exists" };
    if (data?.errors && typeof data.errors === "object") {
      const first = Object.values<string[]>(data.errors).flat()[0];
      return { kind: "validation", detail: first };
    }
    return { kind: "validation", detail: message };
  }
  return { kind: "unknown" };
}
