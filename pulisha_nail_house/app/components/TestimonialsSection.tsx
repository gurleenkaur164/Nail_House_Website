import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header">
        <p className="section-eyebrow">Kind Words</p>
        <h2 className="testimonials-title">What Clients Say</h2>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <div className="testimonial-mark" aria-hidden="true">&ldquo;</div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-stars" role="img" aria-label="5 out of 5 stars">
              <span aria-hidden="true">★★★★★</span>
            </div>
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-detail">{t.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
