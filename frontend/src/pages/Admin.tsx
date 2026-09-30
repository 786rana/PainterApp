import axios from "axios";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
    createProject,
    createService,
    deleteProject,
    deleteService,
    getContacts,
    updateService,
} from "../api/adminApi";
import { getProjects } from "../api/projectApi";
import { getServices } from "../api/serviceApi";
import { useAuth } from "../auth/AuthContext";
import { services as sampleServices } from "../data/services";
import type { ContactMessage } from "../types/contact";
import type { Project } from "../types/project";
import type { NewService, Service, ServiceCategoryKey } from "../types/service";

type Lang = "en" | "ar";
type Tab = "messages" | "services" | "projects";

const text = {
    en: {
        title: "Dashboard",
        subtitle: "Manage your website content",
        back: "← Back to website",
        logout: "Log out",
        messages: "Messages",
        services: "Services",
        projects: "Projects",
        refresh: "Refresh",
        loading: "Loading…",
        noMessages: "No messages yet. Messages sent from the contact form appear here.",
        noProjects: "No projects yet. Add your first project — it will replace the sample gallery on the website.",
        noServices: "No services yet. The website is showing its built-in sample services.",
        importSamples: "Import the sample services",
        importing: "Importing…",
        importHint: "Copies the 12 sample services into your dashboard so you can edit, reorder or remove them.",
        reply: "Reply by email",
        addProject: "Add a project",
        projectTitle: "Title",
        imageUrl: "Image URL",
        imageHint: "Link to a photo (https://…). Upload the photo to a host first, then paste its link.",
        description: "Short description",
        add: "Add project",
        adding: "Adding…",
        remove: "Delete",
        edit: "Edit",
        cancel: "Cancel",
        confirmDelete: "Delete this item? This cannot be undone.",
        needLogin: "Please log in to open the dashboard.",
        login: "Log in",
        expired: "Your session has expired. Please log in again.",
        failed: "Something went wrong. Please try again.",
        added: "Project added.",
        serviceAdded: "Service added.",
        serviceSaved: "Service updated.",
        addService: "Add a service",
        editService: "Edit service",
        saveService: "Save service",
        saveChanges: "Save changes",
        saving: "Saving…",
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        descEn: "Description (English)",
        descAr: "Description (Arabic)",
        category: "Category",
        painting: "Painting Services",
        ceiling: "Ceiling Design",
        order: "Order",
        orderHint: "Smaller numbers appear first.",
        optional: "optional",
        imageOptional: "Leave empty to use a default picture.",
    },
    ar: {
        title: "لوحة التحكم",
        subtitle: "إدارة محتوى موقعك",
        back: "→ العودة إلى الموقع",
        logout: "تسجيل الخروج",
        messages: "الرسائل",
        services: "الخدمات",
        projects: "المشاريع",
        refresh: "تحديث",
        loading: "جارٍ التحميل…",
        noMessages: "لا توجد رسائل بعد. ستظهر هنا الرسائل المرسلة من نموذج التواصل.",
        noProjects: "لا توجد مشاريع بعد. أضف مشروعك الأول — سيحل محل المعرض التجريبي في الموقع.",
        noServices: "لا توجد خدمات بعد. الموقع يعرض حالياً الخدمات التجريبية المدمجة.",
        importSamples: "استيراد الخدمات التجريبية",
        importing: "جارٍ الاستيراد…",
        importHint: "ينسخ الخدمات التجريبية الـ12 إلى لوحتك لتتمكن من تعديلها أو ترتيبها أو حذفها.",
        reply: "الرد عبر البريد",
        addProject: "إضافة مشروع",
        projectTitle: "العنوان",
        imageUrl: "رابط الصورة",
        imageHint: "رابط صورة (https://…). ارفع الصورة على استضافة أولاً ثم الصق رابطها.",
        description: "وصف مختصر",
        add: "إضافة المشروع",
        adding: "جارٍ الإضافة…",
        remove: "حذف",
        edit: "تعديل",
        cancel: "إلغاء",
        confirmDelete: "حذف هذا العنصر؟ لا يمكن التراجع.",
        needLogin: "يرجى تسجيل الدخول لفتح لوحة التحكم.",
        login: "تسجيل الدخول",
        expired: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.",
        failed: "حدث خطأ ما. حاول مرة أخرى.",
        added: "تمت إضافة المشروع.",
        serviceAdded: "تمت إضافة الخدمة.",
        serviceSaved: "تم تحديث الخدمة.",
        addService: "إضافة خدمة",
        editService: "تعديل الخدمة",
        saveService: "حفظ الخدمة",
        saveChanges: "حفظ التغييرات",
        saving: "جارٍ الحفظ…",
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        descEn: "الوصف (إنجليزي)",
        descAr: "الوصف (عربي)",
        category: "التصنيف",
        painting: "خدمات الدهان",
        ceiling: "تصميم الأسقف",
        order: "الترتيب",
        orderHint: "الأرقام الأصغر تظهر أولاً.",
        optional: "اختياري",
        imageOptional: "اتركه فارغاً لاستخدام صورة افتراضية.",
    },
};

const isUnauthorized = (e: unknown) => axios.isAxiosError(e) && e.response?.status === 401;

const emptyService: NewService = {
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    imageUrl: "",
    category: "painting",
    sortOrder: 0,
};

type Props = { lang: Lang; onLogin: () => void };

const Admin = ({ lang, onLogin }: Props) => {
    const t = text[lang];
    const { user, logout } = useAuth();
    const [tab, setTab] = useState<Tab>("messages");
    const [messages, setMessages] = useState<ContactMessage[] | null>(null);
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [services, setServices] = useState<Service[] | null>(null);
    const [notice, setNotice] = useState<{ kind: "ok" | "bad"; text: string } | null>(null);
    const [form, setForm] = useState({ title: "", imageUrl: "", description: "" });
    const [adding, setAdding] = useState(false);
    const [serviceForm, setServiceForm] = useState<NewService>(emptyService);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [busy, setBusy] = useState(false);

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

    const loadServices = useCallback(() => {
        setServices(null);
        getServices().then(setServices).catch((e) => { setServices([]); fail(e); });
    }, [fail]);

    const signedIn = !!user;
    useEffect(() => {
        if (!signedIn) return;
        loadMessages();
        loadProjects();
        loadServices();
    }, [signedIn, loadMessages, loadProjects, loadServices]);

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

    const startEdit = (s: Service) => {
        setEditingId(s.id);
        setServiceForm({
            title: s.title,
            titleAr: s.titleAr,
            description: s.description,
            descriptionAr: s.descriptionAr,
            imageUrl: s.imageUrl,
            category: s.category,
            sortOrder: s.sortOrder,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetServiceForm = () => {
        setEditingId(null);
        setServiceForm(emptyService);
    };

    const saveService = async (e: FormEvent) => {
        e.preventDefault();
        setBusy(true);
        setNotice(null);
        const payload: NewService = {
            ...serviceForm,
            title: serviceForm.title.trim(),
            titleAr: serviceForm.titleAr.trim(),
            description: serviceForm.description.trim(),
            descriptionAr: serviceForm.descriptionAr.trim(),
            imageUrl: serviceForm.imageUrl.trim(),
        };
        try {
            if (editingId !== null) {
                await updateService(editingId, payload);
                setNotice({ kind: "ok", text: t.serviceSaved });
            } else {
                await createService({ ...payload, sortOrder: payload.sortOrder || (services?.length ?? 0) + 1 });
                setNotice({ kind: "ok", text: t.serviceAdded });
            }
            resetServiceForm();
            loadServices();
        } catch (err) {
            fail(err);
        } finally {
            setBusy(false);
        }
    };

    const removeService = async (id: number) => {
        if (!window.confirm(t.confirmDelete)) return;
        try {
            await deleteService(id);
            if (editingId === id) resetServiceForm();
            loadServices();
        } catch (err) {
            fail(err);
        }
    };

    const importSamples = async () => {
        setBusy(true);
        setNotice(null);
        try {
            let order = 1;
            for (const s of sampleServices) {
                await createService({
                    title: s.title.en,
                    titleAr: s.title.ar,
                    description: s.desc.en,
                    descriptionAr: s.desc.ar,
                    imageUrl: s.img,
                    category: s.category as ServiceCategoryKey,
                    sortOrder: order++,
                });
            }
            loadServices();
        } catch (err) {
            fail(err);
            loadServices();
        } finally {
            setBusy(false);
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

    const tabs: { id: Tab; label: string; count: number | null }[] = [
        { id: "messages", label: t.messages, count: messages?.length ?? null },
        { id: "services", label: t.services, count: services?.length ?? null },
        { id: "projects", label: t.projects, count: projects?.length ?? null },
    ];

    const categoryName = (c: ServiceCategoryKey) => (c === "painting" ? t.painting : t.ceiling);

    return (
        <main className="admin" id="main">
            <header className="admin-header">
                <div>
                    <h1>{t.title}</h1>
                    <p className="admin-subtitle">{t.subtitle}</p>
                    <a className="admin-back" href="#home">{t.back}</a>
                </div>
                <div className="admin-user">
                    <span className="account-avatar" aria-hidden="true">{user.email.charAt(0).toUpperCase()}</span>
                    <span dir="ltr">{user.email}</span>
                    <button type="button" className="account-logout" onClick={logout}>{t.logout}</button>
                </div>
            </header>

            <div className="admin-stats">
                {tabs.map((x) => (
                    <button
                        key={x.id}
                        type="button"
                        className={`admin-stat ${tab === x.id ? "on" : ""}`}
                        aria-pressed={tab === x.id}
                        onClick={() => setTab(x.id)}
                    >
                        <strong>{x.count ?? "…"}</strong>
                        <span>{x.label}</span>
                    </button>
                ))}
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

            {tab === "services" && (
                <section className="admin-projects">
                    <form className="admin-card" onSubmit={saveService}>
                        <h2>{editingId !== null ? t.editService : t.addService}</h2>
                        <label className="auth-field">
                            <span>{t.titleEn}</span>
                            <input required maxLength={200} value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} />
                        </label>
                        <label className="auth-field">
                            <span>{t.titleAr} <em>({t.optional})</em></span>
                            <input maxLength={200} dir="rtl" value={serviceForm.titleAr} onChange={(e) => setServiceForm({ ...serviceForm, titleAr: e.target.value })} />
                        </label>
                        <label className="auth-field">
                            <span>{t.descEn}</span>
                            <textarea required rows={3} maxLength={2000} value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} />
                        </label>
                        <label className="auth-field">
                            <span>{t.descAr} <em>({t.optional})</em></span>
                            <textarea rows={3} maxLength={2000} dir="rtl" value={serviceForm.descriptionAr} onChange={(e) => setServiceForm({ ...serviceForm, descriptionAr: e.target.value })} />
                        </label>
                        <label className="auth-field">
                            <span>{t.imageUrl} <em>({t.optional})</em></span>
                            <input type="url" maxLength={1000} dir="ltr" placeholder="https://" value={serviceForm.imageUrl} onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })} />
                            <small>{t.imageOptional}</small>
                        </label>
                        <div className="contact-form-row">
                            <label className="auth-field">
                                <span>{t.category}</span>
                                <select value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategoryKey })}>
                                    <option value="painting">{t.painting}</option>
                                    <option value="ceiling-design">{t.ceiling}</option>
                                </select>
                            </label>
                            <label className="auth-field">
                                <span>{t.order}</span>
                                <input type="number" min={0} max={9999} dir="ltr" value={serviceForm.sortOrder} onChange={(e) => setServiceForm({ ...serviceForm, sortOrder: Number(e.target.value) || 0 })} />
                                <small>{t.orderHint}</small>
                            </label>
                        </div>
                        <div className="admin-form-actions">
                            <button type="submit" className="auth-submit" disabled={busy}>
                                {busy ? t.saving : editingId !== null ? t.saveChanges : t.saveService}
                            </button>
                            {editingId !== null && (
                                <button type="button" className="account-logout" onClick={resetServiceForm}>{t.cancel}</button>
                            )}
                        </div>
                    </form>

                    <div>
                        {services === null && <p className="admin-empty">{t.loading}</p>}
                        {services?.length === 0 && (
                            <div className="admin-empty">
                                <p>{t.noServices}</p>
                                <p className="admin-empty-hint">{t.importHint}</p>
                                <button type="button" className="auth-submit admin-import" onClick={importSamples} disabled={busy}>
                                    {busy ? t.importing : t.importSamples}
                                </button>
                            </div>
                        )}
                        <ul className="admin-rows">
                            {services?.map((s) => (
                                <li key={s.id} className={`admin-card admin-row ${editingId === s.id ? "editing" : ""}`}>
                                    {s.imageUrl ? <img src={s.imageUrl} alt="" loading="lazy" /> : <div className="admin-row-ph" aria-hidden="true" />}
                                    <div className="admin-row-body">
                                        <strong>{lang === "ar" && s.titleAr ? s.titleAr : s.title}</strong>
                                        <span>{categoryName(s.category)} · #{s.sortOrder}</span>
                                    </div>
                                    <div className="admin-row-actions">
                                        <button type="button" className="account-logout" onClick={() => startEdit(s)}>{t.edit}</button>
                                        <button type="button" className="danger" onClick={() => removeService(s.id)}>{t.remove}</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
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
