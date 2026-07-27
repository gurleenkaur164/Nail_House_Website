export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-decorative" aria-hidden="true">nails</div>
      <div className="hero-content">
        <p className="hero-eyebrow">Nail Artist · Amritsar</p>
        <h1 className="hero-title">
          Art at Your<br /><em>Fingertips</em>
        </h1>
        <p className="hero-subtitle">
          Handcrafted nail artistry tailored to your style.
          Experience of more than four years.<br />
          From classic elegance to bold statement sets — your nails, your story.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">Book an Appointment</a>
          <a href="#gallery" className="btn-outline">View Gallery</a>
        </div>
      </div>
    </section>
  );
}
