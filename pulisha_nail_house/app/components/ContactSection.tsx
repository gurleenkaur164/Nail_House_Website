"use client";
import { useState } from "react";
import {
  WHATSAPP_NUMBER,
  PHONE_DISPLAY,
  INSTAGRAM_HANDLE,
  BUSINESS_HOURS,
  SERVICE_OPTIONS,
} from "@/lib/constants";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{7,20}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";
    if (!form.service) errs.service = "Please select a service";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const waMessage = encodeURIComponent(
        `Hi! I'm ${form.name.trim()}\n\nPhone: ${form.phone.trim()}\n\nService: ${form.service}\n\nMessage:\n${form.message.trim()}`
      );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`,
        "_blank"
      );

      setStatus("sent");
      setForm({ name: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  return (
    <section className="contact-outer" id="contact">
      <div className="contact-section">
        <div className="contact-info-block">
          <p className="section-eyebrow section-eyebrow--left">Get in Touch</p>
          <h2 className="contact-title">
            Let&apos;s create<br />something <em>beautiful</em>
          </h2>
          <p className="contact-desc">
            Drop a message below or reach out directly via WhatsApp or Instagram to book your appointment. Walk-ins welcome based on availability.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">📍</div>
              <span className="contact-item-text">
                <span className="contact-item-label">Location</span>
                Amritsar, Punjab, India
              </span>
            </div>

            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">📞</div>
              <span className="contact-item-text">
                <span className="contact-item-label">Phone / WhatsApp</span>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a>
              </span>
            </div>

            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">📸</div>
              <span className="contact-item-text">
                <span className="contact-item-label">Instagram</span>
                <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">@{INSTAGRAM_HANDLE}</a>
              </span>
            </div>

            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">🕐</div>
              <span className="contact-item-text">
                <span className="contact-item-label">Hours</span>
                {BUSINESS_HOURS.weekdays}<br />
                {BUSINESS_HOURS.sunday}
              </span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Your Name</label>
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                placeholder="Priya Sharma"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p className="form-error" id="name-error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone</label>
              <input
                className="form-input"
                id="phone"
                type="tel"
                name="phone"
                placeholder="+91 98XXX XXXXX"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && <p className="form-error" id="phone-error">{errors.phone}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="service">Service Interested In</label>
            <select
              className="form-select"
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="">Select a service…</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {errors.service && <p className="form-error" id="service-error">{errors.service}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Message (optional)</label>
            <textarea
              className="form-textarea"
              id="message"
              name="message"
              placeholder="Any specific designs, preferred date/time…"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {status === "sent" ? (
            <div>
              <p className="success-msg">Message sent! We&apos;ll get back to you shortly ✦</p>
              <button type="button" className="form-submit" onClick={resetForm} style={{ marginTop: 12 }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <button className="form-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send via WhatsApp →"}
              </button>
              {status === "error" && (
                <p className="form-error">Something went wrong. Please try again.</p>
              )}
            </>
          )}
        </form>
      </div>

      <footer className="footer-strip">
        © {new Date().getFullYear()} Pulisha Nail House · Handcrafted with care in Amritsar
      </footer>
    </section>
  );
}
