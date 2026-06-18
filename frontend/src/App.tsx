import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Testimonials from "./components/Testimonials";
import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer";
import "./App.css";
import { BRAND_NAME, categoryLabel, imageAlt, projects, serviceCategories } from "./data/services";

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

const content = {
    en: {
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
    const [lang, setLang] = useState<"en" | "ar">("en");
    const t = content[lang];

    useEffect(() => {
        document.title = BRAND_NAME[lang];
    }, [lang]);

    return (
        <div className="app" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Helmet>
                <title>Zaman Paints & Decor | Painting Services in Saudi Arabia Riyadh</title>
                <meta
                    name="description"
                    content="Professional painting services in Saudi Arabia including interior painting, exterior painting, villa painting, wall painting, and decoration services in Riyadh, Jeddah, and KSA."
                />
                <meta
                    name="keywords"
                    content="painting services Saudi Arabia, Riyadh painters, villa painting KSA, house painting Saudi Arabia, interior painting Riyadh, exterior painting Saudi Arabia, wall painting contractors KSA, Zaman Paints & Decor"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://zamanpaints.com" />
                <meta property="og:title" content="Zaman Paints & Decor Saudi Arabia" />
                <meta property="og:description" content="Best painting services in Riyadh and Saudi Arabia" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <Navbar lang={lang} setLang={setLang} />
            <HeroSlider lang={lang} />

            <section className="trust">
                <div className="trust-card">
                    <h2>100+</h2>
                    <p>{t.projects}</p>
                </div>
                <div className="trust-card">
                    <h2>10+</h2>
                    <p>{t.experience}</p>
                </div>
                <div className="trust-card">
                    <h2>100%</h2>
                    <p>{t.satisfaction}</p>
                </div>
            </section>

            <Testimonials lang={lang} />

            <section className="why-us section" id="about">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{t.aboutLabel}</span>
                        <h2>{t.aboutTitle}</h2>
                        <p>{t.aboutSub}</p>
                    </div>
                    <div className="why-grid">
                        {whyItems.map((item) => (
                            <div className="why-card" key={item.title.en}>
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
                    <div className="section-header">
                        <span className="section-label">{t.servicesLabel}</span>
                        <h2>{t.servicesTitle}</h2>
                        <p>{t.servicesSub}</p>
                    </div>

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
                                            ? (lang === "ar" ? "10 خدمات دهان وتشطيب احترافية" : "10 professional painting & finishing services")
                                            : (lang === "ar" ? "4 خدمات تصميم وتركيب أسقف" : "4 ceiling design & installation services")}
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
                                            className="service-card"
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
                                                <div className="service-img-caption">
                                                    <h4>{title}</h4>
                                                </div>
                                            </div>
                                            <div className="service-body">
                                                <p>{desc}</p>
                                                <a href="#contact" className="service-link">
                                                    {lang === "ar" ? "اطلب عرض سعر ←" : "Get quote →"}
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

            <section className="section dark" id="work">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{t.workLabel}</span>
                        <h2>{t.workTitle}</h2>
                        <p>{t.workSub}</p>
                    </div>
                    <div className="gallery">
                        {projects.map((p, i) => {
                            const title = lang === "ar" ? p.title.ar : p.title.en;
                            const desc = lang === "ar" ? p.desc.ar : p.desc.en;
                            return (
                                <article
                                    className={`gallery-card ${i === 0 ? "gallery-card--featured" : ""}`}
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
                        href="https://wa.me/966597507224"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        💬 {t.quote}
                    </a>
                </div>
            </section>

            <section className="section contact" id="contact">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{t.contactLabel}</span>
                        <h2>{t.contactTitle}</h2>
                        <p>{t.contactSub}</p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-card">
                            <div className="contact-icon">📞</div>
                            <h3>{t.phone}</h3>
                            <a href="tel:+966597507224">+966 597507224</a>
                        </div>
                        <div className="contact-card">
                            <div className="contact-icon">📍</div>
                            <h3>{t.locationLabel}</h3>
                            <p>{t.location}</p>
                        </div>
                        <div className="contact-card">
                            <div className="contact-icon">💬</div>
                            <h3>{t.chat}</h3>
                            <a
                                href="https://wa.me/966597507224"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.whatsapp}
                            </a>
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <a
                            href="https://wa.me/966597507224"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp"
                        >
                            💬 {t.whatsapp}
                        </a>
                    </div>
                </div>
            </section>

            <a
                href="https://wa.me/966597507224"
                className="floating-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
            >
                💬
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

            <Footer lang={lang} />
        </div>
    );
};

export default App;
