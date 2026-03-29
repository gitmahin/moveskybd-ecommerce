import { Label } from "@/components";
import {
  OfferCard,
  ProductEngagement,
  ProductPrice,
  ShipAndBuy,
  VariationTable,
} from "@/components/single-product";
import React from "react";

export default function ProductPage() {
  return (
    <div className="mt-1 grid grid-cols-[400px_1fr_350px] h-[3000px] gap-5">
      <div className="w-full ">
        <div className="border rounded-lg h-[450px] bg-white w-full p-2">
          <div className="w-full h-full rounded-md bg-background"></div>
        </div>
        <div className="mt-5 flex justify-start items-center gap-5">
          {Array.from({ length: 3 }).map((item, i) => {
            return (
              <div
                className="w-[110px] h-[110px] p-1 rounded-md border bg-white"
                key={i}
              >
                <div className="w-full h-full rounded-sm bg-background"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full space-y-3">
        <Label>
          <span className="text-gray-500">SKU:</span> EP-10-5PACKS
        </Label>
        <h1 className="text-2xl font-semibold text-black">
          Lorem ipsum dolor Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet. sit amet consectetur adipisicing elit. Ea, fugit!
        </h1>
        <ProductEngagement />
        <div className="mt-5">
          <OfferCard />
        </div>
        <div>
          <ProductPrice regular_price={500} sale_price={300} />
        </div>
        <VariationTable/>
      </div>
      <div className="w-full ">
        <ShipAndBuy/>
      </div>
    </div>
  );
}
