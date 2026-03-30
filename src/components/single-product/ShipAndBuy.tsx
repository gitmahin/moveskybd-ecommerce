import { ChevronRight, MapPin, Truck } from "lucide-react";
import React from "react";
import { Button, Separator } from "../ui";

export const ShipAndBuy = () => {
  return (
    <div className="w-full bg-white p-4 rounded-lg border sticky top-[100px]">
      <div className="flex justify-start items-center gap-2 text-sm font-medium">
        <Truck size={15} className="shrink-0 text-gray-500" />
        <span className="text-gray-500">Shipping to</span>
        <MapPin size={15} className="shrink-0" />
        <span>Bangladesh</span>
      </div>
      <Separator className="my-4" />
      <Button className="w-full h-10!" variant={"outline"}>
        Select Shipping Method <ChevronRight />
      </Button>
      <div className="mt-4">
        <div className="flex justify-between items-center border-b pb-4">
          <span>3 Pieces</span> <span>৳ 3454</span>
        </div>
        <div className="flex justify-between items-center pb-4 mt-4 font-semibold">
          <span>Total</span> <span>৳ 3454</span>
        </div>
      </div>
      <div className="mt-4">
        <Button variant={"brand"} className="w-full h-10!">Buy Now</Button>
        <Button variant={"outline"} className="w-full h-10! mt-2">Add to Cart</Button>
      </div>
    </div>
  );
};
