"use client";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .hero {
          min-height: 100vh;
          background: linear-gradient(160deg, #fff8f5 0%, #fdeee6 50%, #f5ddd0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 0 24px;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,160,139,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,160,139,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-content {
          text-align: center;
          max-width: 720px;
          z-index: 1;
          animation: fadeUp 1s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a08b;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '';
          width: 40px;
          height: 1px;
          background: #c9a08b;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 6rem);
          font-weight: 300;
          line-height: 1.05;
          color: #3a2318;
          margin: 0 0 12px;
        }

        .hero-title em {
          font-style: italic;
          color: #c9a08b;
        }

        .hero-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: #7a5c4e;
          letter-spacing: 0.06em;
          margin: 20px 0 40px;
          line-height: 1.7;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fff;
          background: #c9a08b;
          padding: 14px 36px;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
          display: inline-block;
        }

        .btn-primary:hover {
          background: #b8856d;
          transform: translateY(-2px);
        }

        .btn-outline {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a08b;
          border: 1px solid #c9a08b;
          padding: 14px 36px;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
        }

        .btn-outline:hover {
          background: #c9a08b;
          color: #fff;
          transform: translateY(-2px);
        }

        .hero-decorative {
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14rem;
          font-weight: 300;
          color: rgba(201,160,139,0.06);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          white-space: nowrap;
          letter-spacing: -0.04em;
        }
      `}</style>

      <section className="hero">
        <div className="hero-decorative">nails</div>
        <div className="hero-content">
          <p className="hero-eyebrow">Nail Artist · Bengaluru</p>
          <h1 className="hero-title">
            Art at Your<br /><em>Fingertips</em>
          </h1>
          <p className="hero-subtitle">
            Handcrafted nail artistry tailored to your style.<br />
            From classic elegance to bold statement sets — your nails, your story.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Book an Appointment</a>
            <a href="#gallery" className="btn-outline">View Gallery</a>
          </div>
        </div>
      </section>
    </>
  );
}