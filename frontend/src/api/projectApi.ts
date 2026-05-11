import api from "./axios";
import type { Project } from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
  const res = await api.get<Project[]>("/projects");
  return res.data;
};