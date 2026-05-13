/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";


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

type Lang = "en" | "ar";

const HeroSlider = ({ lang }: { lang: Lang }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4500);

        return () => clearInterval(timer);
    }, []);

    const slide = slides[index];

    //const goTo = (n: number) => setIndex((n + slides.length) % slides.length);

    //const onSearch = (e: React.FormEvent) => {
    //    e.preventDefault();
    //    // preserve functionality: just navigate to services section
    //    const el = document.getElementById("services");
    //    if (el) el.scrollIntoView({ behavior: "smooth" });
    //};

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
                    {/*<div className="hero-brand" aria-hidden>*/}
                    {/*    */}{/* place for small brand / category chips */}
                    {/*    <span style={{ opacity: 0.95 }}>{lang === "ar" ? "دهان وديكور" : "Painting & Decoration"}</span>*/}
                    {/*</div>*/}

                    {/*<h1>*/}
                    {/*    {lang === "ar" ? (*/}
                    {/*        <>*/}
                    {/*            أفضل خدمات <span style={{ color: "var(--primary)" }}>الدهان</span>*/}
                    {/*            <br /> و التشطيبات الداخلية*/}
                    {/*        </>*/}
                    {/*    ) : (*/}
                    {/*        <>*/}
                    {/*            Premium <span style={{ color: "var(--primary)" }}>Painting</span> & Finishing Services*/}
                    {/*        </>*/}
                    {/*    )}*/}
                    {/*</h1>*/}

                    {/*<p className="hero-sub">*/}
                    {/*    {lang === "ar" ? "نحول مساحاتك إلى بيئات جميلة ودائمة." : "We transform spaces with high-quality paint and finishing."}*/}
                    {/*</p>*/}

                    {/* Search-like form similar to vonq hero layout (layout only) */}
                    {/*<form onSubmit={onSearch} style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", marginTop: 18 }}>*/}
                    {/*    <input name="q" placeholder={lang === "ar" ? "ما الذي تبحث عنه؟" : "What are you looking for?"} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', minWidth: 320, boxShadow: '0 6px 18px rgba(2,6,23,0.12)' }} />*/}
                    {/*    <select name="category" aria-label="category" style={{ padding: '12px 14px', borderRadius: 8, border: 'none', boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }}>*/}
                    {/*        <option value="all">{lang === "ar" ? "كل الخدمات" : "All services"}</option>*/}
                    {/*        <option value="interior">{lang === "ar" ? "تشطيبات داخلية" : "Interior"}</option>*/}
                    {/*        <option value="exterior">{lang === "ar" ? "تشطيبات خارجية" : "Exterior"}</option>*/}
                    {/*    </select>*/}
                    {/*    <button className="hero-btn" type="submit">{lang === "ar" ? "ابحث" : "Find"}</button>*/}
                    {/*</form>*/}

                    {/*<div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>*/}
                    {/*    <a className="call-btn" href="#contact">{lang === "ar" ? "احصل على عرض" : "Get Quote"}</a>*/}
                    {/*    <a className="btn" href="#projects">{lang === "ar" ? "مشاريعنا" : "Our Projects"}</a>*/}
                    {/*</div>*/}

                    {/* small slide dots/navigation */}
                    {/*<div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }} aria-hidden>*/}
                    {/*    {slides.map((s, i) => (*/}
                    {/*        <button key={i} onClick={() => goTo(i)} style={{ width: 10, height: 10, borderRadius: 999, border: 'none', background: i === index ? 'var(--primary)' : 'rgba(255,255,255,0.45)' }} aria-label={`Go to slide ${i + 1}`} />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
