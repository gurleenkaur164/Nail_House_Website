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

  const getSlideStyle = (normalized: number): React.CSSProperties => {
    const abs = Math.abs(normalized);
    if (abs > 2) return { display: "none" };

    const xOffset = normalized * 280;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.75 : 0.55;
    const zTranslate = abs === 0 ? 0 : abs === 1 ? -120 : -220;
    const rotateY = normalized * -8;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.3;
    const blur = abs === 0 ? 0 : abs === 1 ? 2 : 5;
    const zIndex = 10 - abs;

    return {
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      width: "min(420px, 72vw)",
      height: "min(520px, 65vw)",
      borderRadius: "8px",
      overflow: "hidden",
      cursor: abs === 0 ? "default" : "pointer",
      transform: `translate(-50%, -50%) translateX(${xOffset}px) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      zIndex,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.15, 1)",
      boxShadow: abs === 0
        ? "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,160,139,0.15)"
        : "0 10px 30px rgba(0,0,0,0.3)",
    };
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
          className="carousel-track-3d"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          aria-live={paused ? "polite" : "off"}
        >
          {GALLERY_SLIDES.map((slide, i) => {
            const diff = ((i - active + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
            const normalized = diff > GALLERY_SLIDES.length / 2 ? diff - GALLERY_SLIDES.length : diff;

            if (Math.abs(normalized) > 2) return null;

            return (
              <div
                key={slide.src}
                style={getSlideStyle(normalized)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${GALLERY_SLIDES.length}: ${slide.alt}`}
                onClick={() => {
                  if (normalized !== 0) {
                    clearTimer();
                    setActive(i);
                    startAutoPlay();
                  }
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 72vw, 420px"
                  style={{ objectFit: "cover" }}
                  priority={normalized === 0}
                />
                <div
                  className="slide-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: normalized === 0
                      ? "linear-gradient(to top, rgba(26,16,8,0.7) 0%, transparent 50%)"
                      : "rgba(26,16,8,0.15)",
                    transition: "all 0.6s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px",
                    opacity: normalized === 0 ? 1 : 0,
                    transform: normalized === 0 ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jost), sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#c9a08b",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(GALLERY_SLIDES.length).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.4rem",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "#fff8f5",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {slide.label}
                  </span>
                </div>
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
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
        >
          {paused ? "▶" : "⏸"}
        </button>
      </div>
    </section>
  );
}
