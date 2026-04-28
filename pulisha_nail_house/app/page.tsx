import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import GalleryCarousel from "./components/GalleryCarousel";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GalleryCarousel />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
