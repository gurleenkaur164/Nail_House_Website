export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nail-house-website.vercel.app";

export const WHATSAPP_NUMBER = "917087993372";
export const PHONE_DISPLAY = "+91 70879 93372";
export const INSTAGRAM_HANDLE = "nailsbypulisha";

export const BUSINESS_HOURS = {
  weekdays: "Mon – Sat: 10 AM – 7 PM",
  sunday: "Sunday: By appointment only",
  structured: [
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],
};

export const NAV_LINKS = [
  { href: "#gallery", label: "Gallery" },
  { href: "#services", label: "Services" },
  { href: "#try-on", label: "Try On" },
  { href: "#contact", label: "Contact" },
];

export const SERVICES = [
  {
    name: "Gel Extensions",
    desc: "Long-lasting sculpted extensions with a flawless finish. Perfect for length and strength.",
    duration: "90 min",
    price: "₹1,200+",
    imageSrc: "/services/gel-extensions.jpeg",
  },
  {
    name: "Acrylic Full Set",
    desc: "Classic acrylic application for durable, customisable nail enhancements.",
    duration: "75 min",
    price: "₹1,000+",
    imageSrc: "/services/acrylic-nails.png",
  },
  {
    name: "Nail Art",
    desc: "Hand-painted designs — florals, abstract, geometric, 3D — entirely bespoke.",
    duration: "60 min",
    price: "₹600+",
    imageSrc: "/services/handpainted-nails.jpeg",
  },
  {
    name: "French Manicure",
    desc: "The timeless classic, redefined with modern shaping and gel topcoat.",
    duration: "45 min",
    price: "₹500+",
    imageSrc: "/services/french-nails.png",
  },
  {
    name: "Chrome & Foil",
    desc: "High-shine mirror chrome and delicate foil accents for a bold, reflective finish.",
    duration: "60 min",
    price: "₹700+",
    imageSrc: "/gallery/nails4.png",
  },
  {
    name: "Ombre & Gradient",
    desc: "Seamlessly blended colour fades — soft baby-boomer to vivid gradients, your choice.",
    duration: "60 min",
    price: "₹700+",
    imageSrc: "/gallery/nails2.png",
  },
];

export const GALLERY_SLIDES = [
  { src: "/gallery/nails1.png", alt: "Gel French Tips", label: "Classic French" },
  { src: "/gallery/nails2.png", alt: "Ombre Nails", label: "Ombre Glam" },
  { src: "/gallery/nails3.png", alt: "Floral Nail Art", label: "Floral Art" },
  { src: "/gallery/nails4.png", alt: "Chrome Nails", label: "Chrome Finish" },
  { src: "/gallery/nails5.png", alt: "Nude Nails", label: "Soft Nude" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Absolutely in love with my gel extensions. Pulisha understood exactly the shape I wanted and they lasted over three weeks without a single chip.",
    name: "Priya S.",
    detail: "Gel Extensions",
  },
  {
    quote:
      "The nail art here is next level. I showed a reference and she made it even better. The most relaxing salon experience I’ve had in Amritsar.",
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

export const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "Fill out the contact form below or message directly on WhatsApp. You’ll get a confirmation with your preferred date and time. Walk-ins are welcome subject to availability.",
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
    a: "A small deposit may be requested for longer appointments. Kindly give at least 24 hours’ notice for cancellations or reschedules so the slot can be offered to someone else.",
  },
  {
    q: "Where are you located?",
    a: "Pulisha Nail House is based in Amritsar, Punjab. The exact address and directions are shared once your appointment is confirmed.",
  },
];

export const SERVICE_OPTIONS = [
  "Gel Extensions",
  "Acrylic Full Set",
  "Nail Art",
  "French Manicure",
  "Chrome & Foil",
  "Ombre & Gradient",
  "Not sure yet",
];
