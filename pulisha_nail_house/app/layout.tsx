import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  PHONE_DISPLAY,
  INSTAGRAM_HANDLE,
  BUSINESS_HOURS,
} from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
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
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "Pulisha Nail House",
  description:
    "Handcrafted nail artistry in Amritsar, Punjab — gel extensions, acrylic full sets, bespoke nail art, French manicures, chrome and ombre.",
  image: `${SITE_URL}/gallery/nails1.png`,
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amritsar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  sameAs: [`https://instagram.com/${INSTAGRAM_HANDLE}`],
  openingHoursSpecification: BUSINESS_HOURS.structured,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
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
