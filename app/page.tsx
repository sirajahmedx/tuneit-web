import { ImageCarousel } from "@/components/image-carousel";
import { HeroSection } from "@/components/hero-section";

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Full-screen image carousel background */}
      <ImageCarousel />

      {/* Hero content with glassmorphism card */}
      <HeroSection />
    </main>
  );
}
