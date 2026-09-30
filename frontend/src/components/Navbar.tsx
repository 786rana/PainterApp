import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import CallButton from "./CallButton";
import type { AuthMode } from "./AuthModal";
import { useActiveSection } from "../hooks/useScrollEffects";
import { CloseIcon, MenuIcon, SettingsIcon } from "./Icons";
import { useServiceCategories } from "../data/ServicesContext";
import { categoryHref, serviceHref } from "../data/services";

type Lang = "en" | "ar";

const navLinks = {
    en: [
        { label: "Home", href: "#home" },
        { label: "Our Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ],
    ar: [
        { label: "الرئيسية", href: "#home" },
        { label: "أعمالنا", href: "#work" },
        { label: "من نحن", href: "#about" },
        { label: "اتصل بنا", href: "#contact" },
    ],
};

const Navbar = ({
    lang,
    setLang,
    onAuth,
}: {
    lang: Lang;
    setLang: (l: Lang) => void;
    onAuth: (mode: AuthMode) => void;
}) => {
    const { user, logout } = useAuth();
    const { categories: serviceCategories } = useServiceCategories();
    const active = useActiveSection(["home", "services", "work", "about", "contact"]);
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                setServicesOpen(false);
                setMobileServicesOpen(false);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const closeMenu = () => {
        setOpen(false);
        setServicesOpen(false);
        setMobileServicesOpen(false);
    };

    const servicesLabel = lang === "ar" ? "الخدمات" : "Services";

    return (
        <>
            <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <a href="#home" className="logo" onClick={closeMenu}>
                    <img
                        src="/logo-icon.svg"
                        alt={lang === "ar" ? "زمان للدهانات والديكور" : "Zaman Paints & Decor"}
                    />
                    <div className="logo-text">
                        <h2>{lang === "ar" ? "زمان" : "Zaman"}</h2>
                        <span>{lang === "ar" ? "للدهانات والديكور" : "Paints & Decor"}</span>
                    </div>
                </a>

                <nav className={`nav ${open ? "active" : ""}`} aria-label="Main navigation">
                    <a href="#home" className={active === "home" ? "active" : ""} onClick={closeMenu}>
                        {navLinks[lang][0].label}
                    </a>

                    {/* Desktop services dropdown */}
                    <div
                        className={`nav-dropdown ${servicesOpen ? "open" : ""}`}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setServicesOpen(false);
                        }}
                    >
                        <button
                            type="button"
                            className={`nav-dropdown-trigger ${active === "services" ? "active" : ""}`}
                            aria-expanded={servicesOpen}
                            aria-haspopup="true"
                            onClick={() => setServicesOpen((v) => !v)}
                        >
                            {servicesLabel}
                            <span className="nav-chevron" aria-hidden="true">▾</span>
                        </button>

                        <div className="nav-dropdown-menu">
                            {serviceCategories.map((cat) => (
                                <div key={cat.id} className="nav-dropdown-group">
                                    <a
                                        href={categoryHref(cat.id)}
                                        className="nav-dropdown-heading"
                                        onClick={closeMenu}
                                    >
                                        {lang === "ar" ? cat.label.ar : cat.label.en}
                                    </a>
                                    {cat.services.map((s) => (
                                        <a
                                            key={s.id}
                                            href={serviceHref(s.id)}
                                            className="nav-dropdown-item"
                                            onClick={closeMenu}
                                        >
                                            {lang === "ar" ? s.title.ar : s.title.en}
                                        </a>
                                    ))}
                                </div>
                            ))}
                            <a href="#services" className="nav-dropdown-all" onClick={closeMenu}>
                                {lang === "ar" ? "عرض كل الخدمات ←" : "View all services →"}
                            </a>
                        </div>
                    </div>

                    {/* Mobile services accordion */}
                    <div className={`nav-mobile-services ${mobileServicesOpen ? "open" : ""}`}>
                        <button
                            type="button"
                            className="nav-mobile-services-trigger"
                            onClick={() => setMobileServicesOpen((v) => !v)}
                            aria-expanded={mobileServicesOpen}
                        >
                            {servicesLabel}
                            <span className="nav-chevron" aria-hidden="true">▾</span>
                        </button>
                        <div className="nav-mobile-services-panel">
                            {serviceCategories.map((cat) => (
                                <div key={cat.id} className="nav-mobile-group">
                                    <a
                                        href={categoryHref(cat.id)}
                                        className="nav-mobile-heading"
                                        onClick={closeMenu}
                                    >
                                        {lang === "ar" ? cat.label.ar : cat.label.en}
                                    </a>
                                    {cat.services.map((s) => (
                                        <a
                                            key={s.id}
                                            href={serviceHref(s.id)}
                                            className="nav-mobile-item"
                                            onClick={closeMenu}
                                        >
                                            {lang === "ar" ? s.title.ar : s.title.en}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {navLinks[lang].slice(1).map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={active === link.href.slice(1) ? "active" : ""}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </a>
                    ))}

                    <div className="nav-mobile-account">
                        <a href="#/settings" className="mobile-dashboard" onClick={closeMenu}>
                            {lang === "ar" ? "الإعدادات والمظهر" : "Settings & appearance"}
                        </a>
                        {user ? (
                            <>
                                <span className="account-email" dir="ltr">{user.email}</span>
                                <a href="#/admin" className="mobile-dashboard" onClick={closeMenu}>
                                    {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
                                </a>
                                <button type="button" onClick={() => { logout(); closeMenu(); }}>
                                    {lang === "ar" ? "تسجيل الخروج" : "Log out"}
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button" onClick={() => { closeMenu(); onAuth("login"); }}>
                                    {lang === "ar" ? "تسجيل الدخول" : "Log in"}
                                </button>
                                <button type="button" className="solid" onClick={() => { closeMenu(); onAuth("register"); }}>
                                    {lang === "ar" ? "إنشاء حساب" : "Create account"}
                                </button>
                            </>
                        )}
                    </div>
                </nav>

                <div className="nav-actions">
                    {user ? (
                        <div className="account">
                            <span className="account-avatar" aria-hidden="true">
                                {user.email.charAt(0).toUpperCase()}
                            </span>
                            <span className="account-email" dir="ltr">{user.email}</span>
                            <a href="#/admin" className="account-logout">
                                {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
                            </a>
                            <button type="button" className="account-logout" onClick={logout}>
                                {lang === "ar" ? "خروج" : "Log out"}
                            </button>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <button type="button" className="auth-link" onClick={() => onAuth("login")}>
                                {lang === "ar" ? "دخول" : "Log in"}
                            </button>
                            <button type="button" className="auth-link auth-link--solid" onClick={() => onAuth("register")}>
                                {lang === "ar" ? "إنشاء حساب" : "Sign up"}
                            </button>
                        </div>
                    )}

                    <a
                        href="#/settings"
                        className="icon-btn"
                        aria-label={lang === "ar" ? "الإعدادات والمظهر" : "Settings and appearance"}
                        title={lang === "ar" ? "الإعدادات والمظهر" : "Settings and appearance"}
                    >
                        <SettingsIcon />
                    </a>

                    <button
                        className="lang-btn"
                        onClick={() => setLang(lang === "en" ? "ar" : "en")}
                        aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
                    >
                        {lang === "en" ? "عربي" : "EN"}
                    </button>

                    <CallButton lang={lang} />

                    <button
                        className="menu-btn"
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-label={open ? "Close menu" : "Open menu"}
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </header>

            <div
                className={`mobile-backdrop ${open ? "active" : ""}`}
                onClick={closeMenu}
                aria-hidden="true"
            />
        </>
    );
};

export default Navbar;
