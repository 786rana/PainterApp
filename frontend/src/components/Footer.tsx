//import React from "react";

type FooterProps = {
  lang: "en" | "ar";
};

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === "ar";

  return (
    <footer className="footer" dir={isAr ? "rtl" : "ltr"}>

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-box">
          <h2>🎨 {isAr ? "زمان للدهانات والديكور" : "Zaman Paints & Decor"}</h2>
          <p>
            {isAr
              ? "خدمات طلاء وديكور عالية الجودة للمشاريع السكنية والتجارية."
              : "High-quality painting and decor services for residential and commercial projects."}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-box">
          <h3>{isAr ? "روابط سريعة" : "Quick Links"}</h3>
          <a href="#home">{isAr ? "الرئيسية" : "Home"}</a>
          <a href="#services">{isAr ? "الخدمات" : "Services"}</a>
          <a href="#work">{isAr ? "أعمالنا" : "Our Work"}</a>
          <a href="#contact">{isAr ? "اتصل بنا" : "Contact"}</a>
        </div>

        {/* SERVICES */}
        <div className="footer-box">
          <h3>{isAr ? "الخدمات" : "Services"}</h3>
          <p>{isAr ? "دهان داخلي" : "Interior Painting"}</p>
          <p>{isAr ? "دهان خارجي" : "Exterior Painting"}</p>
          <p>{isAr ? "تصميم ملمس" : "Texture Design"}</p>
          <p>{isAr ? "تلميع الخشب" : "Wood Polish"}</p>
        </div>

        {/* CONTACT */}
        <div className="footer-box">
          <h3>{isAr ? "اتصل" : "Contact"}</h3>
          <p>📞 +966 597507224</p>
          <p>📍 {isAr ? "متوفر في مدينتك" : "Available in your city"}</p>
          <p>💬 {isAr ? "دعم واتساب" : "WhatsApp Support"}</p>

          <a
            className="whatsapp-btn"
            href="https://wa.me/966597507224"
            target="_blank"
            rel="noopener noreferrer"
          >
            {isAr ? "الدردشة عبر واتساب" : "Chat on WhatsApp"}
          </a>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} {isAr ? "زمان للدهانات والديكور" : "Zaman Paints & Decor"}. {isAr ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
      </div>

    </footer>
  );
};

export default Footer;