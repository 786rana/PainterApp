import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-box">
          <h2>🎨 PainterPro</h2>
          <p>
            Professional painting services for homes, offices, and commercial spaces.
            We deliver quality, trust, and perfection in every brush stroke.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#work">Our Work</a>
          <a href="#contact">Contact</a>
        </div>

        {/* SERVICES */}
        <div className="footer-box">
          <h3>Services</h3>
          <p>Interior Painting</p>
          <p>Exterior Painting</p>
          <p>Texture Design</p>
          <p>Wood Polish</p>
        </div>

        {/* CONTACT */}
        <div className="footer-box">
          <h3>Contact</h3>
          <p>📞 +966 597507224</p>
          <p>📍 Available in your city</p>
          <p>💬 WhatsApp Support</p>

          <a
            className="whatsapp-btn"
            href="https://wa.me/966597507224"
            target="_blank"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © 2026 PainterPro. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;