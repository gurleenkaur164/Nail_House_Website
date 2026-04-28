"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";


const slides = [
  { src: "/gallery/nails1.png", alt: "Gel French Tips", label: "Classic French" },
  { src: "/gallery/nails2.png", alt: "Ombre Nails", label: "Ombre Glam" },
  { src: "/gallery/nails3.png", alt: "Floral Nail Art", label: "Floral Art" },
  { src: "/gallery/nails4.png", alt: "Chrome Nails", label: "Chrome Finish" },
  { src: "/gallery/nails5.png", alt: "Nude Nails", label: "Soft Nude" }
  
];

export default function GalleryCarousel() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive((prev) => (prev + dir + slides.length) % slides.length);
    startAutoPlay();
  };

  const onDragStart = (x: number) => {
    setDragging(true);
    dragStart.current = x;
  };

  const onDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

        .gallery-section {
          background: #1a1008;
          padding: 100px 0;
          overflow: hidden;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 60px;
          padding: 0 24px;
        }

        .section-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a08b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .section-eyebrow::before,
        .section-eyebrow::after {
          content: '';
          width: 36px;
          height: 1px;
          background: #c9a08b;
        }

        .gallery-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 300;
          color: #fff8f5;
          margin: 0;
          font-style: italic;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 40px;
        }

        .carousel-track {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1200px;
          overflow: hidden;
          cursor: grab;
          user-select: none;
        }

        .carousel-track:active { cursor: grabbing; }

        .carousel-slide {
          flex-shrink: 0;
          position: relative;
          border-radius: 2px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .carousel-slide.main {
          width: min(480px, 80vw);
          height: min(560px, 70vw);
          opacity: 1;
          transform: scale(1);
        }

        .carousel-slide.side {
          width: min(280px, 40vw);
          height: min(360px, 45vw);
          opacity: 0.45;
          transform: scale(0.92);
        }

        .carousel-slide.far {
          width: min(200px, 28vw);
          height: min(280px, 35vw);
          opacity: 0.2;
          transform: scale(0.84);
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: #3a2318;
        }

        .slide-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 20px 16px;
          background: linear-gradient(to top, rgba(26,16,8,0.85) 0%, transparent 100%);
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .carousel-slide.main .slide-label { opacity: 1; }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(201,160,139,0.15);
          border: 1px solid rgba(201,160,139,0.4);
          color: #c9a08b;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
        }

        .carousel-btn:hover {
          background: rgba(201,160,139,0.35);
          transform: translateY(-50%) scale(1.08);
        }

        .carousel-btn.prev { left: 8px; }
        .carousel-btn.next { right: 8px; }

        .carousel-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 40px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(201,160,139,0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s;
        }

        .dot.active {
          background: #c9a08b;
          transform: scale(1.4);
        }

        /* Placeholder shown when real images aren't loaded */
        .slide-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3a2318 0%, #5c3d2e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
          color: rgba(201,160,139,0.5);
        }

        .slide-placeholder-icon { font-size: 2rem; }
        .slide-placeholder-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      `}</style>

      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="gallery-title">The Work</h2>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-btn prev" onClick={() => go(-1)} aria-label="Previous">‹</button>

          <div
            className="carousel-track"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseUp={(e) => onDragEnd(e.clientX)}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          >
            {slides.map((slide, i) => {
              const diff = ((i - active + slides.length) % slides.length);
              const normalized = diff > slides.length / 2 ? diff - slides.length : diff;

              let className = "carousel-slide";
              if (normalized === 0) className += " main";
              else if (Math.abs(normalized) === 1) className += " side";
              else className += " far";

              if (Math.abs(normalized) > 2) return null;

              return (
                <div key={i} className={className} onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setActive(i); startAutoPlay(); }}>
                  {/* 
                    REPLACE THIS PLACEHOLDER with:
                    <Image src={slide.src} alt={slide.alt} fill style={{ objectFit: 'cover' }} />
                    after you add your images to /public/gallery/
                  */}
                  <div className="slide-placeholder">
                    <span className="slide-placeholder-icon">💅</span>
                    <span className="slide-placeholder-text">{slide.label}</span>
                  </div>
                  <div className="slide-label">{slide.label}</div>
                </div>
              );
            })}
          </div>

          <button className="carousel-btn next" onClick={() => go(1)} aria-label="Next">›</button>
        </div>

        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === active ? "active" : ""}`} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>
    </>
  );
}