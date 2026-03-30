"use client";
import { ChevronRight, MapPin, Truck } from "lucide-react";
import React, { useEffect } from "react";
import { Button, Label, Separator } from "../ui";
import { observer } from "mobx-react";
import { productStore } from "@/services/stores";
import { getPriceDiscountValue } from "@/utils";

// -- It will be set from backend
const discountOnPurchase: Record<number, number> = {
  500: 15,
  5000: 30,
};

export const ShipAndBuy = observer(() => {
  useEffect(() => {
    console.log(productStore.totalAddedItemsToBuy);
    let discount: number = 0;
    let totalPrice: number = 0;
    let updatedPrice: number = 0;
    let items_count: number = 0;
    let unit_count: number = 0

    productStore.totalAddedItemsToBuy.map((item, i) => {
      totalPrice += item.price * item.quantity;
      items_count += item.quantity;
      unit_count += item.quantity*item.unit
    });

    Object.entries(discountOnPurchase).map(
      ([discountAblePrice, discountValue]) => {
        if (totalPrice >= Number(discountAblePrice)) {
          discount = discountValue;
        }
      },
    );

    if (discount > 0) {
      updatedPrice = getPriceDiscountValue(totalPrice, discount);
    }

    productStore.setTotalPurchaseAbleItems({
      discount,
      items_count,
      total_price: totalPrice,
      updated_price: updatedPrice,
      units: unit_count
    });
  }, [productStore.totalAddedItemsToBuy]);

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
      <div className="mt-4 text-[15px]">
        <div className="w-full border-b py-2 pt-4 flex justify-between items-center">
          <div className="space-y-1">
            <p>
              <span className="text-gray-600">Quantity:</span> <span className="font-medium">{productStore.totalPurchaseAbleItems?.items_count}</span>
            </p>
            <p>
             {productStore.totalPurchaseAbleItems?.units} {productStore.totalPurchaseAbleItems.units! > 1 ? "Pieces": "Piece"}
            </p>
          </div>
          {/* <div className="flex justify-between items-center ">
          <span>{productStore.totalPurchaseAbleItems?.items_count} {productStore.totalPurchaseAbleItems.items_count! > 1 ? "Pieces": "Piece"} </span>{" "}
          <span>৳ {productStore.totalPurchaseAbleItems?.total_price}</span>
          </div> */}
          <span>৳ {productStore.totalPurchaseAbleItems?.total_price}</span>
        </div>
        <div className="flex justify-between items-center border-b py-2 text-red-600 ">
          <span className="space-y-1">
            <span>Discount:</span>{" "}
            <span className="font-medium">
              -{productStore.totalPurchaseAbleItems?.discount}%
            </span>{" "}
          </span>{" "}
          <span>
            -৳{" "}
            {productStore.totalPurchaseAbleItems?.discount &&
              Number(
                (productStore.totalPurchaseAbleItems.total_price! *
                  productStore.totalPurchaseAbleItems.discount) /
                  100,
              )}
          </span>
        </div>
        <div className="flex justify-between items-center py-2  font-semibold">
          <span>Total</span>{" "}
          <span>
            ৳{" "}
            {productStore.totalPurchaseAbleItems?.updated_price
              ? productStore.totalPurchaseAbleItems?.updated_price
              : productStore.totalPurchaseAbleItems?.total_price}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Button variant={"brand"} className="w-full h-10!">
          Buy Now
        </Button>
        <Button variant={"outline"} className="w-full h-10! mt-2">
          Add to Cart
        </Button>
      </div>
    </div>
  );
});
