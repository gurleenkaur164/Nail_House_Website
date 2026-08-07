"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      section.style.setProperty("--mx", `${x}`);
      section.style.setProperty("--my", `${y}`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-depth-ring hero-depth-ring--1" aria-hidden="true" />
      <div className="hero-depth-ring hero-depth-ring--2" aria-hidden="true" />
      <div className="hero-depth-ring hero-depth-ring--3" aria-hidden="true" />
      <div className="hero-decorative" aria-hidden="true">nails</div>
      <div className="hero-content">
        <p className="hero-eyebrow">Nail Artist · Amritsar</p>
        <h1 className="hero-title">
          Art at Your<br /><em>Fingertips</em>
        </h1>
        <p className="hero-subtitle">
          Handcrafted nail artistry tailored to your style.
          Experience of more than four years.<br />
          From classic elegance to bold statement sets — your nails, your story.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">Book an Appointment</a>
          <a href="#gallery" className="btn-outline">View Gallery</a>
        </div>
      </div>
    </section>
  );
}
