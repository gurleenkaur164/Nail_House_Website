"use client";

const testimonials = [
  {
    quote:
      "Absolutely in love with my gel extensions. Pulisha understood exactly the shape I wanted and they lasted over three weeks without a single chip.",
    name: "Priya S.",
    detail: "Gel Extensions",
  },
  {
    quote:
      "The nail art here is next level. I showed a reference and she made it even better. The most relaxing salon experience I've had in Amritsar.",
    name: "Simran K.",
    detail: "Hand-painted Nail Art",
  },
  {
    quote:
      "So hygienic, so professional, and the results speak for themselves. My acrylics looked flawless for my wedding functions. Highly recommend.",
    name: "Ramanpreet C.",
    detail: "Acrylic Full Set",
  },
];

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

        .testimonials-section {
          background: #fdeee6;
          padding: 100px 48px;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .testimonials-eyebrow {
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

        .testimonials-eyebrow::before,
        .testimonials-eyebrow::after {
          content: '';
          width: 36px;
          height: 1px;
          background: #c9a08b;
        }

        .testimonials-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 300;
          color: #3a2318;
          margin: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr; max-width: 560px; }
          .testimonials-section { padding: 80px 24px; }
        }

        .testimonial-card {
          background: #fff;
          border: 1px solid rgba(201,160,139,0.15);
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
        }

        .testimonial-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          line-height: 0.6;
          color: #c9a08b;
          margin-bottom: 12px;
        }

        .testimonial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          font-weight: 300;
          color: #5c3d2e;
          line-height: 1.6;
          margin: 0 0 24px;
          flex: 1;
        }

        .testimonial-stars {
          color: #c9a08b;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }

        .testimonial-name {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #3a2318;
        }

        .testimonial-detail {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9a7060;
          margin-top: 2px;
        }
      `}</style>

      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-header">
          <p className="testimonials-eyebrow">Kind Words</p>
          <h2 className="testimonials-title">What Clients Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-mark">&ldquo;</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-detail">{t.detail}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
