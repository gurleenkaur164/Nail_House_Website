import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://nail-house-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pulisha Nail House · Nail Artist in Amritsar",
    template: "%s · Pulisha Nail House",
  },
  description:
    "Handcrafted nail artistry in Amritsar, Punjab. Gel extensions, acrylic full sets, bespoke nail art, French manicures, chrome and ombre. Four+ years of experience. Book on WhatsApp.",
  keywords: [
    "nail artist Amritsar",
    "nail salon Amritsar",
    "gel extensions Amritsar",
    "acrylic nails Punjab",
    "nail art",
    "French manicure",
    "Pulisha Nail House",
    "nailsbypulisha",
  ],
  authors: [{ name: "Pulisha Nail House" }],
  creator: "Pulisha Nail House",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Pulisha Nail House",
    title: "Pulisha Nail House · Nail Artist in Amritsar",
    description:
      "Handcrafted nail artistry in Amritsar — gel extensions, acrylics, bespoke nail art and more. Book your appointment today.",
    images: [
      {
        url: "/gallery/nails1.png",
        width: 1200,
        height: 630,
        alt: "Nail art by Pulisha Nail House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulisha Nail House · Nail Artist in Amritsar",
    description:
      "Handcrafted nail artistry in Amritsar — gel extensions, acrylics, bespoke nail art and more.",
    images: ["/gallery/nails1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "Pulisha Nail House",
  description:
    "Handcrafted nail artistry in Amritsar, Punjab — gel extensions, acrylic full sets, bespoke nail art, French manicures, chrome and ombre.",
  image: `${siteUrl}/gallery/nails1.png`,
  url: siteUrl,
  telephone: "+91-70879-93372",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amritsar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  sameAs: ["https://instagram.com/nailsbypulisha"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
