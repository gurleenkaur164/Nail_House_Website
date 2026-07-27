"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GALLERY_SLIDES } from "@/lib/constants";

export default function GalleryCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    clearTimer();
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 4000);
  }, [paused, clearTimer]);

  useEffect(() => {
    startAutoPlay();
    return clearTimer;
  }, [startAutoPlay, clearTimer]);

  const go = useCallback((dir: number) => {
    clearTimer();
    setActive((prev) => (prev + dir + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
    startAutoPlay();
  }, [clearTimer, startAutoPlay]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  const togglePause = () => {
    setPaused((p) => !p);
  };

  return (
    <section className="gallery-section" id="gallery" aria-roledescription="carousel" aria-label="Nail art gallery">
      <div className="gallery-header">
        <p className="section-eyebrow">Portfolio</p>
        <h2 className="gallery-title">The Work</h2>
      </div>

      <div
        className="carousel-wrapper"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-label="Gallery slides"
      >
        <button className="carousel-btn carousel-btn--prev" onClick={() => go(-1)} aria-label="Previous slide">&#8249;</button>

        <div
          className="carousel-track"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          aria-live={paused ? "polite" : "off"}
        >
          {GALLERY_SLIDES.map((slide, i) => {
            const diff = ((i - active + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
            const normalized = diff > GALLERY_SLIDES.length / 2 ? diff - GALLERY_SLIDES.length : diff;

            let sizeClass = "carousel-slide--far";
            if (normalized === 0) sizeClass = "carousel-slide--main";
            else if (Math.abs(normalized) === 1) sizeClass = "carousel-slide--side";

            if (Math.abs(normalized) > 2) return null;

            return (
              <div
                key={slide.src}
                className={`carousel-slide ${sizeClass}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${GALLERY_SLIDES.length}: ${slide.alt}`}
                onClick={() => { clearTimer(); setActive(i); startAutoPlay(); }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 480px"
                  className="slide-image"
                  priority={normalized === 0}
                />
                <div className="slide-label">{slide.label}</div>
              </div>
            );
          })}
        </div>

        <button className="carousel-btn carousel-btn--next" onClick={() => go(1)} aria-label="Next slide">&#8250;</button>
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots" role="tablist" aria-label="Slide selection">
          {GALLERY_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              role="tab"
              className={`dot${i === active ? " dot--active" : ""}`}
              onClick={() => { clearTimer(); setActive(i); startAutoPlay(); }}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === active}
            />
          ))}
        </div>
        <button
          className="carousel-pause"
          onClick={togglePause}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
        >
          {paused ? "▶" : "⏸"}
        </button>
      </div>
    </section>
  );
}
