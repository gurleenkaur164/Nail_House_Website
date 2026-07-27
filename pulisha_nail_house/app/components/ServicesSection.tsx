import Image from "next/image";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <p className="section-eyebrow">What We Offer</p>
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">Every set is handcrafted with care — no two are ever the same.</p>
      </div>

      <div className="services-grid">
        {SERVICES.map((svc) => (
          <div className="service-card" key={svc.name}>
            <div className="card-image">
              <Image
                src={svc.imageSrc}
                alt={svc.name}
                fill
                sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="card-body">
              <h3 className="card-name">{svc.name}</h3>
              <p className="card-desc">{svc.desc}</p>
              <div className="card-meta">
                <span className="card-duration">{svc.duration}</span>
                <span className="card-price">{svc.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
