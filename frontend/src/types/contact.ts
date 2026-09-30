export interface Contact {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends Contact {
  id: number;
  createdAt: string;
}
