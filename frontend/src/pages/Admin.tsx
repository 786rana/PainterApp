import axios from "axios";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createProject, deleteProject, getContacts } from "../api/adminApi";
import { getProjects } from "../api/projectApi";
import { useAuth } from "../auth/AuthContext";
import type { ContactMessage } from "../types/contact";
import type { Project } from "../types/project";

type Lang = "en" | "ar";
type Tab = "messages" | "projects";

const text = {
    en: {
        title: "Dashboard",
        back: "← Back to website",
        logout: "Log out",
        messages: "Messages",
        projects: "Projects",
        refresh: "Refresh",
        loading: "Loading…",
        noMessages: "No messages yet. Messages sent from the contact form appear here.",
        noProjects: "No projects yet. Add your first project below — it will replace the sample gallery on the website.",
        reply: "Reply by email",
        addProject: "Add a project",
        projectTitle: "Title",
        imageUrl: "Image URL",
        imageHint: "Link to a photo (https://…). Upload the photo to a host first, then paste its link.",
        description: "Short description",
        add: "Add project",
        adding: "Adding…",
        remove: "Delete",
        confirmDelete: "Delete this project? This cannot be undone.",
        needLogin: "Please log in to open the dashboard.",
        login: "Log in",
        expired: "Your session has expired. Please log in again.",
        failed: "Something went wrong. Please try again.",
        added: "Project added.",
    },
    ar: {
        title: "لوحة التحكم",
        back: "→ العودة إلى الموقع",
        logout: "تسجيل الخروج",
        messages: "الرسائل",
        projects: "المشاريع",
        refresh: "تحديث",
        loading: "جارٍ التحميل…",
        noMessages: "لا توجد رسائل بعد. ستظهر هنا الرسائل المرسلة من نموذج التواصل.",
        noProjects: "لا توجد مشاريع بعد. أضف مشروعك الأول أدناه — سيحل محل المعرض التجريبي في الموقع.",
        reply: "الرد عبر البريد",
        addProject: "إضافة مشروع",
        projectTitle: "العنوان",
        imageUrl: "رابط الصورة",
        imageHint: "رابط صورة (https://…). ارفع الصورة على استضافة أولاً ثم الصق رابطها.",
        description: "وصف مختصر",
        add: "إضافة المشروع",
        adding: "جارٍ الإضافة…",
        remove: "حذف",
        confirmDelete: "حذف هذا المشروع؟ لا يمكن التراجع.",
        needLogin: "يرجى تسجيل الدخول لفتح لوحة التحكم.",
        login: "تسجيل الدخول",
        expired: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.",
        failed: "حدث خطأ ما. حاول مرة أخرى.",
        added: "تمت إضافة المشروع.",
    },
};

const isUnauthorized = (e: unknown) => axios.isAxiosError(e) && e.response?.status === 401;

type Props = { lang: Lang; onLogin: () => void };

const Admin = ({ lang, onLogin }: Props) => {
    const t = text[lang];
    const { user, logout } = useAuth();
    const [tab, setTab] = useState<Tab>("messages");
    const [messages, setMessages] = useState<ContactMessage[] | null>(null);
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [notice, setNotice] = useState<{ kind: "ok" | "bad"; text: string } | null>(null);
    const [form, setForm] = useState({ title: "", imageUrl: "", description: "" });
    const [adding, setAdding] = useState(false);

    const fail = useCallback(
        (e: unknown) => {
            if (isUnauthorized(e)) {
                logout();
                setNotice({ kind: "bad", text: text[lang].expired });
            } else {
                setNotice({ kind: "bad", text: text[lang].failed });
            }
        },
        [logout, lang],
    );

    const loadMessages = useCallback(() => {
        setMessages(null);
        getContacts().then(setMessages).catch((e) => { setMessages([]); fail(e); });
    }, [fail]);

    const loadProjects = useCallback(() => {
        setProjects(null);
        getProjects().then(setProjects).catch((e) => { setProjects([]); fail(e); });
    }, [fail]);

    const signedIn = !!user;
    useEffect(() => {
        if (!signedIn) return;
        loadMessages();
        loadProjects();
    }, [signedIn, loadMessages, loadProjects]);

    const addProject = async (e: FormEvent) => {
        e.preventDefault();
        setAdding(true);
        setNotice(null);
        try {
            await createProject({
                title: form.title.trim(),
                imageUrl: form.imageUrl.trim(),
                description: form.description.trim(),
            });
            setForm({ title: "", imageUrl: "", description: "" });
            setNotice({ kind: "ok", text: t.added });
            loadProjects();
        } catch (err) {
            fail(err);
        } finally {
            setAdding(false);
        }
    };

    const removeProject = async (id: number) => {
        if (!window.confirm(t.confirmDelete)) return;
        try {
            await deleteProject(id);
            loadProjects();
        } catch (err) {
            fail(err);
        }
    };

    const formatDate = (iso: string) =>
        new Date(iso.endsWith("Z") ? iso : `${iso}Z`).toLocaleString(lang === "ar" ? "ar-SA" : "en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    if (!user) {
        return (
            <main className="admin admin-gate" id="main">
                <div className="admin-card">
                    <h1>{t.title}</h1>
                    <p>{notice?.text ?? t.needLogin}</p>
                    <button type="button" className="auth-submit" onClick={onLogin}>{t.login}</button>
                    <a className="admin-back" href="#home">{t.back}</a>
                </div>
            </main>
        );
    }

    return (
        <main className="admin" id="main">
            <header className="admin-header">
                <div>
                    <h1>{t.title}</h1>
                    <a className="admin-back" href="#home">{t.back}</a>
                </div>
                <div className="admin-user">
                    <span dir="ltr">{user.email}</span>
                    <button type="button" className="account-logout" onClick={logout}>{t.logout}</button>
                </div>
            </header>

            <div className="admin-tabs" role="tablist">
                <button role="tab" aria-selected={tab === "messages"} className={tab === "messages" ? "on" : ""} onClick={() => setTab("messages")}>
                    {t.messages}{messages ? ` (${messages.length})` : ""}
                </button>
                <button role="tab" aria-selected={tab === "projects"} className={tab === "projects" ? "on" : ""} onClick={() => setTab("projects")}>
                    {t.projects}{projects ? ` (${projects.length})` : ""}
                </button>
            </div>

            <div className="admin-notice" role="status" aria-live="polite">
                {notice && <span className={notice.kind}>{notice.text}</span>}
            </div>

            {tab === "messages" && (
                <section>
                    <div className="admin-toolbar">
                        <button type="button" className="account-logout" onClick={loadMessages}>{t.refresh}</button>
                    </div>
                    {messages === null && <p className="admin-empty">{t.loading}</p>}
                    {messages?.length === 0 && <p className="admin-empty">{t.noMessages}</p>}
                    <ul className="admin-list">
                        {messages?.map((m) => (
                            <li key={m.id} className="admin-card message">
                                <div className="message-head">
                                    <strong>{m.name}</strong>
                                    <time dateTime={m.createdAt}>{formatDate(m.createdAt)}</time>
                                </div>
                                <a href={`mailto:${m.email}`} dir="ltr" className="message-email">{m.email}</a>
                                <p>{m.message}</p>
                                <a className="service-link" href={`mailto:${m.email}`}>{t.reply}</a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {tab === "projects" && (
                <section className="admin-projects">
                    <form className="admin-card" onSubmit={addProject}>
                        <h2>{t.addProject}</h2>
                        <label className="auth-field">
                            <span>{t.projectTitle}</span>
                            <input required maxLength={200} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        </label>
                        <label className="auth-field">
                            <span>{t.imageUrl}</span>
                            <input type="url" required maxLength={1000} dir="ltr" placeholder="https://" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                            <small>{t.imageHint}</small>
                        </label>
                        <label className="auth-field">
                            <span>{t.description}</span>
                            <input required maxLength={60} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </label>
                        <button type="submit" className="auth-submit" disabled={adding}>{adding ? t.adding : t.add}</button>
                    </form>

                    <div>
                        {projects === null && <p className="admin-empty">{t.loading}</p>}
                        {projects?.length === 0 && <p className="admin-empty">{t.noProjects}</p>}
                        <ul className="admin-grid">
                            {projects?.map((p) => (
                                <li key={p.id} className="admin-card project">
                                    <img src={p.imageUrl} alt={p.title} loading="lazy" />
                                    <div className="project-body">
                                        <strong>{p.title}</strong>
                                        <span>{p.description}</span>
                                        <button type="button" className="danger" onClick={() => removeProject(p.id)}>{t.remove}</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </main>
    );
};

export default Admin;
