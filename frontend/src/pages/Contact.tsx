
import { useState } from "react";
import { sendContact } from "../api/contactApi";
//import type { Contact } from "../types/contact";
import type { Contact } from "../types/contact";

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
    if (!form.name || !form.email || !form.message) {
      alert('Please complete all fields');
      return;
    }

    await sendContact(form);
    alert("Message sent!");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container" style={{ padding: 40 }}>
      <h2>Contact</h2>

      <div style={{ maxWidth: 600, marginTop: 20 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} style={{ width: '100%', padding: 10, minHeight: 120 }} />

        <button onClick={submit} className="btn" style={{ marginTop: 12 }}>Send</button>
      </div>
    </div>
  );
};

export default ContactPage;
