import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import GalleryCarousel from "./components/GalleryCarousel";
import ServicesSection from "./components/ServicesSection";
import NailTryOn from "./components/NailTryOn";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GalleryCarousel />
        <ServicesSection />
        <NailTryOn />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
    </>
  );
}
