import { Button } from "@/components";
import { OrderOverViewListItem } from "@/components/order";
import { Check, CircleCheck, CreditCard, MapPin, Van } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-[1000px] w-full mx-auto  mt-20 pb-20">
      <div>
        <div className="w-[70px] h-[70px] mx-auto *:text-brand-color rounded-full bg-brand-color/30 flex justify-center items-center">
          <CircleCheck size={40} />
        </div>
        <h1 className="text-5xl font-bold text-center mt-5">
          Order Placed Successfully
        </h1>
        <p className="text-lg  text-gray-500 text-center mt-5">
          Order #MS-982341
        </p>
        <div className="w-fit text-sm font-medium mt-5 rounded-full mx-auto px-5 py-2 bg-brand-color/30 flex justify-center items-center gap-2">
          <Van size={16} /> <p>Estimated Delivery: Oct 24 - Oct 27</p>
        </div>
      </div>
      <div className="flex justify-center items-start gap-5 mt-10">
        <div className="w-full">
          <div className="w-full bg-white p-5 rounded-2xl">
            <h3 className="text-2xl font-semibold ">Items Ordered</h3>
            <ul className="mt-5 space-y-5">
              {/* -- Order item list */}
              <li className="w-full bg-white flex justify-start items-center">
                <Image
                  src={"/mid_banner_1.png"}
                  width={500}
                  height={500}
                  className="w-[100px] border h-full rounded-sm object-cover object-center overflow-hidden shrink-0"
                  alt="Cart Product Image"
                />

                <div className="flex justify-between items-center w-full">
                  <div className="w-full pl-5 space-y-1">
                    <h3 className="text-black text-lg font-medium">
                      Premium Wireless Headphones
                    </h3>
                    <p className="text-sm text-gray-500 font-medium ">
                      Cognac Brown • Size L
                    </p>
                    <p className="text-sm font-medium text-brand-color ">
                      BDT 120.00
                    </p>
                  </div>
                  <div className="w-fit shrink-0">
                    <p className="text-sm font-medium  text-gray-500">Qty: 1</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full flex justify-center items-start gap-5 mt-5">
            {/* -- Order billing and shipping info */}
            <div className="w-full rounded-2xl bg-white p-5 h-[150px]">
              <h5 className="text-sm font-semibold flex justify-start items-center gap-1 ">
                <MapPin size={16} className="text-brand-color" /> Shipping
                Address
              </h5>
              <p className="text-sm text-gray-500 mt-2">
                Alexander Hamilton 742 Evergreen Terrace Springfield, IL 62704
                United States
              </p>
            </div>
            <div className="w-full rounded-2xl bg-white p-5 h-[150px]">
              <h5 className="text-sm font-semibold flex justify-start items-center gap-1 ">
                <CreditCard size={16} className="text-brand-color" /> Payment
                Method
              </h5>
              <p className="text-sm text-gray-500 mt-2">
                Visa ending in •••• 4242 Billing same as shipping
                <span className="text-gray-400"> Authorized Oct 18, 2023</span>
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[400px] w-full ">
          <div className="w-full bg-white p-5 rounded-2xl">
            <h3 className="text-2xl font-semibold ">Order Total</h3>

            <ul className="mt-5 space-y-2 text-black!">
              {/* -- Order amount information */}
              <OrderOverViewListItem
                itemkey="Subtotal"
                value="1029"
                classNames={{
                  currencyClassName: "text-black!",
                }}
                currency="BDT"
              />
              <OrderOverViewListItem
                itemkey="Shipping Fee (Air)"
                value="45"
                currency="BDT"
                classNames={{
                  currencyClassName: "text-black!",
                }}
              />
              <OrderOverViewListItem
                itemkey="Taxes & Duties"
                value="12.50"
                currency="BDT"
                classNames={{
                  currencyClassName: "text-black!",
                }}
              />
            </ul>

            <div className="text-xl font-semibold flex justify-between items-center mt-5">
              <span>Total</span>
              <span className="text-brand-color">BDT 221</span>
            </div>

            <div className="space-y-3 mt-5">
              <Button variant={"brand"} className="w-full h-10">
                Track Order
              </Button>
              <Button variant={"outline"} className="w-full h-10">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
