import React from "react";
import { LandingPageTitle } from "./LandingPageTitle";
import { CustomECard } from "../ui";
import { ProductType } from "@/types/product";
import { NEW_ARRIVALS } from "@/constants";



type NewArrivalPropsType = {
  className?: string;
};

export const NewArrival = ({ className }: NewArrivalPropsType) => {
  return (
    <div className={`${className}`}>
      <LandingPageTitle title="New Arrivals" />
      <div className=" mt-5 grid grid-cols-5 grid-rows-1 gap-5">
        {NEW_ARRIVALS.map((product, i) => {
          return <CustomECard variant="card_2" classNames={{
            customImageClassName: "h-[240px]!",
            labelClassName: "text-brand-color!"
          }} title={product.title} image_src={product.image} regular_price={product.regular_price}  badge={product.badge as string} badgeVariant="brand" label="NEW" key={i} />;
        })}
      </div>
    </div>
  );
};
