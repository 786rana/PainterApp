import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import "./App.css";

const App = () => {
  return (
    <div className="app">

      <Navbar />

      <HeroSlider />

      {/* SERVICES */}
      <section className="section" id="services">
        <h2>Our Services</h2>

        <div className="grid">
          <div className="card">🎨 Interior Painting</div>
          <div className="card">🏢 Exterior Painting</div>
          <div className="card">🧱 Texture Design</div>
          <div className="card">🌳 Wood Polish</div>
        </div>
      </section>

      {/* WORK */}
      <section className="section dark" id="work">
        <h2>Our Work</h2>

        <div className="gallery">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" />
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" />
          <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498c" />
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <h2>Contact Us</h2>
        <p>📞 +966 597507224</p>
        <p>📍 Available in your city</p>

        <a href="https://wa.me/966597507224" className="cta-btn">
          💬 WhatsApp Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 PainterPro. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default App;