import { useState, type FormEvent } from "react";
import { sendContact } from "../api/contactApi";
import { SITE } from "../data/site";

type Lang = "en" | "ar";

const text = {
    en: {
        title: "Send us a message",
        sub: "Tell us about your project and we will get back to you.",
        name: "Your name",
        email: "Email",
        message: "How can we help?",
        send: "Send message",
        sending: "Sending…",
        done: "Thank you! Your message has been sent. We will contact you soon.",
        failed: "We could not send your message. Please reach us on WhatsApp instead.",
        whatsapp: "Chat on WhatsApp",
    },
    ar: {
        title: "أرسل لنا رسالة",
        sub: "أخبرنا عن مشروعك وسنتواصل معك قريباً.",
        name: "اسمك",
        email: "البريد الإلكتروني",
        message: "كيف يمكننا مساعدتك؟",
        send: "إرسال الرسالة",
        sending: "جارٍ الإرسال…",
        done: "شكراً لك! تم إرسال رسالتك وسنتواصل معك قريباً.",
        failed: "تعذر إرسال رسالتك. يرجى التواصل معنا عبر واتساب.",
        whatsapp: "الدردشة عبر واتساب",
    },
};

const ContactForm = ({ lang }: { lang: Lang }) => {
    const t = text[lang];
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");

    const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        try {
            await sendContact({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
            setForm({ name: "", email: "", message: "" });
            setStatus("done");
        } catch {
            setStatus("failed");
        }
    };

    return (
        <form className="contact-form" onSubmit={submit} data-reveal>
            <h3>{t.title}</h3>
            <p className="contact-form-sub">{t.sub}</p>

            <div className="contact-form-row">
                <label className="auth-field">
                    <span>{t.name}</span>
                    <input name="name" autoComplete="name" required maxLength={100} value={form.name} onChange={update("name")} />
                </label>
                <label className="auth-field">
                    <span>{t.email}</span>
                    <input name="email" type="email" autoComplete="email" dir="ltr" required maxLength={256} value={form.email} onChange={update("email")} />
                </label>
            </div>

            <label className="auth-field">
                <span>{t.message}</span>
                <textarea name="message" rows={5} required maxLength={2000} value={form.message} onChange={update("message")} />
            </label>

            <div className="contact-form-status" role="status" aria-live="polite">
                {status === "done" && <span className="ok">{t.done}</span>}
                {status === "failed" && (
                    <span className="bad">
                        {t.failed}{" "}
                        <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a>
                    </span>
                )}
            </div>

            <button type="submit" className="auth-submit" disabled={status === "sending"}>
                {status === "sending" ? t.sending : t.send}
            </button>
        </form>
    );
};

export default ContactForm;
