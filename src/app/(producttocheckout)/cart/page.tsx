import { Button, ButtonGroup, Input, Separator } from "@/components";
import { OrderOverViewListItem } from "@/components/order";
import { Quantity } from "@/components/single-product/Quantity";
import {
  ArrowRight,
  ChevronRightIcon,
  ClipboardList,
  Heart,
  Lock,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React from "react";


export default function CartPage() {
  return (
    <div className="pt-10 flex justify-center items-start gap-10 ">
      <div className="w-full">
        <h1 className=" text-3xl font-bold">Shopping Cart</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">
          You have <span className="font-bold text-black">3 items</span> in your
          cart
        </p>

        <ul className="space-y-3 mt-10">
          <li className="w-full rounded-lg bg-white border p-3 flex justify-start items-center">
            <Image
              src={"/mid_banner_1.png"}
              width={500}
              height={500}
              className="w-[100px] border h-full rounded-sm object-cover object-center overflow-hidden shrink-0"
              alt="Cart Product Image"
            />

            <div className="flex justify-between items-center w-full">
              <div className="w-full pl-5 ">
                <h3 className="text-black text-lg font-medium">Premium Wireless Headphones</h3>
                <div className="mt-2">
                  <ButtonGroup>
                    <Button variant={"outline"}><Heart/> Save for later</Button>
                    <Button  variant={"destructive"}><Trash/> Remove</Button>
                  </ButtonGroup>
                </div>
              </div>
              <div className="w-fit shrink-0">
                <Quantity stock_count={20} />
                <p className="text-lg font-medium mt-2">BDT 356</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="max-w-[450px] w-full">
        <div className="rounded-2xl bg-[#0E1A27] w-full p-5">
          <p className="text-white font-medium text-lg flex justify-between items-center">
            Order Summary <ClipboardList className="text-gray-400" size={20} />
          </p>
          <ul className="mt-5 space-y-2">
            <OrderOverViewListItem
              itemkey="Subtotal"
              value="1029"
              currency="BDT"
            />
            <OrderOverViewListItem
              itemkey="Shipping Fee (Air)"
              value="45"
              currency="BDT"
            />
            <OrderOverViewListItem
              itemkey="Taxes & Duties"
              value="12.50"
              currency="BDT"
            />
          </ul>
          <Separator orientation="horizontal" className="h-[1px] my-5" />
          <div>
            <p className="text-sm uppercase text-gray-400 font-medium">
              Total amount
            </p>
            <p className="flex mt-1 justify-between items-center">
              <span className="text-3xl text-white font-bold">1106</span>{" "}
              <span className="text-brand-color font-medium text-sm">BDT</span>
            </p>
          </div>
          <div className="mt-5">
            <p className="text-sm uppercase text-gray-400 font-medium">
              Promo code
            </p>
            <div className="mt-1 flex justify-center items-center gap-3">
              <Input className="h-9 bg-[#FFFFFF1A]! border-gray-500! " />
              <Button size={"lg"} variant={"brand"}>
                Apply
              </Button>
            </div>
          </div>
          <Button variant={"brand"} size={"lg"} className="w-full mt-3 h-10">
            Checkout Now
            <ArrowRight />{" "}
          </Button>
          <div className="flex justify-center items-center gap-1 text-sm *:text-gray-500 mt-5">
            <Lock size={14} />
            <span>Fully encrypted SSL transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
