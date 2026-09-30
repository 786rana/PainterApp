import type { Design } from "../api/accountApi";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";

type Lang = "en" | "ar";

type Props = {
    lang: Lang;
    setLang: (l: Lang) => void;
    onLogin: () => void;
};

type Swatch = { header: string; hero: string; accent: string; action: string; page: string; radius: number };

const designs: { id: Design; name: { en: string; ar: string }; desc: { en: string; ar: string }; swatch: Swatch }[] = [
    {
        id: "warm",
        name: { en: "Warm", ar: "دافئ" },
        desc: {
            en: "Cream and orange with elegant serif headings. Warm and premium.",
            ar: "كريمي وبرتقالي بعناوين أنيقة. دافئ وفاخر.",
        },
        swatch: { header: "#ffffff", hero: "#3a2a22", accent: "#ffb347", action: "#f26a00", page: "#fbf8f4", radius: 10 },
    },
    {
        id: "midnight",
        name: { en: "Midnight", ar: "منتصف الليل" },
        desc: {
            en: "Deep navy and electric blue with a dark header. Bold and professional.",
            ar: "كحلي داكن وأزرق زاهٍ مع شريط علوي داكن. جريء ومهني.",
        },
        swatch: { header: "#0a1830", hero: "#0a1830", accent: "#ffd166", action: "#2f6bff", page: "#f3f6fc", radius: 4 },
    },
    {
        id: "fresh",
        name: { en: "Fresh", ar: "منعش" },
        desc: {
            en: "Airy teal and coral with rounded shapes. Friendly and modern.",
            ar: "تركوازي ومرجاني بأشكال مستديرة. ودود وعصري.",
        },
        swatch: { header: "#ffffff", hero: "#0d3b3a", accent: "#ffd27a", action: "#ff6a3d", page: "#f3faf8", radius: 16 },
    },
];

const text = {
    en: {
        title: "Settings",
        subtitle: "Choose how the website looks for you.",
        back: "← Back to website",
        profile: "Profile",
        guest: "You are browsing as a guest",
        guestHint: "Your choices are saved in this browser. Log in to keep them on all your devices.",
        login: "Log in",
        signedIn: "Signed in as",
        syncHint: "Your design is saved to your account and follows you to other devices.",
        logout: "Log out",
        appearance: "Appearance",
        appearanceSub: "Pick a design. It applies immediately.",
        active: "Selected",
        choose: "Use this design",
        language: "Language",
        english: "English",
        arabic: "العربية",
        dashboard: "Open dashboard",
    },
    ar: {
        title: "الإعدادات",
        subtitle: "اختر شكل الموقع الذي يناسبك.",
        back: "→ العودة إلى الموقع",
        profile: "الملف الشخصي",
        guest: "أنت تتصفح كزائر",
        guestHint: "تُحفظ اختياراتك في هذا المتصفح. سجّل الدخول للاحتفاظ بها على جميع أجهزتك.",
        login: "تسجيل الدخول",
        signedIn: "تم تسجيل الدخول باسم",
        syncHint: "يُحفظ التصميم في حسابك ويظهر لك على أجهزتك الأخرى.",
        logout: "تسجيل الخروج",
        appearance: "المظهر",
        appearanceSub: "اختر تصميماً. يُطبَّق فوراً.",
        active: "محدد",
        choose: "استخدم هذا التصميم",
        language: "اللغة",
        english: "English",
        arabic: "العربية",
        dashboard: "فتح لوحة التحكم",
    },
};

const Settings = ({ lang, setLang, onLogin }: Props) => {
    const t = text[lang];
    const { user, logout } = useAuth();
    const { design, setDesign } = useTheme();

    return (
        <main className="admin settings" id="main">
            <header className="admin-header">
                <div>
                    <h1>{t.title}</h1>
                    <p className="admin-subtitle">{t.subtitle}</p>
                    <a className="admin-back" href="#home">{t.back}</a>
                </div>
            </header>

            <section className="admin-card settings-profile" aria-labelledby="profile-title">
                <h2 id="profile-title">{t.profile}</h2>
                {user ? (
                    <div className="settings-profile-row">
                        <span className="account-avatar big" aria-hidden="true">{user.email.charAt(0).toUpperCase()}</span>
                        <div className="settings-profile-body">
                            <span>{t.signedIn}</span>
                            <strong dir="ltr">{user.email}</strong>
                            <small>{t.syncHint}</small>
                        </div>
                        <div className="settings-profile-actions">
                            <a className="account-logout" href="#/admin">{t.dashboard}</a>
                            <button type="button" className="account-logout" onClick={logout}>{t.logout}</button>
                        </div>
                    </div>
                ) : (
                    <div className="settings-profile-row">
                        <span className="account-avatar big" aria-hidden="true">?</span>
                        <div className="settings-profile-body">
                            <strong>{t.guest}</strong>
                            <small>{t.guestHint}</small>
                        </div>
                        <div className="settings-profile-actions">
                            <button type="button" className="auth-submit settings-login" onClick={onLogin}>{t.login}</button>
                        </div>
                    </div>
                )}
            </section>

            <section className="settings-section" aria-labelledby="appearance-title">
                <h2 id="appearance-title">{t.appearance}</h2>
                <p className="settings-sub">{t.appearanceSub}</p>

                <div className="design-grid" role="radiogroup" aria-labelledby="appearance-title">
                    {designs.map((d) => {
                        const selected = design === d.id;
                        return (
                            <button
                                key={d.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                className={`design-card ${selected ? "on" : ""}`}
                                onClick={() => setDesign(d.id)}
                            >
                                <span className="design-preview" style={{ background: d.swatch.page }} aria-hidden="true">
                                    <span className="dp-header" style={{ background: d.swatch.header }}>
                                        <i style={{ background: d.swatch.action, borderRadius: d.swatch.radius }} />
                                    </span>
                                    <span className="dp-hero" style={{ background: d.swatch.hero }}>
                                        <b style={{ background: d.swatch.accent }} />
                                        <em style={{ background: "rgba(255,255,255,.85)" }} />
                                        <u style={{ background: d.swatch.action, borderRadius: d.swatch.radius * 2 }} />
                                    </span>
                                    <span className="dp-cards">
                                        {[0, 1, 2].map((n) => (
                                            <s key={n} style={{ borderRadius: d.swatch.radius }} />
                                        ))}
                                    </span>
                                </span>
                                <span className="design-meta">
                                    <strong>{lang === "ar" ? d.name.ar : d.name.en}</strong>
                                    <span>{lang === "ar" ? d.desc.ar : d.desc.en}</span>
                                    <span className={`design-badge ${selected ? "on" : ""}`}>
                                        {selected ? `✓ ${t.active}` : t.choose}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="settings-section" aria-labelledby="language-title">
                <h2 id="language-title">{t.language}</h2>
                <div className="lang-choice" role="radiogroup" aria-labelledby="language-title">
                    <button type="button" role="radio" aria-checked={lang === "en"} className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
                        {t.english}
                    </button>
                    <button type="button" role="radio" aria-checked={lang === "ar"} className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")}>
                        {t.arabic}
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Settings;
