import { useState, useEffect } from "react";
import { useServiceCategories } from "../data/ServicesContext";
import { BRAND_NAME, heroImages, imageAlt } from "../data/services";
import { whatsappQuoteHref } from "../data/site";
import { WhatsAppIcon } from "./Icons";

const slides = [
    {
        img: heroImages.painting,
        en: "Professional Painting",
        ar: "دهان احترافي",
        highlight: { en: "& Finishing", ar: "وتشطيبات" },
        imageName: "painting",
    },
    {
        img: heroImages.exterior,
        en: "Villa & Exterior",
        ar: "فلل وواجهات",
        highlight: { en: "Specialists", ar: "خارجية" },
        imageName: "exterior",
    },
    {
        img: heroImages.ceiling,
        en: "Luxury Ceiling",
        ar: "أسقف فاخرة",
        highlight: { en: "Design", ar: "وتصميم" },
        imageName: "ceiling",
    },
];

type Lang = "en" | "ar";

const HeroSlider = ({ lang }: { lang: Lang }) => {
    const [index, setIndex] = useState(0);
    const { categories } = useServiceCategories();
    const allServices = categories.flatMap((c) => c.services);
    const [picked, setPicked] = useState(0);
    const chosen = allServices[Math.min(picked, allServices.length - 1)];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5500);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[index];

    return (
        <section className="hero" id="home" aria-roledescription="carousel">
            <div className="hero-bg">
                {slides.map((s, i) => (
                    <img
                        key={s.imageName}
                        src={s.img}
                        alt={imageAlt(`${s[lang]} ${s.highlight[lang]}`, lang)}
                        className={i === index ? "active" : ""}
                    />
                ))}
            </div>

            <div className="hero-overlay">
                <div className="hero-content" key={index}>
                    <div className="hero-badge">
                        <span className="dot" />
                        {lang === "ar"
                            ? `${BRAND_NAME.ar} — خدمات دهان موثوقة في السعودية`
                            : `${BRAND_NAME.en} — Trusted Painting Services in Saudi Arabia`}
                    </div>

                    <h1>
                        {slide[lang]}{" "}
                        <span>{slide.highlight[lang]}</span>
                    </h1>

                    <p className="hero-sub">
                        {lang === "ar"
                            ? "نحوّل مساحاتك بجودة عالية ومواد فاخرة وتسليم في الوقت المحدد"
                            : "Transform your space with premium materials, expert craftsmanship, and on-time delivery"}
                    </p>

                    <div className="hero-actions">
                        <a className="hero-btn" href="#contact">
                            {lang === "ar" ? "احصل على عرض سعر" : "Get Free Quote"}
                        </a>
                        <a className="hero-btn-outline" href="#services">
                            {lang === "ar" ? "استعرض خدماتنا" : "View Services"}
                        </a>
                    </div>

                    <ul className="hero-points">
                        {(lang === "ar"
                            ? ["عرض سعر مجاني", "نخدم الرياض وكل السعودية", "متاحون 7 أيام في الأسبوع"]
                            : ["Free quotation", "Riyadh & all of KSA", "Available 7 days a week"]
                        ).map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>

                    <div className="hero-dots">
                        {slides.map((s, i) => (
                            <button
                                key={s.imageName}
                                className={i === index ? "active" : ""}
                                onClick={() => setIndex(i)}
                                aria-label={`${s[lang]} ${s.highlight[lang]}`}
                            />
                        ))}
                    </div>
                </div>

                {chosen && (
                    <aside className="hero-quote" aria-label={lang === "ar" ? "عرض سعر سريع" : "Quick quote"}>
                        <h2>{lang === "ar" ? "احصل على عرض سعر" : "Get a quick quote"}</h2>
                        <p>
                            {lang === "ar"
                                ? "اختر الخدمة وراسلنا مباشرة عبر واتساب."
                                : "Choose a service and message us directly on WhatsApp."}
                        </p>
                        <label>
                            <span>{lang === "ar" ? "الخدمة" : "Service"}</span>
                            <select value={picked} onChange={(e) => setPicked(Number(e.target.value))}>
                                {allServices.map((s, i) => (
                                    <option key={s.id} value={i}>
                                        {lang === "ar" ? s.title.ar : s.title.en}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <a
                            className="hero-quote-btn"
                            href={whatsappQuoteHref(lang === "ar" ? chosen.title.ar : chosen.title.en, lang)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon /> {lang === "ar" ? "راسلنا على واتساب" : "Continue on WhatsApp"}
                        </a>
                    </aside>
                )}
            </div>
        </section>
    );
};

export default HeroSlider;
