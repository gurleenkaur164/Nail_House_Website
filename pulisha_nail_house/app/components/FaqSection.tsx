"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Fill out the contact form below or message directly on WhatsApp. You'll get a confirmation with your preferred date and time. Walk-ins are welcome subject to availability.",
  },
  {
    q: "How long do gel extensions and acrylics last?",
    a: "With proper care, gel extensions and acrylic sets typically last 3 to 4 weeks before a refill is recommended. Aftercare guidance is shared at every appointment.",
  },
  {
    q: "Do you take custom nail art designs?",
    a: "Absolutely. Bring a reference or an idea and it will be recreated (and often elevated) to suit your nail shape and length. Every set is bespoke.",
  },
  {
    q: "Is there a deposit or cancellation policy?",
    a: "A small deposit may be requested for longer appointments. Kindly give at least 24 hours' notice for cancellations or reschedules so the slot can be offered to someone else.",
  },
  {
    q: "Where are you located?",
    a: "Pulisha Nail House is based in Amritsar, Punjab. The exact address and directions are shared once your appointment is confirmed.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

        .faq-section {
          background: #fff8f5;
          padding: 100px 48px;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .faq-eyebrow {
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

        .faq-eyebrow::before,
        .faq-eyebrow::after {
          content: '';
          width: 36px;
          height: 1px;
          background: #c9a08b;
        }

        .faq-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 300;
          color: #3a2318;
          margin: 0;
        }

        .faq-list {
          max-width: 760px;
          margin: 0 auto;
        }

        .faq-item {
          border-bottom: 1px solid rgba(201,160,139,0.25);
        }

        .faq-question {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #3a2318;
        }

        .faq-icon {
          font-family: 'Jost', sans-serif;
          font-size: 1.4rem;
          font-weight: 300;
          color: #c9a08b;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .faq-icon.open { transform: rotate(45deg); }

        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }

        .faq-answer.open {
          max-height: 260px;
          padding-bottom: 24px;
        }

        .faq-answer p {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: #7a5c4e;
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 768px) {
          .faq-section { padding: 80px 24px; }
        }
      `}</style>

      <section className="faq-section" id="faq">
        <div className="faq-header">
          <p className="faq-eyebrow">Good to Know</p>
          <h2 className="faq-title">Frequently Asked</h2>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className="faq-item" key={i}>
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <span className={`faq-icon${isOpen ? " open" : ""}`}>+</span>
                </button>
                <div className={`faq-answer${isOpen ? " open" : ""}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
