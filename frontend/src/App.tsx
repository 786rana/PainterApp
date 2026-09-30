import { useCallback, useEffect, useState } from "react";
import AuthModal, { type AuthMode } from "./components/AuthModal";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Testimonials from "./components/Testimonials";
import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer";
import "./App.css";
import "./theme.css";
import "./themes.css";
import CountUp from "./components/CountUp";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./components/Icons";
import { useReveal } from "./hooks/useScrollEffects";
import { getProjects } from "./api/projectApi";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import type { Project } from "./types/project";
import { SITE, whatsappQuoteHref } from "./data/site";
import { useServiceCategories } from "./data/ServicesContext";
import { categoryLabel, imageAlt, projects } from "./data/services";

const whyItems = [
    {
        icon: "team",
        title: { en: "Professional Team", ar: "فريق محترف" },
        desc: {
            en: "Skilled painters with years of experience in residential and commercial projects.",
            ar: "فنيون ماهرون بخبرة سنوات في المشاريع السكنية والتجارية.",
        },
    },
    {
        icon: "price",
        title: { en: "Affordable Prices", ar: "أسعار مناسبة" },
        desc: {
            en: "Competitive rates with transparent quotes — no hidden costs.",
            ar: "أسعار تنافسية مع عروض شفافة — بدون تكاليف مخفية.",
        },
    },
    {
        icon: "quality",
        title: { en: "Premium Materials", ar: "مواد فاخرة" },
        desc: {
            en: "We use top-quality paints and finishes for lasting, beautiful results.",
            ar: "نستخدم دهانات وتشطيبات عالية الجودة لنتائج دائمة وجميلة.",
        },
    },
    {
        icon: "speed",
        title: { en: "Fast Delivery", ar: "تسليم سريع" },
        desc: {
            en: "On-time project completion without compromising on quality.",
            ar: "إنجاز المشاريع في الوقت المحدد دون التنازل عن الجودة.",
        },
    },
];

const processSteps = [
    {
        title: { en: "Free Quote", ar: "عرض سعر مجاني" },
        desc: {
            en: "Message us on WhatsApp with photos of your space and get a quotation fast.",
            ar: "راسلنا عبر واتساب مع صور للمكان واحصل على عرض سعر سريع.",
        },
    },
    {
        title: { en: "Site Visit", ar: "معاينة الموقع" },
        desc: {
            en: "We inspect the surfaces and agree colours, scope and timeline with you.",
            ar: "نعاين الأسطح ونتفق معك على الألوان ونطاق العمل والجدول الزمني.",
        },
    },
    {
        title: { en: "Professional Work", ar: "تنفيذ احترافي" },
        desc: {
            en: "Surface preparation, priming and painting by our skilled team.",
            ar: "تجهيز الأسطح والمعجون والدهان بواسطة فريقنا الماهر.",
        },
    },
    {
        title: { en: "Final Handover", ar: "التسليم النهائي" },
        desc: {
            en: "We clean up and walk through every detail with you before we finish.",
            ar: "ننظف الموقع ونراجع معك كل التفاصيل قبل التسليم.",
        },
    },
];

const content = {
    en: {
        processLabel: "How It Works",
        processTitle: "A Simple 4-Step Process",
        processSub: "From your first message to the final handover",
        callNow: "Call",
        servicesLabel: "What We Offer",
        servicesTitle: "Our Services",
        servicesSub: "Complete painting solutions for homes and commercial spaces across Saudi Arabia",
        workLabel: "Portfolio",
        workTitle: "Our Work",
        workSub: "Recent painting projects delivered with precision and care",
        aboutLabel: "Why Us",
        aboutTitle: "Why Choose Us?",
        aboutSub: "We combine craftsmanship, quality materials, and reliable service",
        contactLabel: "Get In Touch",
        contactTitle: "Contact Us",
        contactSub: "Available 7 days a week — reach out for a free quotation",
        ctaTitle: "Need Professional Painting?",
        ctaSub: "Get your free quotation within 10 minutes via WhatsApp",
        projects: "Projects Completed",
        experience: "Years Experience",
        satisfaction: "Customer Satisfaction",
        quote: "Get Free Quote",
        whatsapp: "Chat on WhatsApp",
        location: "Riyadh & across Saudi Arabia",
        phone: "Phone",
        locationLabel: "Location",
        chat: "WhatsApp",
    },
    ar: {
        processLabel: "كيف نعمل",
        processTitle: "4 خطوات بسيطة",
        processSub: "من رسالتك الأولى حتى التسليم النهائي",
        callNow: "اتصل",
        servicesLabel: "ما نقدمه",
        servicesTitle: "خدماتنا",
        servicesSub: "حلول طلاء متكاملة للمنازل والمساحات التجارية في جميع أنحاء السعودية",
        workLabel: "معرض الأعمال",
        workTitle: "أعمالنا",
        workSub: "مشاريع طلاء حديثة نُفذت بدقة وعناية",
        aboutLabel: "لماذا نحن",
        aboutTitle: "لماذا تختارنا؟",
        aboutSub: "نجمع بين الحرفية والمواد عالية الجودة والخدمة الموثوقة",
        contactLabel: "تواصل معنا",
        contactTitle: "اتصل بنا",
        contactSub: "متاحون 7 أيام في الأسبوع — تواصل للحصول على عرض سعر مجاني",
        ctaTitle: "هل تحتاج خدمة طلاء احترافية؟",
        ctaSub: "احصل على عرض سعر مجاني خلال 10 دقائق عبر واتساب",
        projects: "مشاريع مكتملة",
        experience: "سنوات خبرة",
        satisfaction: "رضا العملاء",
        quote: "احصل على عرض سعر",
        whatsapp: "الدردشة عبر واتساب",
        location: "الرياض وجميع أنحاء السعودية",
        phone: "الهاتف",
        locationLabel: "الموقع",
        chat: "واتساب",
    },
};

const App = () => {
    const [lang, setLang] = useState<"en" | "ar">(() => {
        try {
            const saved = localStorage.getItem("lang");
            if (saved === "en" || saved === "ar") return saved;
        } catch { /* storage unavailable */ }
        return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
    });
    const t = content[lang];
    const isAr = lang === "ar";
    const { categories: serviceCategories } = useServiceCategories();
    const [authMode, setAuthMode] = useState<AuthMode | null>(null);
    const closeAuth = useCallback(() => setAuthMode(null), []);

    const [route, setRoute] = useState(() => window.location.hash);
    const isAdminRoute = route === "#/admin";
    const isSettingsRoute = route === "#/settings";
    const [apiProjects, setApiProjects] = useState<Project[]>([]);

    useReveal(`${lang}-${route === "#/admin" || route === "#/settings"}`);

    useEffect(() => {
        const onHash = () => setRoute(window.location.hash);
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    // Projects added in the dashboard replace the sample gallery. If the API is
    // unreachable (e.g. a static deployment) the sample gallery stays.
    useEffect(() => {
        getProjects().then(setApiProjects).catch(() => setApiProjects([]));
    }, []);

    const galleryItems = apiProjects.length
        ? apiProjects.map((p) => ({
              title: { en: p.title, ar: p.title },
              desc: { en: p.description, ar: p.description },
              img: p.imageUrl,
              imageName: `api-${p.id}`,
          }))
        : projects;

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = isAr ? "rtl" : "ltr";
        try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
    }, [lang, isAr]);

    if (isSettingsRoute) {
        return (
            <div className="app" dir={isAr ? "rtl" : "ltr"}>
                <Helmet>
                    <title>{isAr ? "الإعدادات | زمان" : "Settings | Zaman Paints & Decor"}</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <Settings lang={lang} setLang={setLang} onLogin={() => setAuthMode("login")} />
                {authMode && (
                    <AuthModal mode={authMode} lang={lang} onModeChange={setAuthMode} onClose={closeAuth} />
                )}
            </div>
        );
    }

    if (isAdminRoute) {
        return (
            <div className="app" dir={isAr ? "rtl" : "ltr"}>
                <Helmet>
                    <title>{isAr ? "لوحة التحكم | زمان" : "Dashboard | Zaman Paints & Decor"}</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <Admin lang={lang} onLogin={() => setAuthMode("login")} />
                {authMode && (
                    <AuthModal mode={authMode} lang={lang} onModeChange={setAuthMode} onClose={closeAuth} />
                )}
            </div>
        );
    }

    return (
        <div className="app" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Helmet htmlAttributes={{ lang, dir: isAr ? "rtl" : "ltr" }}>
                <title>
                    {isAr
                        ? "زمان للدهانات والديكور | خدمات دهان في الرياض والسعودية"
                        : "Zaman Paints & Decor | Painting Services in Saudi Arabia Riyadh"}
                </title>
                <meta
                    name="description"
                    content={isAr
                        ? "خدمات دهان احترافية في السعودية تشمل الدهان الداخلي والخارجي ودهان الفلل والديكور وأسقف الجبس في الرياض وجدة."
                        : "Professional painting services in Saudi Arabia including interior painting, exterior painting, villa painting, wall painting, and decoration services in Riyadh, Jeddah, and KSA."}
                />
                <meta
                    name="keywords"
                    content="painting services Saudi Arabia, Riyadh painters, villa painting KSA, house painting Saudi Arabia, interior painting Riyadh, exterior painting Saudi Arabia, wall painting contractors KSA, Zaman Paints & Decor"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://zamanpaints.com" />
                <meta property="og:title" content={isAr ? "زمان للدهانات والديكور" : "Zaman Paints & Decor Saudi Arabia"} />
                <meta property="og:locale" content={isAr ? "ar_SA" : "en_US"} />
                <meta property="og:description" content={isAr ? "أفضل خدمات الدهان في الرياض والسعودية" : "Best painting services in Riyadh and Saudi Arabia"} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <a href="#main" className="skip-link">
                {isAr ? "تخطي إلى المحتوى" : "Skip to content"}
            </a>
            <Navbar lang={lang} setLang={setLang} onAuth={setAuthMode} />
            {authMode && (
                <AuthModal mode={authMode} lang={lang} onModeChange={setAuthMode} onClose={closeAuth} />
            )}
            <main id="main" tabIndex={-1}>
            <HeroSlider lang={lang} />

            <section className="trust">
                <div className="trust-card">
                    <CountUp end={100} suffix="+" />
                    <p>{t.projects}</p>
                </div>
                <div className="trust-card">
                    <CountUp end={10} suffix="+" />
                    <p>{t.experience}</p>
                </div>
                <div className="trust-card">
                    <CountUp end={100} suffix="%" />
                    <p>{t.satisfaction}</p>
                </div>
            </section>

            <Testimonials lang={lang} />

            <section className="why-us section" id="about">
                <div className="container">
                    <div className="section-header" data-reveal>
                        <span className="section-label">{t.aboutLabel}</span>
                        <h2>{t.aboutTitle}</h2>
                        <p>{t.aboutSub}</p>
                    </div>
                    <div className="why-grid">
                        {whyItems.map((item) => (
                            <div className="why-card" data-reveal key={item.title.en}>
                                <div className={`why-icon why-icon--${item.icon}`} aria-hidden="true" />
                                <h3>{lang === "ar" ? item.title.ar : item.title.en}</h3>
                                <p>{lang === "ar" ? item.desc.ar : item.desc.en}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="services">
                <div className="container">
                    <div className="section-header" data-reveal>
                        <span className="section-label">{t.servicesLabel}</span>
                        <h2>{t.servicesTitle}</h2>
                        <p>{t.servicesSub}</p>
                    </div>

                    {serviceCategories.length > 1 && (
                        <nav className="service-jump" aria-label={t.servicesTitle}>
                            {serviceCategories.map((category) => (
                                <a key={category.id} href={`#services-${category.id}`}>
                                    {isAr ? category.label.ar : category.label.en}
                                    <span>{category.services.length}</span>
                                </a>
                            ))}
                        </nav>
                    )}

                    {serviceCategories.map((category) => (
                        <div
                            key={category.id}
                            id={`services-${category.id}`}
                            className={`service-category service-category--${category.id}`}
                        >
                            <div className="service-category-header">
                                <span className="service-category-icon" aria-hidden="true" />
                                <div>
                                    <h3 className="service-category-title">
                                        {lang === "ar" ? category.label.ar : category.label.en}
                                    </h3>
                                    <p className="service-category-sub">
                                        {category.id === "painting"
                                            ? (lang === "ar"
                                                ? `${category.services.length} خدمات دهان وتشطيب احترافية`
                                                : `${category.services.length} professional painting & finishing services`)
                                            : (lang === "ar"
                                                ? `${category.services.length} خدمات تصميم وتركيب أسقف`
                                                : `${category.services.length} ceiling design & installation services`)}
                                    </p>
                                </div>
                            </div>
                            <div className="services-grid">
                                {category.services.map((s) => {
                                    const title = lang === "ar" ? s.title.ar : s.title.en;
                                    const desc = lang === "ar" ? s.desc.ar : s.desc.en;
                                    const badge = categoryLabel(s.category, lang);
                                    return (
                                        <article
                                            className="service-card" data-reveal
                                            id={`service-${s.id}`}
                                            key={s.id}
                                        >
                                            <div className="service-img-wrap">
                                                <img
                                                    src={s.img}
                                                    alt={imageAlt(title, lang)}
                                                    title={title}
                                                    loading="lazy"
                                                />
                                                <span className="service-badge">{badge}</span>
                                            </div>
                                            <div className="service-body">
                                                <h4>{title}</h4>
                                                <p>{desc}</p>
                                                <a
                                                    href={whatsappQuoteHref(title, lang)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="service-link"
                                                >
                                                    <WhatsAppIcon />
                                                    {lang === "ar" ? "اطلب عرض سعر" : "Get a quote"}
                                                </a>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section process" id="process">
                <div className="container">
                    <div className="section-header" data-reveal>
                        <span className="section-label">{t.processLabel}</span>
                        <h2>{t.processTitle}</h2>
                        <p>{t.processSub}</p>
                    </div>
                    <ol className="steps">
                        {processSteps.map((step, i) => (
                            <li className="step" key={step.title.en} data-reveal>
                                <span className="step-num" aria-hidden="true">{i + 1}</span>
                                <h3>{isAr ? step.title.ar : step.title.en}</h3>
                                <p>{isAr ? step.desc.ar : step.desc.en}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section dark" id="work">
                <div className="container">
                    <div className="section-header" data-reveal>
                        <span className="section-label">{t.workLabel}</span>
                        <h2>{t.workTitle}</h2>
                        <p>{t.workSub}</p>
                    </div>
                    <div className="gallery">
                        {galleryItems.map((p, i) => {
                            const title = lang === "ar" ? p.title.ar : p.title.en;
                            const desc = lang === "ar" ? p.desc.ar : p.desc.en;
                            return (
                                <article
                                    className={`gallery-card ${i === 0 ? "gallery-card--featured" : ""}`}
                                    data-reveal
                                    key={p.imageName + title}
                                >
                                    <div className="gallery-img-wrap">
                                        <img
                                            src={p.img}
                                            alt={imageAlt(title, lang)}
                                            title={title}
                                            loading="lazy"
                                        />
                                        <div className="gallery-caption">
                                            <span className="gallery-tag">{desc}</span>
                                            <h4>{title}</h4>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="cta-inner">
                    <h2>{t.ctaTitle}</h2>
                    <p>{t.ctaSub}</p>
                    <a
                        href={SITE.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <WhatsAppIcon /> {t.quote}
                    </a>
                </div>
            </section>

            <section className="section contact" id="contact">
                <div className="container">
                    <div className="section-header" data-reveal>
                        <span className="section-label">{t.contactLabel}</span>
                        <h2>{t.contactTitle}</h2>
                        <p>{t.contactSub}</p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-card" data-reveal>
                            <div className="contact-icon"><PhoneIcon /></div>
                            <h3>{t.phone}</h3>
                            <a href={SITE.phoneHref}><span className="ltr">{SITE.phoneDisplay}</span></a>
                        </div>
                        <div className="contact-card" data-reveal>
                            <div className="contact-icon"><PinIcon /></div>
                            <h3>{t.locationLabel}</h3>
                            <p>{t.location}</p>
                        </div>
                        <div className="contact-card" data-reveal>
                            <div className="contact-icon"><WhatsAppIcon /></div>
                            <h3>{t.chat}</h3>
                            <a
                                href={SITE.whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.whatsapp}
                            </a>
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <a
                            href={SITE.whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp"
                        >
                            <WhatsAppIcon /> {t.whatsapp}
                        </a>
                    </div>

                    <ContactForm lang={lang} />
                </div>
            </section>

            </main>

            <a
                href={SITE.whatsappHref}
                className="floating-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.whatsapp}
            >
                <WhatsAppIcon />
            </a>

            <section className="map">
                <iframe
                    src="https://maps.google.com/maps?q=riyadh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="380"
                    loading="lazy"
                    allowFullScreen
                    title="Zaman Paints location"
                />
            </section>

            <div className="mobile-cta">
                <a href={SITE.phoneHref} className="mobile-cta-call">
                    <PhoneIcon /> {t.callNow}
                </a>
                <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-cta-whatsapp"
                >
                    <WhatsAppIcon /> {t.chat}
                </a>
            </div>

            <Footer lang={lang} />
        </div>
    );
};

export default App;
