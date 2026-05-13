/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type Lang = "en" | "ar";

const Navbar = ({
    lang,
    setLang,
}: {
    lang: Lang;
    setLang: (l: Lang) => void;
}) => {
    const [open, setOpen] = useState(false);

    const menu = {
        en: ["Home", "Services", "Projects", "About", "Contact"],
        ar: ["الرئيسية", "الخدمات", "المشاريع", "من نحن", "اتصل بنا"],
    };

    return (
        <header className="navbar">
            {/* LOGO */}
            <div className="logo">
                <span className="logo-icon">🎨</span>
                <div>
                    <h2>Zaman</h2>
                    <span>Paints & Decor</span>
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className={`nav ${open ? "active" : ""}`}>
                <a href="#home">{menu[lang][0]}</a>
                <a href="#services">{menu[lang][1]}</a>
                <a href="#projects">{menu[lang][2]}</a>
                <a href="#about">{menu[lang][3]}</a>
                <a href="#contact">{menu[lang][4]}</a>
            </nav>

            {/* RIGHT */}
            <div className="nav-actions">

                <button
                    className="lang-btn"
                    onClick={() => setLang(lang === "en" ? "ar" : "en")}
                >
                    {lang === "en" ? "AR" : "EN"}
                </button>

                <a href="tel:+966597507224" className="quote-btn">
                    Call Now
                </a>

                <button
                    className="menu-btn"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Navbar;
///* eslint-disable @typescript-eslint/no-explicit-any */
//import { useState } from "react";

//type Lang = "en" | "ar";

//const Navbar = ({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) => {
//    const [open, setOpen] = useState(false);

//    const menu = {
//        en: ["Home", "Services", "Work", "Contact"],
//        ar: ["الرئيسية", "الخدمات", "أعمالنا", "اتصل بنا"]
//    };

//    return (
//        <header className="navbar" dir={lang === "ar" ? "rtl" : "ltr"}>

//            <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
//                Zaman Paints & Decor
//            </div>

//            <div className="nav-right">

//                <nav className={`nav ${open ? "active" : ""}`} aria-label={lang === "ar" ? "قائمة التنقل" : "Main navigation"}>
//                    <a href="#home">{menu[lang][0]}</a>
//                    <a href="#services">{menu[lang][1]}</a>
//                    <a href="#work">{menu[lang][2]}</a>
//                    <a href="#contact">{menu[lang][3]}</a>
//                </nav>

//                {/* Language Toggle */}
//                <button
//                    className="lang-btn"
//                    onClick={() => setLang(lang === "en" ? "ar" : "en")}
//                    aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
//                >
//                    {lang === "en" ? "AR" : "EN"}
//                </button>

//                {/* Call Button */}
//                <a href="tel:+966597507224" className="call-btn" aria-label={lang === "ar" ? "اتصل الان" : "Call now"}>
//                    📞
//                </a>

//                {/* Mobile Menu */}
//                <button
//                    className={`menu ${open ? 'open' : ''}`}
//                    onClick={() => {
//                        setOpen(!open);
//                        // lock background scroll when menu open
//                        if (!open) document.body.style.overflow = 'hidden';
//                        else document.body.style.overflow = '';
//                    }}
//                    aria-expanded={open}
//                    aria-label={open ? (lang === "ar" ? "اغلاق القائمة" : "Close menu") : (lang === "ar" ? "فتح القائمة" : "Open menu")}
//                >
//                    ☰
//                </button>
//            </div>

//        </header>
//    );
//};

//export default Navbar;
