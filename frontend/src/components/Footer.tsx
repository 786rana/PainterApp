import { serviceCategories } from "../data/services";

type FooterProps = {
    lang: "en" | "ar";
};

const Footer = ({ lang }: FooterProps) => {
    const isAr = lang === "ar";

    return (
        <footer className="footer" dir={isAr ? "rtl" : "ltr"}>
            <div className="footer-container">
                <div className="footer-box">
                    <h2>{isAr ? "زمان للدهانات والديكور" : "Zaman Paints & Decor"}</h2>
                    <p>
                        {isAr
                            ? "خدمات طلاء وديكور عالية الجودة للمشاريع السكنية والتجارية في المملكة العربية السعودية."
                            : "High-quality painting and decor services for residential and commercial projects across Saudi Arabia."}
                    </p>
                </div>

                <div className="footer-box">
                    <h3>{isAr ? "روابط سريعة" : "Quick Links"}</h3>
                    <a href="#home">{isAr ? "الرئيسية" : "Home"}</a>
                    <a href="#services">{isAr ? "الخدمات" : "Services"}</a>
                    <a href="#work">{isAr ? "أعمالنا" : "Our Work"}</a>
                    <a href="#about">{isAr ? "من نحن" : "About"}</a>
                    <a href="#contact">{isAr ? "اتصل بنا" : "Contact"}</a>
                </div>

                <div className="footer-box">
                    <h3>{isAr ? "الخدمات" : "Services"}</h3>
                    {serviceCategories.map((cat) => (
                        <div key={cat.id}>
                            <p className="footer-category-label">
                                {isAr ? cat.label.ar : cat.label.en}
                            </p>
                            {cat.services.slice(0, 3).map((s) => (
                                <a key={s.id} href={`#service-${s.id}`}>
                                    {isAr ? s.title.ar : s.title.en}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="footer-box">
                    <h3>{isAr ? "اتصل" : "Contact"}</h3>
                    <p>📞 +966 597507224</p>
                    <p>📍 {isAr ? "الرياض، السعودية" : "Riyadh, Saudi Arabia"}</p>
                    <a
                        className="whatsapp-btn"
                        href="https://wa.me/966597507224"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        💬 {isAr ? "الدردشة عبر واتساب" : "Chat on WhatsApp"}
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()}{" "}
                {isAr ? "زمان للدهانات والديكور" : "Zaman Paints & Decor"}.{" "}
                {isAr ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
            </div>
        </footer>
    );
};

export default Footer;
