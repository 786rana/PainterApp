import { useState, useEffect } from "react";
import { BRAND_NAME, heroImages, imageAlt } from "../data/services";

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
            </div>
        </section>
    );
};

export default HeroSlider;
