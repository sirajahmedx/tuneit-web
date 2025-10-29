import { ImageCarousel } from "@/components/image-carousel";
import { HeroSection } from "@/components/hero-section";

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <ImageCarousel />

      <HeroSection />
    </main>
  );
}
