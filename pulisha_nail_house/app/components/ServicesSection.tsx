"use client";
import Image from "next/image";


const services = [
  {
    name: "Gel Extensions",
    desc: "Long-lasting sculpted extensions with a flawless finish. Perfect for length and strength.",
    duration: "90 min",
    price: "₹1,200+",
    imageSrc: "/services/gel-extensions.jpg",
    icon: "✦",
  },
  {
    name: "Acrylic Full Set",
    desc: "Classic acrylic application for durable, customisable nail enhancements.",
    duration: "75 min",
    price: "₹1,000+",
    imageSrc: "/services/acrylic.jpg",
    icon: "◈",
  },
  {
    name: "Nail Art",
    desc: "Hand-painted designs — florals, abstract, geometric, 3D — entirely bespoke.",
    duration: "60 min",
    price: "₹600+",
    imageSrc: "/services/nail-art.jpg",
    icon: "❋",
  },
  {
    name: "French Manicure",
    desc: "The timeless classic, redefined with modern shaping and gel topcoat.",
    duration: "45 min",
    price: "₹500+",
    imageSrc: "/services/french.jpg",
    icon: "◇",
  },
  {
    name: "Chrome & Foil",
    desc: "Mirror chrome powder or metallic foil for an ultra-sleek, editorial look.",
    duration: "50 min",
    price: "₹700+",
    imageSrc: "/services/chrome.jpg",
    icon: "◉",
  },
  {
    name: "Ombre & Gradient",
    desc: "Seamless colour blending — soft pastels to bold contrast fades.",
    duration: "60 min",
    price: "₹650+",
    imageSrc: "/services/ombre.jpg",
    icon: "⊕",
  },
];

export default function ServicesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

        .services-section {
          background: #fff8f5;
          padding: 100px 48px;
        }

        .services-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .section-eyebrow {
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

        .section-eyebrow::before,
        .section-eyebrow::after {
          content: '';
          width: 36px;
          height: 1px;
          background: #c9a08b;
        }

        .services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 300;
          color: #3a2318;
          margin: 0 0 16px;
        }

        .services-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          color: #9a7060;
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .services-section { padding: 80px 24px; }
        }

        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        .service-card {
          background: #fff;
          border: 1px solid rgba(201,160,139,0.15);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s;
          cursor: default;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(58,35,24,0.1);
        }

        .card-image {
          width: 100%;
          aspect-ratio: 4/3;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f5ddd0 0%, #fdeee6 100%);
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .service-card:hover .card-image img {
          transform: scale(1.06);
        }

        /* Placeholder when real image not present */
        .card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
          background: linear-gradient(135deg, #fdeee6 0%, #f5ddd0 100%);
          color: rgba(201,160,139,0.7);
        }

        .placeholder-icon {
          font-size: 2.4rem;
          transition: transform 0.4s;
        }

        .service-card:hover .placeholder-icon { transform: scale(1.15) rotate(10deg); }

        .placeholder-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a08b;
        }

        .card-body {
          padding: 22px 24px 24px;
        }

        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #3a2318;
          margin: 0 0 8px;
        }

        .card-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          color: #7a5c4e;
          line-height: 1.7;
          margin: 0 0 18px;
          font-weight: 300;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(201,160,139,0.2);
          padding-top: 14px;
        }

        .card-duration {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: #9a7060;
        }

        .card-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #c9a08b;
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-header">
          <p className="section-eyebrow">What We Offer</p>
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">Every set is handcrafted with care — no two are ever the same.</p>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => (
            <div className="service-card" key={i}>
              <div className="card-image">
                {/*
                  REPLACE the placeholder below with:
                  <Image src={svc.imageSrc} alt={svc.name} fill style={{ objectFit: 'cover' }} />
                  once you add your images to /public/services/
                */}
                <div className="card-placeholder">
                  <span className="placeholder-icon">{svc.icon}</span>
                  <span className="placeholder-label">Add your photo</span>
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-name">{svc.name}</h3>
                <p className="card-desc">{svc.desc}</p>
                <div className="card-meta">
                  <span className="card-duration">⏱ {svc.duration}</span>
                  <span className="card-price">{svc.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}