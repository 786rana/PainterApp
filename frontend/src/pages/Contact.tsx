
import { useState } from "react";
import { sendContact } from "../api/contactApi";
import { Contact } from "../types/contact";

const ContactPage = () => {
  const [form, setForm] = useState<Contact>({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await sendContact(form);
    alert("Message sent!");
  };

  return (
    <div>
      <h2>Contact</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <textarea name="message" placeholder="Message" onChange={handleChange} />

      <button onClick={submit}>Send</button>
    </div>
  );
};

export default ContactPage;