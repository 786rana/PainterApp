import api from "./axios";

export type Design = "warm" | "midnight" | "fresh";

export const isDesign = (v: unknown): v is Design => v === "warm" || v === "midnight" || v === "fresh";

export const getPreferences = async (): Promise<{ theme: Design | null }> => {
  const res = await api.get<{ theme: string | null }>("/account/preferences");
  return { theme: isDesign(res.data.theme) ? res.data.theme : null };
};

export const savePreferences = async (theme: Design): Promise<void> => {
  await api.put("/account/preferences", { theme });
};
