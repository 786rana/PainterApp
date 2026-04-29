import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">

      <div className="logo">🎨 PainterPro</div>

      <div className="menu" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <nav className={`nav ${open ? "active" : ""}`}>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#work">Our Work</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="call-btn" href="tel:+966597507224">
        📞 Call Now
      </a>

    </header>
  );
};

export default Navbar;