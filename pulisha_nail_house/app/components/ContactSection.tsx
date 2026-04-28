"use client";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Replace with your form submission logic (e.g. EmailJS, Formspree, WhatsApp link)
    const wa = `https://wa.me/919999999999?text=Hi! I'm ${form.name}. I'd like to book: ${form.service}. ${form.message}`;
    window.open(wa, "_blank");
    setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

        .contact-section {
          background: #3a2318;
          padding: 100px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 860px) {
          .contact-section {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 80px 24px;
          }
        }

        .contact-info-block { color: #fff8f5; }

        .section-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a08b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-eyebrow::after {
          content: '';
          width: 36px;
          height: 1px;
          background: #c9a08b;
        }

        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 300;
          color: #fff8f5;
          margin: 0 0 16px;
          line-height: 1.1;
        }

        .contact-title em {
          font-style: italic;
          color: #c9a08b;
        }

        .contact-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,248,245,0.6);
          line-height: 1.8;
          margin: 0 0 40px;
          font-weight: 300;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .contact-icon {
          width: 36px;
          height: 36px;
          background: rgba(201,160,139,0.15);
          border: 1px solid rgba(201,160,139,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .contact-item-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          color: rgba(255,248,245,0.8);
          font-weight: 300;
          line-height: 1.6;
        }

        .contact-item-label {
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a08b;
          margin-bottom: 2px;
        }

        .contact-item-text a {
          color: inherit;
          text-decoration: none;
        }

        .contact-item-text a:hover { color: #c9a08b; }

        /* FORM */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a08b;
        }

        .form-input,
        .form-select,
        .form-textarea {
          background: rgba(255,248,245,0.06);
          border: 1px solid rgba(201,160,139,0.2);
          color: #fff8f5;
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.3s;
          width: 100%;
          box-sizing: border-box;
          border-radius: 0;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c9a08b'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }

        .form-select option { background: #3a2318; color: #fff8f5; }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #c9a08b;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }

        .form-submit {
          background: #c9a08b;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 15px 32px;
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          margin-top: 4px;
          align-self: flex-start;
        }

        .form-submit:hover {
          background: #b8856d;
          transform: translateY(-2px);
        }

        .success-msg {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          color: #c9a08b;
          margin-top: 8px;
        }

        /* Footer strip */
        .footer-strip {
          background: #2a180e;
          text-align: center;
          padding: 24px;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,248,245,0.35);
          letter-spacing: 0.12em;
        }
      `}</style>

      <section style={{ background: "#3a2318" }} id="contact">
        <div className="contact-section">
          {/* Left — Info */}
          <div className="contact-info-block">
            <p className="section-eyebrow">Get in Touch</p>
            <h2 className="contact-title">
              Let's create<br />something <em>beautiful</em>
            </h2>
            <p className="contact-desc">
              Drop a message below or reach out directly via WhatsApp or Instagram to book your appointment. Walk-ins welcome based on availability.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <span className="contact-item-text">
                  <span className="contact-item-label">Location</span>
                  {/* Replace with her actual address */}
                  Bengaluru, Karnataka, India
                </span>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <span className="contact-item-text">
                  <span className="contact-item-label">Phone / WhatsApp</span>
                  {/* Replace with her actual number */}
                  <a href="https://wa.me/919999999999">+91 99999 99999</a>
                </span>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📸</div>
                <span className="contact-item-text">
                  <span className="contact-item-label">Instagram</span>
                  {/* Replace with her actual handle */}
                  <a href="https://instagram.com/pulisha.nails" target="_blank" rel="noopener noreferrer">@pulisha.nails</a>
                </span>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <span className="contact-item-text">
                  <span className="contact-item-label">Hours</span>
                  Mon – Sat: 10 AM – 7 PM<br />
                  Sunday: By appointment only
                </span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  placeholder="+91 98XXX XXXXX"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Service Interested In</label>
              <select
                className="form-select"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select a service…</option>
                <option>Gel Extensions</option>
                <option>Acrylic Full Set</option>
                <option>Nail Art</option>
                <option>French Manicure</option>
                <option>Chrome & Foil</option>
                <option>Ombre & Gradient</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message (optional)</label>
              <textarea
                className="form-textarea"
                name="message"
                placeholder="Any specific designs, preferred date/time…"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {!sent ? (
              <button className="form-submit" onClick={handleSubmit}>
                Send via WhatsApp →
              </button>
            ) : (
              <p className="success-msg">Message sent! We'll get back to you shortly ✦</p>
            )}
          </div>
        </div>

        <div className="footer-strip">
          © {new Date().getFullYear()} Pulisha Nail House · Handcrafted with care in Bengaluru
        </div>
      </section>
    </>
  );
}