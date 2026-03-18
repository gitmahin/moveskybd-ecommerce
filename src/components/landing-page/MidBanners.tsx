import React from "react";
import { CustomBanner } from "../ui";

type MidBannersPropsType = {
  className?: string;
};

export const MidBanners = ({ className }: MidBannersPropsType) => {
  return (
    <div className={`${className}`}>
      <div className="flex justify-center items-center gap-8">
        <CustomBanner
          variant="md"
          classNames={{
            titleCustomClassName: "*:text-white!",
            primaryButtonCustomClassName: "bg-white hover:bg-white/90",
          }}
          bgOverLayStyle={{ backgroundColor: "#26436C66" }}
          bg_image="/mid_banner_1.png"
          title="Smart Living"
          desc="Automate your home with
the latest IoT tech.  sdgsdg sdg segsdg sdsdgsd sdg sd sdg sdg "
          primaryButton
          primaryButtonContent="Explore Now"
        />
        <CustomBanner
          variant="md"
          classNames={{
            titleCustomClassName: "*:text-black!",
            primaryButtonCustomClassName:
              "bg-black hover:bg-black/90 text-white",
            descCustomClassName: "text-black! ",
          }}
          bgOverLayStyle={{ backgroundColor: "#E9B16D66" }}
          bg_image="/mid_banner_2.png"
          title="Computer Accessories"
          desc="Boost your productivity
with premium gear."
          primaryButton
          primaryButtonContent="Shop All"
        />
      </div>
    </div>
  );
};
