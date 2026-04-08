import { CustomECard } from "@/components";
import { Footer, Header, PrimaryLayout } from "@/components/core";
import {
  FeaturedCategories,
  FlashSale,
  HeroSection,
  MidBanners,
  NewArrival,
  Subscribe,
} from "@/components/landing-page";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="px-4 pb-10">
        <PrimaryLayout className="mt-[64px] ">
          <HeroSection />
          <FeaturedCategories className="mt-20" />
          <FlashSale className="mt-20" />
          <MidBanners className="mt-20" />
          <NewArrival className="mt-20" />
          <Subscribe className="mt-20" />
        </PrimaryLayout>
      </main>
      <Footer />
    </>
  );
}
