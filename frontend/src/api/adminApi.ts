import api from "./axios";
import type { ContactMessage } from "../types/contact";
import type { Project } from "../types/project";
import type { NewService } from "../types/service";

export const getContacts = async (): Promise<ContactMessage[]> => {
  const res = await api.get<ContactMessage[]>("/contact");
  return res.data;
};

export type NewProject = Omit<Project, "id">;

export const createProject = async (data: NewProject): Promise<number> => {
  const res = await api.post<number>("/projects", data);
  return res.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const createService = async (data: NewService): Promise<number> => {
  const res = await api.post<number>("/services", data);
  return res.data;
};

export const updateService = async (id: number, data: NewService): Promise<void> => {
  await api.put(`/services/${id}`, { id, ...data });
};

export const deleteService = async (id: number): Promise<void> => {
  await api.delete(`/services/${id}`);
};
