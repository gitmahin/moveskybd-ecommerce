import React from "react";
import { LandingPageTitle } from "./LandingPageTitle";
import { CustomECard } from "../ui";
import { ProductType } from "@/types/product";
import { PRODUCTS } from "@/constants";

type FlashSalePropsType = {
  className?: string;
};

export const FlashSale = ({ className }: FlashSalePropsType) => {
  return (
    <div className={`${className}`}>
      <div>
        <LandingPageTitle title="Flash Sale" />
      </div>
      <div className=" mt-5 grid grid-cols-4 grid-rows-1 gap-5">
        {PRODUCTS.map((product, i) => {
          return (
            <CustomECard
              title={product.title}
              regular_price={product.regular_price}
              discount={product.discount}
              badge={product.badge as string}
              badgeVariant="brand"
              label={product.brand}
              image_src={product.image}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};
