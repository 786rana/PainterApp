import api from "./axios";
import { Service } from "../types/service";

export const getServices = async (): Promise<Service[]> => {
  const res = await api.get<Service[]>("/services");
  return res.data;
};