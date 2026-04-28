"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: ${scrolled ? "12px 48px" : "24px 48px"};
          background: ${scrolled ? "rgba(255,248,245,0.92)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(12px)" : "none"};
          border-bottom: ${scrolled ? "1px solid rgba(201,160,139,0.2)" : "none"};
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          color: #3a2318;
          letter-spacing: 0.08em;
          text-decoration: none;
          font-style: italic;
        }

        .nav-logo span {
          font-style: normal;
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5c3d2e;
          text-decoration: none;
          position: relative;
          transition: color 0.3s;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a08b;
          transition: width 0.3s ease;
        }

        .nav-links a:hover { color: #c9a08b; }
        .nav-links a:hover::after { width: 100%; }

        .nav-cta {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: #c9a08b;
          padding: 10px 22px;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
        }

        .nav-cta:hover {
          background: #b8856d;
          transform: translateY(-1px);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }

        .hamburger span {
          width: 24px;
          height: 1.5px;
          background: #3a2318;
          transition: all 0.3s;
        }

        @media (max-width: 768px) {
          .navbar { padding: 16px 24px; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <Link href="/" className="nav-logo">
          <span>Pulisha</span> Nail House
        </Link>

        <ul className="nav-links">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#contact" className="nav-cta">Book Now</a>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
    </>
  );
}