import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import GalleryCarousel from "./components/GalleryCarousel";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GalleryCarousel />
      <ServicesSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
