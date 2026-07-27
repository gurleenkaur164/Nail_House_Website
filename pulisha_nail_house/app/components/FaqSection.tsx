"use client";
import { useState } from "react";
import { FAQS } from "@/lib/constants";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
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
      <section className="faq-section" id="faq">
        <div className="faq-header">
          <p className="section-eyebrow">Good to Know</p>
          <h2 className="faq-title">Frequently Asked</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-answer-${i}`;
            const buttonId = `faq-question-${i}`;
            return (
              <div className="faq-item" key={buttonId}>
                <button
                  id={buttonId}
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {f.q}
                  <span className={`faq-icon${isOpen ? " faq-icon--open" : ""}`} aria-hidden="true">+</span>
                </button>
                <div
                  id={panelId}
                  className={`faq-answer${isOpen ? " faq-answer--open" : ""}`}
                  role="region"
                  aria-labelledby={buttonId}
                >
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
