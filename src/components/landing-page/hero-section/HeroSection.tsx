import { Badge, Button, CustomBanner } from "@/components/ui";
import Image from "next/image";
import React from "react";

export const HeroSection = () => {
  return (
    <div className="py-4">
      <CustomBanner
        variant="hero"
        badge="SEASON SALE UP TO 50% OFF"
        bg_image="/hero_image.png"
        title="Elevate Your|Tech Style"
        desc="Discover the future of living with our handpicked
collection of premium smart gadgets and minimalist
accessories."
        primaryButton
        secondaryButton
        primaryButtonContent="Shop Collection"
        secondaryButtonContent="New Arrivals"
      />
    </div>
  );
};
