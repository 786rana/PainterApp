import  { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Testimonials from "./components/Testimonials";
import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer";
import "./App.css";

// WEBSITE TITLE
const WEBSITE_NAME = "Zaman Paints & Decor";

// images
const drywall =
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1200&auto=format&fit=crop";

const drywall2 =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

const wallpaper =
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop";

const water =
    "https://images.unsplash.com/photo-1503301360241-2b6b5fb3d8f8?q=80&w=1200&auto=format&fit=crop";

// SERVICES
const services = [
    {
        title: { en: "Exterior Paint", ar: "دهان خارجي" },
        img: drywall2,
    },
    {
        title: { en: "Interior Paint", ar: "دهان داخلي" },
        img: wallpaper,
    },
    {
        title: { en: "Wood Varnishing", ar: "تلميع الخشب" },
        img: drywall,
    },
    {
        title: { en: "Water Damage Repair", ar: "إصلاح أضرار المياه" },
        img: water,
    },
    {
        title: { en: "Wallpaper Removal", ar: "إزالة ورق الجدران" },
        img: wallpaper,
    },
    {
        title: { en: "Roof Paint", ar: "دهان السقف" },
        img: drywall2,
    },
    {
        title: { en: "Metal Paint", ar: "دهان المعادن" },
        img: drywall,
    },
    {
        title: { en: "Faux Paint", ar: "دهانات ديكورية" },
        img: wallpaper,
    },
    {
        title: { en: "Drywall Paint", ar: "دهان الجبس بورد" },
        img: drywall,
    },
    {
        title: { en: "Door Paint", ar: "دهان الأبواب" },
        img: drywall2,
    },
];

// WEBSITE CONTENT
const content = {
    en: {
        servicesTitle: "Our Services",
        servicesSub:
            "Complete painting solutions for homes & commercial spaces",

        workTitle: "Our Work",
        workSub:
            "Recent painting projects delivered with high quality",

        contactTitle: "Contact Us",
        contactSub: "We are available anytime",

        ctaTitle: "Need Professional Painting Service?",
        ctaSub: "Get your free quotation within 10 minutes",

        projects: "Projects Completed",
        experience: "Years Experience",
        satisfaction: "Customer Satisfaction",

        quote: "Get Free Quote",
        whatsapp: "Chat on WhatsApp",
        location: "Available in your city",
    },

    ar: {
        servicesTitle: "خدماتنا",
        servicesSub:
            "حلول طلاء متكاملة للمنازل والمساحات التجارية",

        workTitle: "أعمالنا",
        workSub:
            "مشاريع الطلاء الحديثة بجودة عالية",

        contactTitle: "اتصل بنا",
        contactSub: "نحن متاحون في أي وقت",

        ctaTitle: "هل تحتاج إلى خدمة طلاء احترافية؟",
        ctaSub:
            "احصل على عرض سعر مجاني خلال 10 دقائق",

        projects: "مشاريع مكتملة",
        experience: "سنوات خبرة",
        satisfaction: "رضا العملاء",

        quote: "احصل على عرض سعر",
        whatsapp: "الدردشة عبر واتساب",
        location: "متوفر في مدينتك",
    },
};

const App = () => {
    const [lang, setLang] = useState<"en" | "ar">("en");

    const t = content[lang];

    // CHANGE WEBSITE TITLE
    useEffect(() => {
        document.title =
            lang === "ar"
                ? "زمان للدهانات والديكور"
                : WEBSITE_NAME;
    }, [lang]);

    return (
        <div
            className="app"
            dir={lang === "ar" ? "rtl" : "ltr"}
        ><Helmet>
                <title>Zaman Paints & Decor | Painting Services in Saudi Arabia Riyadh</title>

                <meta
                    name="description"
                    content="Professional painting services in Saudi Arabia including interior painting, exterior painting, villa painting, wall painting, and decoration services in Riyadh, Jeddah, and KSA."
                />

                <meta
                    name="keywords"
                    content="
        painting services Saudi Arabia,
        Riyadh painters,
        villa painting KSA,
        house painting Saudi Arabia,
        interior painting Riyadh,
        exterior painting Saudi Arabia,
        wall painting contractors KSA,
        Zaman Paints & Decor
        "
                />

                <meta name="robots" content="index, follow" />

                <link rel="canonical" href="https://zamanpaints.com" />

                {/* Open Graph */}
                <meta property="og:title" content="Zaman Paints & Decor Saudi Arabia" />
                <meta property="og:description" content="Best painting services in Riyadh and Saudi Arabia" />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            {/* NAVBAR */}
            <Navbar lang={lang} setLang={setLang} />

            {/* HERO */}
            <HeroSlider lang={lang} />

            {/* TRUST */}
            <section className="trust">
                <div>
                    <h2>100+</h2>
                    <p>{t.projects}</p>
                </div>

                <div>
                    <h2>10+</h2>
                    <p>{t.experience}</p>
                </div>

                <div>
                    <h2>100%</h2>
                    <p>{t.satisfaction}</p>
                </div>
            </section>

            {/* TESTIMONIALS (carousel) */}
            <Testimonials lang={lang} />

            {/* WHY US */}
            <section className="why-us section">
                <div className="container">
                    <h2>{lang === 'ar' ? 'لماذا نحن؟' : 'Why Choose Us?'}</h2>

                    <div className="why-grid">
                        <div>{lang === 'ar' ? '✅ فريق محترف' : '✅ Professional Team'}</div>
                        <div>{lang === 'ar' ? '✅ أسعار مناسبة' : '✅ Affordable Prices'}</div>
                        <div>{lang === 'ar' ? '✅ مواد فاخرة' : '✅ Premium Materials'}</div>
                        <div>{lang === 'ar' ? '✅ تسليم سريع' : '✅ Fast Delivery'}</div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="section" id="services">
                <div className="container">
                    <h2>{t.servicesTitle}</h2>

                    <p className="sub">
                        {t.servicesSub}
                    </p>

                    <div className="services-grid">
                        {services.map((s, i) => {
                            const title =
                                lang === "ar"
                                    ? s.title.ar
                                    : s.title.en;

                            return (
                                <div
                                    className="service-card"
                                    key={i}
                                >
                                    <img
                                        src={s.img}
                                        alt={title}
                                        loading="lazy"
                                    />

                                    <div className="service-overlay">
                                        {title}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* WORK */}
            <section
                className="section dark"
                id="work"
            >
                <div className="container">
                    <h2>{t.workTitle}</h2>

                    <p className="sub">
                        {t.workSub}
                    </p>

                    <div className="gallery">
                        {services.map((s, i) => {
                            const title = lang === "ar" ? s.title.ar : s.title.en;
                            return (
                                <div className="service-card" key={i}>
                                    <img src={s.img} alt={title} loading="lazy" />
                                    <div className="service-overlay">{title}</div>
                                    <div className="service-caption">{title}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
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
            </section>

            {/* CONTACT */}
            <section
                className="section contact"
                id="contact"
            >
                <div className="container">
                    <h2>{t.contactTitle}</h2>

                    <p className="sub">
                        {t.contactSub}
                    </p>

                    <div className="contact-box">
                        <p>📞 +966 597507224</p>

                        <p>📍 {t.location}</p>

                        <a
                            href="https://wa.me/966597507224"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp"
                        >
                            {t.whatsapp}
                        </a>
                    </div>
                </div>
            </section>

            {/* FLOATING WHATSAPP */}
            <a
                href="https://wa.me/966597507224"
                className="floating-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
            >
                💬
            </a>

            {/* MAP */}
            <section className="map">
                <iframe
                    src="https://maps.google.com/maps?q=riyadh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="300"
                    loading="lazy"
                    allowFullScreen
                />
            </section>

            <Footer lang={lang} />

        </div>

    );
};

export default App;