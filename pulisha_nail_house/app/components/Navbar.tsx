"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => closeRef.current?.focus());
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <Link href="/" className="nav-logo">
          <span>Pulisha</span> Nail House
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta">Book Now</a>

        <button
          className="hamburger"
          ref={hamburgerRef}
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div
        className={`mobile-overlay${menuOpen ? " mobile-overlay--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        ref={menuRef}
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal={menuOpen}
        aria-hidden={!menuOpen}
      >
        <button
          className="mobile-close"
          ref={closeRef}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a href="#contact" className="mobile-cta" onClick={closeMenu}>Book Now</a>
      </div>
    </>
  );
}
