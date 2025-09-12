"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const carouselImages = [
  "/images/home_01.jpg",
  "/images/home_02.jpg",
  "/images/home_03.jpg",
  "/images/home_04.jpg",
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden w-screen h-screen ">
      {carouselImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Carousel image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      {/* Dark overlay for content visibility */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
