import api from "./axios";
import { Contact } from "../types/contact";

export const sendContact = async (data: Contact) => {
  return await api.post("/contact", data);
};