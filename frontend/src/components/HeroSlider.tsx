import React, { useState, useEffect } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    en: "Luxury Painting & Decoration Services",
    ar: "خدمات دهان وديكور فاخرة"
  },            
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    en: "Modern Interior & Exterior Designs",
    ar: "تصاميم داخلية وخارجية عصرية"
  },
  {
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    en: "Professional Finishing With Perfection",
    ar: "تشطيبات احترافية بإتقان"
  }
];

const HeroSlider = ({ lang }: any) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4500);

        return () => clearInterval(timer);
    }, []);

    const slide = slides[index];

    return (
        <section className="hero" aria-roledescription="carousel">
            <img src={slide.img} alt={slide[lang]} loading="lazy" />

            <div className="hero-overlay">
                <div className="hero-content">
                    <div className="hero-brand">
                    </div>
                    <h1>{slide[lang]}</h1>
                    <p className="hero-sub">{lang === "ar" ? "تجربة طلاء عالية الجودة لخدماتك" : "High quality painting experience for your space"}</p>
                    <a className="hero-btn" href="#contact">{lang === "ar" ? "احصل على عرض" : "Get Quote"}</a>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;