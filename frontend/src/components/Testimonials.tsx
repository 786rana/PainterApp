import  { useEffect, useState } from "react";

type Testimonial = {
  en: string;
  ar: string;
  nameEn: string;
  nameAr: string;
  stars?: number;
};

const testimonials: Testimonial[] = [
  { en: "Excellent painting quality and very fast service.", ar: "جودة دهان ممتازة وخدمة سريعة جدًا.", nameEn: "Ahmed", nameAr: "أحمد", stars: 5 },
  { en: "Professional team, clean work and great communication.", ar: "فريق محترف، عمل نظيف وتواصل رائع.", nameEn: "Fatima", nameAr: "فاطمة", stars: 5 },
  { en: "Reasonable price and outstanding finish — highly recommended.", ar: "سعر مناسب وتشطيب رائع — أنصح بهم بشدة.", nameEn: "Salem", nameAr: "سالم", stars: 5 },
  { en: "They transformed our living room — perfect color and texture.", ar: "حولوا غرفة المعيشة لدينا — اللون والملمس مثاليان.", nameEn: "Noor", nameAr: "نور", stars: 5 },
  { en: "Reliable, punctual and very detail oriented.", ar: "موثوقون، دقيقون وفيهم اهتمام بالتفاصيل.", nameEn: "Hassan", nameAr: "حسن", stars: 5 },
  { en: "Great customer care and follow-up after job completion.", ar: "خدمة عملاء ممتازة ومتابعة بعد الانتهاء من العمل.", nameEn: "Laila", nameAr: "ليلى", stars: 4 }
];

const Testimonials: React.FC<{ lang: "en" | "ar" }> = ({ lang }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, len]);

  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  return (
    <section className="testimonials section" aria-label={lang === "ar" ? "آراء العملاء" : "Client Reviews"}>
      <div className="container">
        <h2>{lang === "ar" ? "آراء العملاء" : "Client Reviews"}</h2>

        <div
          className="testimonials-slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card ${i === index ? "active" : ""}`}>
              <div className="stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => (
                  <span key={k} className={`star ${k < (t.stars || 5) ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <p>{lang === "ar" ? t.ar : t.en}</p>
              <h4>- {lang === "ar" ? t.nameAr : t.nameEn}</h4>
            </div>
          ))}

          <button className="test-nav prev" onClick={prev} aria-label={lang === "ar" ? "السابق" : "Previous"}>
            ‹
          </button>
          <button className="test-nav next" onClick={next} aria-label={lang === "ar" ? "التالي" : "Next"}>
            ›
          </button>

          <div className="test-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
