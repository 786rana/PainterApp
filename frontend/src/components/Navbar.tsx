import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import { SITE } from "../data/site";
import { categoryHref, serviceCategories, serviceHref } from "../data/services";

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
}: {
    lang: Lang;
    setLang: (l: Lang) => void;
}) => {
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
                    <a href="#home" onClick={closeMenu}>
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
                            className="nav-dropdown-trigger"
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
                        <a key={link.href} href={link.href} onClick={closeMenu}>
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="nav-actions">
                    <button
                        className="lang-btn"
                        onClick={() => setLang(lang === "en" ? "ar" : "en")}
                        aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
                    >
                        {lang === "en" ? "عربي" : "EN"}
                    </button>

                    <a href={SITE.phoneHref} className="quote-btn">
                        {lang === "ar" ? "اتصل الآن" : "Call Now"}
                    </a>

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
