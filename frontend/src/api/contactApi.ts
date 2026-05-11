import api from "./axios";
import type { Contact } from "../types/contact";

export const sendContact = async (data: Contact) => {
  return await api.post("/contact", data);
};