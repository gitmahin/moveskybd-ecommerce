import { Label } from "@/components";
import {
  OfferCard,
  ProductEngagement,
  ProductImages,
  ProductPrice,
  ShipAndBuy,
  VariationTable,
} from "@/components/single-product";
import { Assurance } from "@/components/single-product/Assurance";
import React from "react";

export default function ProductPage() {
  return (
    <div className="mt-9 grid grid-cols-[400px_1fr_350px] gap-5 pb-20">
      <section className="w-full ">
        <ProductImages />
      </section>
      <section className="w-full space-y-3 ">
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
        <VariationTable />
      </section>
      <section className="w-full ">
        <ShipAndBuy />
        <div className="mt-4">
          <Assurance />
        </div>
      </section>
    </div>
  );
}
